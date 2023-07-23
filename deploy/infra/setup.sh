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
gcloud iam service-accounts create $SERVICE_ACCOUNT_NAME --description="Service account for Terraform" --display-name="$SERVICE_ACCOUNT_DISPLAY_NAME"

gcloud services enable cloudresourcemanager.googleapis.com
gcloud services enable sqladmin.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable secretmanager.googleapis.com

# Get the email of the service account
SERVICE_ACCOUNT_EMAIL=$(gcloud iam service-accounts list \
    --filter="displayName:$SERVICE_ACCOUNT_DISPLAY_NAME" \
    --format='value(email)')

# Assign the necessary roles to the service account
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member serviceAccount:$SERVICE_ACCOUNT_EMAIL \
    --role roles/editor

# Assign the role for creating and managing service accounts
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member serviceAccount:$SERVICE_ACCOUNT_EMAIL \
    --role roles/iam.serviceAccountAdmin

# Assign the role for impersonating other service accounts
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member serviceAccount:$SERVICE_ACCOUNT_EMAIL \
    --role roles/iam.serviceAccountUser

# Assign the role for creating and managing roles
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member serviceAccount:$SERVICE_ACCOUNT_EMAIL \
    --role roles/iam.roleAdmin

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member serviceAccount:$SERVICE_ACCOUNT_EMAIL \
    --role roles/cloudsql.admin

gcloud projects add-iam-policy-binding ${PROJECT_ID} \
    --member serviceAccount:${SERVICE_ACCOUNT_EMAIL} \
    --role roles/iam.securityAdmin

# Assign the role for accessing secret data
gcloud projects add-iam-policy-binding ${PROJECT_ID} \
    --member serviceAccount:${SERVICE_ACCOUNT_EMAIL} \
    --role roles/secretmanager.secretAccessor

# Create a JSON key for the service account
gcloud iam service-accounts keys create key.json \
    --iam-account $SERVICE_ACCOUNT_EMAIL

# Create the bucket for the terraform state
gsutil mb gs://$BUCKET_NAME

# Enable versioning on the bucket
gsutil versioning set on gs://$BUCKET_NAME

# Create a secret to store the JSON key
echo "Creating Secret in Secret Manager"
gcloud secrets create $SECRET_ID \
    --replication-policy="automatic"

# Add the JSON key as a version in the secret
gcloud secrets versions add $SECRET_ID \
    --data-file key.json

# Clean up the local JSON key file
rm key.json
