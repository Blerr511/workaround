resource "aws_security_group" "redis_sg" {
  name        = "RedisSecurityGroup"
  description = "Redis Security Group"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 6379
    to_port     = 6379
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group_rule" "allow_k8s_nodes_redis" {
  description       = "Allow connections from DOKS nodes to reids"
  count             = length(data.digitalocean_droplets.k8s_nodes.droplets)
  type              = "ingress"
  from_port         = var.aws_redis_port
  to_port           = var.aws_redis_port
  protocol          = "tcp"
  cidr_blocks       = [format("%s/32", data.digitalocean_droplets.k8s_nodes.droplets[count.index].ipv4_address)]
  security_group_id = aws_security_group.redis_sg.id
}


resource "aws_elasticache_cluster" "redis_cluster" {
  cluster_id           = "redis-cluster"
  engine               = "redis"
  node_type            = "cache.t3.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis6.x"
  engine_version       = "6.x"
  port                 = var.aws_redis_port
  subnet_group_name    = aws_elasticache_subnet_group.redis_subnet_group.name
  security_group_ids   = [aws_security_group.redis_sg.id]
}

resource "aws_elasticache_subnet_group" "redis_subnet_group" {
  name        = "redis-subnet-group"
  subnet_ids  = [aws_subnet.subnet.id]
  description = "Subnet group for Redis Cluster"
}
