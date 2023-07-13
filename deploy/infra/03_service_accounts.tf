resource "google_service_account" "cloud_sql_user" {
  project      = var.gcp_project.id
  account_id   = var.cloud_sql_user_sa
  display_name = "Cloud Sql User"
}
