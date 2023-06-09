# Chicken/egg issue: can't assign rights for the bucket unlwess it's been already created
terraform {
  backend "gcs" {
    bucket = "workaround-388416-terraform"
    prefix = "state/infrastructure"
  }
  required_providers {
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.8.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.16.1"
    }
    google = {
      source  = "hashicorp/google"
      version = "4.47.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "4.47.0"
    }
  }
}

provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region
}
