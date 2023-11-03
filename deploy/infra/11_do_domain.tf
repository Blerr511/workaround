resource "helm_release" "nginx_ingress" {
  name       = "nginx-ingress"
  repository = "https://kubernetes.github.io/ingress-nginx"
  chart      = "ingress-nginx"
  depends_on = [digitalocean_kubernetes_cluster.wr_cluster]
}


data "template_file" "ingres_lb_mainfest" {
  template = file("k8s-ingess-lb.yaml.tpl")
  vars = {
    load_balancer_ip = digitalocean_reserved_ip.my_ip.ip_address
  }
}

output "test" {
  value = data.template_file.ingres_lb_mainfest.rendered
}

resource "kubernetes_manifest" "ingress_lb" {
  manifest = yamldecode(data.template_file.ingres_lb_mainfest.rendered)
}

resource "digitalocean_reserved_ip" "my_ip" {
  region = digitalocean_kubernetes_cluster.wr_cluster.region
}

resource "digitalocean_domain" "main" {
  name       = "wr-type.dev"
  ip_address = digitalocean_reserved_ip.my_ip.ip_address
}

resource "digitalocean_record" "main" {
  domain = digitalocean_domain.main.name
  type   = "A"
  name   = "@"
  value  = digitalocean_reserved_ip.my_ip.ip_address
  ttl    = 3600
}
