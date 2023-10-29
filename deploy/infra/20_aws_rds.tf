
resource "aws_db_instance" "rds_postgres" {
  allocated_storage   = 20
  storage_type        = "gp2"
  engine              = "postgres"
  engine_version      = "15.2"
  instance_class      = "db.t3.micro"
  identifier          = var.aws_rds_postgres_name
  username            = var.aws_rds_postgres_username
  password            = var.aws_rds_postgres_password
  skip_final_snapshot = true
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

