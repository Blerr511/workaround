resource "kubernetes_service" "backend_service" {
  metadata {
    name = var.k8s_backend_name
  }
  spec {
    selector = {
      app = var.k8s_backend_name
    }
    port {
      port        = 80
      target_port = var.k8s_backend_container_port
      protocol    = "TCP"
    }
    type = "LoadBalancer"
  }
}
