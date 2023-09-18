resource "aws_iam_role" "eks-master" {
  name = "eks-cluster-master"

  assume_role_policy = <<POLICY
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "Service": "eks.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
      }
    ]
  }
POLICY
}

resource "aws_iam_role_policy_attachment" "eks-master-AmazonEKSClusterPolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  role       = aws_iam_role.eks-master.name
}

resource "aws_eks_cluster" "wr" {
  name = var.aws_eks_cluster_name

  role_arn = aws_iam_role.eks-master.arn

  vpc_config {
    subnet_ids = [
      aws_subnet.private-1.id,
      aws_subnet.private-2.id,
      aws_subnet.public-1.id,
      aws_subnet.public-2.id,
    ]
  }

  depends_on = [aws_iam_role_policy_attachment.eks-master-AmazonEKSClusterPolicy]
}
