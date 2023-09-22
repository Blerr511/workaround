resource "google_storage_bucket" "bazel_cache" {
  name     = var.gcp_bazel_remote_cache_bucket
  location = "US"

  force_destroy      = true

  storage_class = "STANDARD"

  versioning {
    enabled = true
  }

  lifecycle_rule {
    action {
      type = "Delete"
    }
    condition {
      age = 60
    }
  }
}


