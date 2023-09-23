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


locals {
  aws_credentials = {
    access_key = aws_iam_access_key.cloud_builder_ak.id
    secret_key = aws_iam_access_key.cloud_builder_ak.secret
  }
  aws_credentials_base64 = base64encode(jsonencode(local.aws_credentials))
}

resource "google_secret_manager_secret" "aws_cloudbuilder_credentials" {
  secret_id = var.gcp_aws_iam_user_cloud_builder_sa_secret

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "aws_cloudbuilder_credentials" {
  secret      = google_secret_manager_secret.aws_cloudbuilder_credentials.id
  secret_data = local.aws_credentials_base64
}

resource "google_secret_manager_secret" "aws_rds_pg_connection_host" {
  secret_id = var.gcp_aws_rds_host_secret

  labels = {
    create = "automatic"
  }

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "aws_rds_pg_connection_host_version" {
  secret      = google_secret_manager_secret.aws_rds_pg_connection_host.id
  secret_data = aws_db_instance.data_source.endpoint
}
