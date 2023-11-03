resource "kubernetes_namespace" "cm" {
  metadata {
    name = "cert-manager"
  }
}
resource "helm_release" "cm" {
  name             = "cm"
  namespace        = kubernetes_namespace.cm.metadata[0].name
  create_namespace = false
  chart            = "cert-manager"
  repository       = "https://charts.jetstack.io"
  version          = "v1.5.3"
  values = [
    file("cert_values.yaml")
  ]
}

resource "helm_release" "nginx_ingress" {
  name       = "nginx-ingress"
  repository = "https://kubernetes.github.io/ingress-nginx"
  chart      = "ingress-nginx"
  depends_on = [digitalocean_kubernetes_cluster.wr_cluster]
}
