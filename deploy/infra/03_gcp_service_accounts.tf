resource "google_service_account" "cloudbuild_sa" {
  account_id   = var.gcp_cloud_build_sa
  display_name = "Cloud Build service account"
  project      = var.gcp_project_id
}


resource "google_service_account" "development_sa" {
  account_id   = var.gcp_development_sa
  display_name = "Development Service Account"
  project      = var.gcp_project_id
}

resource "google_service_account_key" "development_sa_key" {
  service_account_id = google_service_account.development_sa.name
}

resource "google_service_account" "artifacts_reader" {
  account_id   = var.gcp_artifacts_reader_sa
  display_name = "Artifacts Reader Service Account"
  project      = var.gcp_project_id
}

resource "google_service_account_key" "artifacts_reader_key" {
  service_account_id = google_service_account.artifacts_reader.name
}
