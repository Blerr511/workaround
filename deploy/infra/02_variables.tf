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

variable "gcp_do_tf_access_key_secret_name" {
  type        = string
  description = "Digital Ocean access key secret name"
}

variable "gcp_aws_redis_endpoint_secret_name" {
  type        = string
  description = "GCP secret name for AWS redis instance endpoint"
}

variable "gcp_aws_redis_password_secret_name" {
  type        = string
  description = "GCP secret name for AWS redis instance password"
}


variable "prompt_openai_api_key" {
  type        = string
  description = "OPENAPI api key"
}

variable "gcp_openai_key_secret_name" {
  type = string
  description = "GCP secret name for OPENAPI api key"
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


variable "gcp_aws_rds_postgres_connection_endpoint_secret_name" {
  type        = string
  description = "AWS RDS postgres instance connection secret name"
}

variable "gcp_aws_rds_auth_service_postgres_connection_endpoint_secret_name" {
  type        = string
  description = "AWS RDS auth service postgres instance connection secret name"
}
#
# K8S
#

variable "k8s_backend_name" {
  type        = string
  description = "K8S Backend POD selector name"
}

variable "k8s_backend_container_port" {
  type        = number
  description = "K8S backend container expose port"
}

#
# AWS
#

variable "aws_region" {
  type        = string
  description = "AWS region"
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

variable "auth_postgres_database" {
  type        = string
  description = "AWS RDS database name for auth service"
}

variable "aws_redis_password" {
  type        = string
  description = "AWS elasticchache redis security password"
}

variable "aws_redis_port" {
  type        = number
  description = "AWS elasticcache redist port"
}

# DIGITAL OCEAN

variable "do_tf_access_key" {
  type        = string
  description = "DIGITAL OCEAN terraform user access key"
}


# CLUSTER

variable "cluster_name" {
  type        = string
  description = "K8S Cluster name"
}
