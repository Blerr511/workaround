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

