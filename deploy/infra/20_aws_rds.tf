
resource "aws_db_instance" "rds_postgres" {
  allocated_storage      = 20
  storage_type           = "gp2"
  engine                 = "postgres"
  engine_version         = "15.2"
  instance_class         = "db.t3.micro"
  publicly_accessible    = true
  identifier             = var.aws_rds_postgres_name
  username               = var.aws_rds_postgres_username
  password               = var.aws_rds_postgres_password
  db_name                = var.aws_rds_postgres_db_name
  skip_final_snapshot    = true
  vpc_security_group_ids = [aws_security_group.allow_backend.id]
}


resource "aws_security_group" "allow_backend" {
  name        = "allow_backend"
  description = "Allow inbound traffic from backend container"
}

resource "aws_security_group_rule" "allow_kubernetes" {
  type              = "ingress"
  from_port         = 5432
  to_port           = 5432
  protocol          = "tcp"
  cidr_blocks       = [format("%s/32", kubernetes_service.backend_service.status.0.load_balancer.0.ingress.0.ip)]
  security_group_id = aws_security_group.allow_backend.id
}

data "digitalocean_droplets" "k8s_nodes" {
}

resource "aws_security_group_rule" "allow_k8s_nodes" {
  count             = length(data.digitalocean_droplets.k8s_nodes.droplets)
  type              = "ingress"
  from_port         = 5432
  to_port           = 5432
  protocol          = "tcp"
  cidr_blocks       = [format("%s/32", data.digitalocean_droplets.k8s_nodes.droplets[count.index].ipv4_address)]
  security_group_id = aws_security_group.allow_backend.id
}
