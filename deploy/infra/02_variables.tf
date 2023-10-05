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

variable "gcp_artifacts_reader_sa" {
  type        = string
  description = "Serviec Account artifacts reader name"
}

variable "gcp_artifacts_reader_sa_secret" {
  type        = string
  description = "Secret name for artifacts reader sa credentials"
}


variable "gcp_bazel_remote_cache_bucket" {
  type        = string
  description = "Bazel remote cache bucket name"
}

variable "gcp_aws_rds_host_secret" {
  type        = string
  description = "AWS Rds database connection host"
}

variable "gcp_aws_bastion_host_ssh_key_secret" {
  type        = string
  description = "AWS Bastion host ssh key secret name"
}

variable "gcp_aws_bastion_instance_id" {
  type        = string
  description = "AWS Bastion host instance id"
}

variable "gcp_aws_rds_postgres_password_secret" {
  type        = string
  description = "AWS RDS postgres db password secret name"
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

variable "gcp_cloud_build_sa_secret" {
  type        = string
  description = "Cloud Buld User service account secretid"
}


variable "gcp_docker_artifacts_repository" {
  type        = string
  description = "Application images repoisotry"
}

variable "gcp_npm_artifacts_repository" {
  type        = string
  description = "Npm artifacts repository"
}

variable "gcp_aws_iam_user_cloud_builder_sa_secret" {
  type        = string
  description = "Secret Name of aws cloudbuilder user credentials"
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

variable "kubeconfig" {
  type        = string
  description = "Kubernetes config file path"
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

variable "aws_rds_postgres_name" {
  type        = string
  description = "AWS RDS postgres instance name"
}

variable "aws_rds_postgres_db_name" {
  type        = string
  description = "AWS RDS postgres db name"
}

variable "aws_rds_postgres_username" {
  type        = string
  description = "AWS RDS postgres db username"
}

variable "aws_rds_postgres_password" {
  type        = string
  description = "AWS RDS postgres db password"
}

variable "aws_rds_postgres_port" {
  type        = number
  description = "AWS RDS postgres instance port"
}

variable "aws_iam_user_cloud_builder" {
  type        = string
  description = "AWS IAM user for pushing pods into eks"
}
