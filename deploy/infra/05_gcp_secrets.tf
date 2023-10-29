resource "google_secret_manager_secret" "development_sa_secret" {
  secret_id = var.gcp_development_sa_secret

  labels = {
    environment = "prod"
  }

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "development_sa_secret_data" {
  secret      = google_secret_manager_secret.development_sa_secret.id
  secret_data = base64decode(google_service_account_key.development_sa_key.private_key)
}

resource "google_secret_manager_secret" "github_ssh_key" {
  secret_id = var.gcp_github_ssh_key_secret_name

  labels = {
    create = "manual"
  }

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret" "artifacts_reader_sa_secret" {
  secret_id = var.gcp_artifacts_reader_sa_secret

  labels = {
    create = "automatic"
  }

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "artifacts_Reader_sa_secret" {
  secret      = google_secret_manager_secret.artifacts_reader_sa_secret.id
  secret_data = base64decode(google_service_account_key.artifacts_reader_key.private_key)
}

resource "google_secret_manager_secret" "cloud_build_sa_secret" {
  secret_id = var.gcp_cloud_build_sa_secret

  labels = {
    create = "automatic"
  }

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "cloud_build_sa_secret_version" {
  secret      = google_secret_manager_secret.cloud_build_sa_secret.id
  secret_data = base64decode(google_service_account_key.cloudbuild_sa_key.private_key)
}

resource "google_secret_manager_secret" "do_tf_access_key_secret" {
  secret_id = var.gcp_do_tf_access_key_secret_name

  labels = {
    create = "automatic"
  }

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "do_tf_access_key_secret_version" {
  secret      = google_secret_manager_secret.do_tf_access_key_secret.id
  secret_data = var.do_tf_access_key
}
