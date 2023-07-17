resource "google_service_account" "cloud_sql_user" {
  project      = var.gcp_project_id
  account_id   = var.gcp_cloud_sql_sa
  display_name = "Cloud Sql User"
}


resource "google_service_account" "cloudbuild_sa" {
  account_id   = var.gcp_cloud_build_sa
  display_name = "Cloud Build service account"
  project      = var.gcp_project_id
}

