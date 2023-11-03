resource "digitalocean_domain" "main" {
  name = "wr-type.dev"
}

data "kubernetes_service" "ing" {
  metadata {
    name      = "nginx-ingress-ingress-nginx-controller"
    namespace = "default"
  }

}

resource "digitalocean_record" "main" {
  domain = digitalocean_domain.main.name
  type   = "A"
  name   = "@"
  value  = data.kubernetes_service.ing.status.0.load_balancer.0.ingress.0.ip
  ttl    = 3600
}
