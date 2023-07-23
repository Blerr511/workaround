resource "google_project_service" "iam_api" {
  project = var.gcp_project_id
  service = "iam.googleapis.com"

  disable_dependent_services = true
  disable_on_destroy         = false
}


resource "google_project_service" "kubernetes_engine_api" {
  project = var.gcp_project_id
  service = "container.googleapis.com"

  disable_dependent_services = true
  disable_on_destroy         = false
}

resource "google_project_service" "artifact_registry_api" {
  project = var.gcp_project_id
  service = "artifactregistry.googleapis.com"

  disable_dependent_services = true
  disable_on_destroy         = false
}

resource "google_project_service" "service_networking" {
  project = var.gcp_project_id
  service = "servicenetworking.googleapis.com"

  disable_dependent_services = true
  disable_on_destroy         = false
}


resource "google_sql_database_instance" "instance" {
  name             = var.gcp_cloud_sql_name
  database_version = "POSTGRES_13"
  region           = "europe-central2"

  settings {
    tier      = "db-f1-micro"
    disk_size = 100
  }
}
