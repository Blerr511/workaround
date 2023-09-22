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

resource "google_project_iam_custom_role" "secret_accessor" {
  role_id     = "SecretAccessorRole"
  title       = "Secret Manager Accessor Role"
  description = "Custom role for accessing secrets in Secret Manager"
  project     = var.gcp_project_id
  permissions = ["secretmanager.versions.access", "secretmanager.versions.get"]
}

resource "google_storage_bucket_iam_binding" "bazel_cache_bucket_writer" {
  bucket = google_storage_bucket.bazel_cache.name
  role   = "roles/storage.objectCreator"
  
  members = [
    "serviceAccount:${google_service_account.cloudbuild_sa.email}",
  ]
}

resource "google_project_iam_member" "cloud_builder_secrets_accessor" {
  project = var.gcp_project_id
  role    = google_project_iam_custom_role.secret_accessor.id
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
