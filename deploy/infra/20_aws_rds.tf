
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


resource "null_resource" "create_additional_databases" {
  triggers = {
    db_name     = var.auth_postgres_database
    rds_address = aws_db_instance.rds_postgres.address
  }

  provisioner "local-exec" {
    command = <<EOL
      export PGPASSWORD=${var.aws_rds_postgres_password}
      psql -h ${aws_db_instance.rds_postgres.address} \
           -U ${var.aws_rds_postgres_username} \
           ${var.aws_rds_postgres_db_name} \
           -c "CREATE DATABASE ${var.auth_postgres_database};"
EOL
  }

  depends_on = [aws_db_instance.rds_postgres]
}

resource "null_resource" "create_db_user" {
  triggers = {
    user        = var.auth_postgres_username
    db_name     = var.auth_postgres_database
    rds_address = aws_db_instance.rds_postgres.address
  }

  provisioner "local-exec" {
    command = <<EOL
      export PGPASSWORD=${var.aws_rds_postgres_password}
      psql -h ${aws_db_instance.rds_postgres.address} \
           -U ${var.aws_rds_postgres_username} \
           ${var.aws_rds_postgres_db_name} \
           -c "CREATE ROLE ${var.auth_postgres_username} WITH LOGIN PASSWORD '${var.auth_postgres_password}';"
EOL
  }

  depends_on = [null_resource.create_additional_databases]
}

resource "null_resource" "create_db_user_and_grant_permissions" {
  triggers = {
    user        = var.auth_postgres_username
    db_name     = var.auth_postgres_database
    rds_address = aws_db_instance.rds_postgres.address
  }

  provisioner "local-exec" {
    command = <<EOL
      export PGPASSWORD=${var.aws_rds_postgres_password}
      psql -h ${aws_db_instance.rds_postgres.address} \
           -U ${var.aws_rds_postgres_username} \
           ${var.aws_rds_postgres_db_name} \
           -c "GRANT ALL PRIVILEGES ON DATABASE ${var.auth_postgres_database} TO ${var.auth_postgres_username};"
EOL
  }

  depends_on = [null_resource.create_db_user]
}

resource "null_resource" "create_db_user_and_grant_permissions" {
  triggers = {
    user        = var.auth_postgres_username
    db_name     = var.auth_postgres_database
    rds_address = aws_db_instance.rds_postgres.address
  }

  provisioner "local-exec" {
    command = <<EOL
      export PGPASSWORD=${var.aws_rds_postgres_password}
      psql -h ${aws_db_instance.rds_postgres.address} \
           -U ${var.aws_rds_postgres_username} \
           ${var.aws_rds_postgres_db_name} \
           -c "GRANT ALL PRIVILEGES ON DATABASE ${var.auth_postgres_database} TO ${var.auth_postgres_username};"
EOL
  }

  depends_on = [null_resource.create_db_user]
}




resource "aws_security_group" "allow_backend" {
  name        = "allow_backend"
  description = "Allow inbound traffic from backend container"
}

data "digitalocean_droplets" "k8s_nodes" {
}

resource "aws_security_group_rule" "allow_k8s_nodes" {
  description       = "Allow connections from DOKS nodes"
  count             = length(data.digitalocean_droplets.k8s_nodes.droplets)
  type              = "ingress"
  from_port         = 5432
  to_port           = 5432
  protocol          = "tcp"
  cidr_blocks       = [format("%s/32", data.digitalocean_droplets.k8s_nodes.droplets[count.index].ipv4_address)]
  security_group_id = aws_security_group.allow_backend.id
}
