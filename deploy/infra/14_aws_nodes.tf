resource "aws_iam_role" "nodes-master" {
  name = "eks-node-group-master"

  assume_role_policy = jsonencode({
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
    }]
    Version = "2012-10-17"
  })
}

resource "aws_iam_role_policy_attachment" "nodes-master-AmazonEKSWorkerNodePolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
  role       = aws_iam_role.nodes-master.name
}

resource "aws_iam_role_policy_attachment" "nodes-master-AmazonEKS_CNI_Policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
  role       = aws_iam_role.nodes-master.name
}

resource "aws_iam_role_policy_attachment" "nodes-master-AmazonEC2ContainerRegistryReadOnly" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
  role       = aws_iam_role.nodes-master.name
}

resource "aws_eks_node_group" "private-nodes" {
  cluster_name    = aws_eks_cluster.wr.name
  node_group_name = "private-nodes"
  node_role_arn   = aws_iam_role.nodes-master.arn

  subnet_ids = [
    aws_subnet.private-1.id,
    aws_subnet.private-2.id
  ]

  capacity_type  = "ON_DEMAND"
  instance_types = ["t3.small"]

  scaling_config {
    desired_size = 1
    max_size     = 3
    min_size     = 1
  }

  update_config {
    max_unavailable = 1
  }

  labels = {
    role = "general"
  }

  depends_on = [
    aws_iam_role_policy_attachment.nodes-master-AmazonEC2ContainerRegistryReadOnly,
    aws_iam_role_policy_attachment.nodes-master-AmazonEKSWorkerNodePolicy,
    aws_iam_role_policy_attachment.nodes-master-AmazonEKS_CNI_Policy,
  ]
}
