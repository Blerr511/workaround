
resource "digitalocean_kubernetes_cluster" "wr_cluster" {
  name    = var.cluster_name
  region  = "fra1"
  version = "latest"

  node_pool {
    name       = "worker-pool"
    size       = "s-2vcpu-2gb-90gb-intel"
    node_count = 3
  }
}
