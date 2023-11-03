# Chicken/egg issue: can't assign rights for the bucket unlwess it's been already created
terraform {
  backend "gcs" {
    prefix = "state/infrastructure"
  }
  required_providers {
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.8.0"
    }
    aws = {
      source  = "hashicorp/aws"
      version = "5.16.1"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.16.1"
    }
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
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

provider "aws" {
  region = var.aws_region
}

provider "digitalocean" {
  token = var.do_tf_access_key
}


provider "helm" {
  kubernetes {
    host  = data.digitalocean_kubernetes_cluster.wr_cluster.endpoint
    token = data.digitalocean_kubernetes_cluster.wr_cluster.kube_config[0].token
    cluster_ca_certificate = base64decode(
      data.digitalocean_kubernetes_cluster.wr_cluster.kube_config[0].cluster_ca_certificate
    )
  }
}

data "digitalocean_kubernetes_cluster" "wr_cluster" {
  name = var.cluster_name
}


provider "kubernetes" {
  host  = data.digitalocean_kubernetes_cluster.wr_cluster.endpoint
  token = data.digitalocean_kubernetes_cluster.wr_cluster.kube_config[0].token
  cluster_ca_certificate = base64decode(
    data.digitalocean_kubernetes_cluster.wr_cluster.kube_config[0].cluster_ca_certificate
  )
}
