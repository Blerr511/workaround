resource "aws_db_instance" "data_source" {
  identifier             = var.aws_rds_postgres_name
  engine                 = "postgres"
  engine_version         = "15.3"
  port                   = var.aws_rds_postgres_port
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

resource "aws_instance" "bastion" {
  ami           = "ami-0ab5a19dc928db69a"
  instance_type = "t3.micro"

  subnet_id = aws_subnet.public-1.id

  key_name = aws_key_pair.generated_key.key_name

  vpc_security_group_ids = [aws_security_group.bastion_sg.id]

  source_dest_check = false

  tags = {
    Name = "Bastion Host"
  }
}

resource "tls_private_key" "bastion_ssh_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}


resource "aws_key_pair" "generated_key" {
  key_name   = "bastion_generated_key"
  public_key = tls_private_key.bastion_ssh_key.public_key_openssh
}

resource "aws_security_group" "bastion_sg" {
  name        = "bastion_sg"
  description = "Security group for the Bastion host"
  vpc_id      = aws_vpc.main.id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}



output "db_address" {
  value = aws_db_instance.data_source.address
}
