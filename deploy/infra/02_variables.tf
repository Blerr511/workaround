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

variable "gcp_github_ssh_key_secret_name" {
  type        = string
  description = "Github repo ssh access key"
}

#
# Backend
#


#
# Cloud Build
#

variable "gcp_cloud_build_sa" {
  type        = string
  description = "Cloud Buld User service account id"
}

variable "gcp_docker_artifacts_repository" {
  type        = string
  description = "Application images repoisotry"
}

variable "gcp_npm_artifacts_repository" {
  type        = string
  description = "Npm artifacts repository"
}

#
# GKE Cluster
#

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


#
# AWS
#

variable "aws_region" {
  type        = string
  description = "AWS region"
}

variable "aws_eks_cluster_name" {
  type        = string
  description = "AWS EKS cluster name"
}
