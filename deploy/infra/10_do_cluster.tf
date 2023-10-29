
resource "digitalocean_kubernetes_cluster" "wr_cluster" {
  name    = var.cluster_name
  region  = "fra1"
  version = "1.28.2-do.0"

  node_pool {
    name       = "worker-pool"
    size       = "s-2vcpu-2gb-90gb-intel"
    node_count = 2
  }
}
