resource "google_project_iam_member" "cloudbuild_role" {
  project = var.gcp_project_id
  role    = "roles/cloudbuild.builds.builder"
  member  = "serviceAccount:${google_service_account.cloudbuild_sa.email}"
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

resource "google_project_iam_binding" "artifacts_reader_artifacts_reader" {
  project = var.gcp_project_id
  role    = "roles/artifactregistry.reader"

  members = ["serviceAccount:${google_service_account.artifacts_reader.email}"]
}
