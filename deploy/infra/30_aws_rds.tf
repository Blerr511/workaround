resource "aws_db_instance" "data_source" {
  identifier             = var.aws_rds_postgres_name
  engine                 = "postgres"
  engine_version         = "15.3"
  port                   = 5432
  instance_class         = "db.t3.micro"
  db_name                = var.aws_rds_postgres_db_name
  username               = var.aws_rds_postgres_username
  password               = var.aws_rds_postgres_password
  allocated_storage      = 20
  skip_final_snapshot    = true
  db_subnet_group_name   = aws_db_subnet_group.data_source_default.name
  vpc_security_group_ids = [aws_security_group.data_source_sg.id]

  tags = {
    Name = "Postgres instance"
  }

  depends_on = [aws_security_group.data_source_sg]
}


resource "aws_db_subnet_group" "data_source_default" {
  name       = "my-database-subnetgroup"
  subnet_ids = [aws_subnet.private-1.id, aws_subnet.public-2.id]

  tags = {
    Name = "data-source-sub-net"
  }
}

resource "aws_security_group" "data_source_sg" {
  name        = "data_source_sg"
  description = "Data Source security group"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}



output "db_address" {
  value = aws_db_instance.data_source.address
}
