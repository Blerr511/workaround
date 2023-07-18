
resource "google_project_iam_binding" "cloud_sql_client" {
  project = var.gcp_project_id
  role    = "roles/cloudsql.client"

  members = [
    "serviceAccount:${google_service_account.cloud_sql_user.email}"
  ]
}
