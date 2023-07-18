resource "google_secret_manager_secret" "cloud_sql_sa_secret" {
  secret_id = var.gcp_cloud_sql_sa_secret

  labels = {
    environment = "prod"
  }

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "cloud_sql_sa_secret_data" {
  secret      = google_secret_manager_secret.cloud_sql_sa_secret.id
  secret_data = base64decode(google_service_account_key.cloud_sql_user_key.private_key)
}
