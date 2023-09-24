resource "aws_iam_user" "cloud_builder" {
  name = var.aws_iam_user_cloud_builder
}

resource "aws_iam_access_key" "cloud_builder_ak" {
  user = aws_iam_user.cloud_builder.name
}


resource "aws_iam_user_policy_attachment" "cloud_builder_policy" {
  user       = aws_iam_user.cloud_builder.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
}

resource "aws_iam_policy" "manage_bastion" {
  name        = "ManageBastionHostPolicy"
  description = "Policy to start, stop, and describe EC2 instances."

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "ec2:StartInstances",
          "ec2:StopInstances",
          "ec2:DescribeInstances"
        ],
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_user_policy_attachment" "cloud_builder_bastion_attachement" {
  user       = aws_iam_user.cloud_builder.name
  policy_arn = aws_iam_policy.manage_bastion.arn
}
