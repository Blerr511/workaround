resource "google_artifact_registry_repository" "npm_artifacts" {
  project       = var.gcp_project_id
  location      = var.gcp_region
  repository_id = var.gcp_npm_artifacts_repository
  format        = "npm"
  description   = "Private npm packages"
}

resource "google_artifact_registry_repository" "app_docker_artifacts" {
  project       = var.gcp_project_id
  location      = var.gcp_region
  repository_id = var.gcp_docker_artifacts_repository
  format        = "Docker"
  description   = "Application docker images"
}

resource "google_artifact_registry_repository" "sdk_tool_artifacts" {
  project       = var.gcp_project_id
  location      = var.gcp_region
  repository_id = "cloudsdktool"
  format        = "Docker"
  description   = "Cloud Sdk Tool images"
}
