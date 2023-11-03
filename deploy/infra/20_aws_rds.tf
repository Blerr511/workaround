
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

data "digitalocean_droplets" "k8s_nodes" {
}

resource "aws_security_group_rule" "allow_cluster_ingress" {
  type              = "ingress"
  from_port         = 5432
  to_port           = 5432
  protocol          = "tcp"
  cidr_blocks       = [format("%s/32", digitalocean_reserved_ip.my_ip.ip_address)]
  security_group_id = aws_security_group.allow_backend.id
}
