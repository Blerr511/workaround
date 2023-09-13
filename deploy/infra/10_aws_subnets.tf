resource "aws_subnet" "private-1" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.0.0/19"
  availability_zone = var.aws_region

  tags = {
    "Name"                            = "private-1"
    "kubernetes.io/role/internal-elb" = "1"
    "kubernetes.io/cluster/wr"        = "owned"
  }
}

resource "aws_subnet" "private-2" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.32.0/19"
  availability_zone = var.aws_region

  tags = {
    "Name"                            = "private-1"
    "kubernetes.io/role/internal-elb" = "1"
    "kubernetes.io/cluster/wr"        = "owned"
  }
}

resource "aws_subnet" "public-1" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.64.0/19"
  availability_zone       = var.aws_region
  map_public_ip_on_launch = true

  tags = {
    "Name"                     = "private-1"
    "kubernetes.io/role/elb"   = "1"
    "kubernetes.io/cluster/wr" = "owned"
  }
}



resource "aws_subnet" "public-2" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.96.0/19"
  availability_zone       = var.aws_region
  map_public_ip_on_launch = true

  tags = {
    "Name"                     = "private-1"
    "kubernetes.io/role/elb"   = "1"
    "kubernetes.io/cluster/wr" = "owned"
  }
}

