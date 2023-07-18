resource "google_service_account" "cloud_sql_user" {
  project      = var.gcp_project_id
  account_id   = var.gcp_cloud_sql_sa
  display_name = "Cloud Sql User"
}

resource "google_service_account_key" "cloud_sql_user_key" {
  service_account_id = google_service_account.cloud_sql_user.name
}
