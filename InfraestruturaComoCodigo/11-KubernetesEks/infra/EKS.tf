module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 19.0"

  cluster_name    = var.cluster_name
  cluster_version = "1.27"

  cluster_endpoint_private_access = true

  vpc_id                   = module.vpc.vpc_id
  subnet_ids               = module.vpc.private_subnets

  eks_managed_node_groups = {
    aplicacao = {
      min_size     = 1
      max_size     = 10
      desired_size = 3

      instance_types = ["t2.micro"]
      vpc_security_group_ids = [aws_security_group.ssh_cluster.id]
    }
  }
}