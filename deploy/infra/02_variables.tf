#
# Main
#

variable "sandbox_env" {
  type        = string
  description = "Environment infix"
}

variable "gcp_project_id" {
  type        = string
  description = "Google Cloud Platform Project Id"
}

variable "gcp_region" {
  type        = string
  description = "Google Cloud Platform Region"
}

variable "gcp_terraform_bucket" {
  type        = string
  description = "Terraform GCP bucket name"
}

#
# Backend
#

variable "gcp_cloud_sql_sa" {
  type        = string
  description = "Cloud Sql User service account id"
}

variable "gcp_cloud_sql_sa_secret" {
  type        = string
  description = "Cloud Sql User service account id"
}


#
# Cloud Build
#

variable "gcp_cloud_build_sa" {
  type        = string
  description = "Cloud Buld User service account id"
}

#
# Development
#

variable "gcp_development_sa" {
  type        = string
  description = "Development and build process service account"
}


variable "gcp_development_sa_secret" {
  type        = string
  description = "Development and build process service account seceret name"
}