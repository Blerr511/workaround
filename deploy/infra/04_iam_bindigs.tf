resource "google_project_iam_member" "cloudbuild_role" {
  project = var.gcp_project_id
  role    = "roles/cloudbuild.builds.builder"
  member  = "serviceAccount:${google_service_account.cloudbuild_sa.email}"
}


resource "google_project_iam_binding" "cloud_sql_client" {
  project = var.gcp_project_id
  role    = "roles/cloudsql.client"

  members = [
    "serviceAccount:${google_service_account.cloud_sql_user.email}"
  ]
}


resource "google_project_iam_member" "storage_admin_role" {
  project = var.gcp_project_id
  role    = "roles/storage.admin"
  member  = "serviceAccount:${google_service_account.cloudbuild_sa.email}"
}

resource "google_project_iam_binding" "development_artifact_registry_reader" {
  project = var.gcp_project_id
  role    = "roles/artifactregistry.reader"

  members = [
    "serviceAccount:${google_service_account.development_sa.email}",
  ]
}

resource "google_project_iam_binding" "development_artifact_registry_writer" {
  project = var.gcp_project_id
  role    = "roles/artifactregistry.writer"

  members = [
    "serviceAccount:${google_service_account.development_sa.email}",
  ]
}
