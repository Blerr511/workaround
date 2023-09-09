#!/bin/bash

# Variables
SERVICE_ACCOUNT_DISPLAY_NAME="Terraform Service Account"

[[ -z "$PROJECT_ID" ]] && echo "Error: PROJECT_ID is not set" && exit 1

while [[ "$1" != "" ]]; do
    case $1 in
    -sa)
        shift
        SERVICE_ACCOUNT_NAME=$1
        ;;
    -bucket)
        shift
        BUCKET_NAME=$1
        ;;
    -secret)
        shift
        SECRET_ID=$1
        ;;
    *)
        echo "Invalid argument: $1"
        exit 1
        ;;
    esac
    shift
done

[[ -z "$SERVICE_ACCOUNT_NAME" ]] && echo "Error: -sa is not set" && exit 1
[[ -z "$BUCKET_NAME" ]] && echo "Error: -bucket is not set" && exit 1
[[ -z "$SECRET_ID" ]] && echo "Error: -secret is not set" && exit 1

echo "Setup terraform backend with PROJECT_ID=$PROJECT_ID, SERVICE_ACCOUNT_NAME=$SERVICE_ACCOUNT_NAME, BUCKET_NAME=$BUCKET_NAME, SECRET_ID=$SECRET_ID"

gcloud config set project $PROJECT_ID

# Create the service account
echo "Creating TF service account $SERVICE_ACCOUNT_NAME"
gcloud iam service-accounts create $SERVICE_ACCOUNT_NAME --description="Service account for Terraform" --display-name="$SERVICE_ACCOUNT_DISPLAY_NAME"

echo "Enabling cloud resource mangaer api"
gcloud services enable cloudresourcemanager.googleapis.com

echo "Get email of the service account"
SERVICE_ACCOUNT_EMAIL=$(gcloud iam service-accounts list \
    --filter="displayName:$SERVICE_ACCOUNT_DISPLAY_NAME" \
    --format='value(email)')
echo "---$SERVICE_ACCOUNT_EMAIL---"

echo "Assign the necessary roles to the service account"
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member serviceAccount:$SERVICE_ACCOUNT_EMAIL \
    --role roles/editor

echo "Assign the role for creating and managing service accounts"
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member serviceAccount:$SERVICE_ACCOUNT_EMAIL \
    --role roles/iam.serviceAccountAdmin

echo "Assign the role for impersonating other service accounts"
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member serviceAccount:$SERVICE_ACCOUNT_EMAIL \
    --role roles/iam.serviceAccountUser

echo "Assign the role for creating and managing roles"
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member serviceAccount:$SERVICE_ACCOUNT_EMAIL \
    --role roles/iam.roleAdmin

echo "Assign the role for creating and managing roles security admin"
gcloud projects add-iam-policy-binding ${PROJECT_ID} \
    --member serviceAccount:${SERVICE_ACCOUNT_EMAIL} \
    --role roles/iam.securityAdmin

echo "Assign the role for accessing secret data"
gcloud projects add-iam-policy-binding ${PROJECT_ID} \
    --member serviceAccount:${SERVICE_ACCOUNT_EMAIL} \
    --role roles/secretmanager.secretAccessor

echo "Create a JSON key for the service account"
gcloud iam service-accounts keys create key.json \
    --iam-account $SERVICE_ACCOUNT_EMAIL

echo "Create the bucket for the terraform state"
gsutil mb gs://$BUCKET_NAME

echo "Enable versioning on the bucket"
gsutil versioning set on gs://$BUCKET_NAME

echo "Create a secret to store the JSON key"
gcloud secrets create $SECRET_ID \
    --replication-policy="automatic"
    
echo "Add the JSON key as a version in the secret"
gcloud secrets versions add $SECRET_ID \
    --data-file key.json

echo "Clean up the local JSON key file"
rm key.json
