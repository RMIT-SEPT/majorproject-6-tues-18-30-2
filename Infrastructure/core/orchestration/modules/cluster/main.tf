data "aws_availability_zones" "all_available" {
  state = "available"
}

data "aws_caller_identity" "iac" {}

module "eks" {
  source                        = "terraform-aws-modules/eks/aws"
  version                       = "12.1.0"
  cluster_name                  = var.cluster_name
  cluster_version               = var.kubernetes_version
  write_kubeconfig              = false
  vpc_id                        = var.cluster_network.vpc_id
  subnets                       = var.cluster_network.subnets
  map_users                     = concat(local.administrators, local.developers)
  worker_groups_launch_template = local.worker_scaling
}

data "aws_eks_cluster" "cluster" {
  name = module.eks.cluster_id
}

data "aws_eks_cluster_auth" "cluster" {
  name = module.eks.cluster_id
}

locals {
  purpose         = "sept"
  available_zones = length(data.aws_availability_zones.all_available.zone_ids)
  administrators  = [
    for admin in var.cluster_administrators : {
      userarn  = "arn:aws:iam::${data.aws_caller_identity.iac.account_id}:user/${admin}"
      username = admin
      groups   = [ "system:masters" ]
    }
  ]
  developers      = [
    for developer in var.cluster_developers : {
      userarn  = "arn:aws:iam::${data.aws_caller_identity.iac.account_id}:user/${developer}"
      username = developer
      groups   = [ "${local.purpose}-developers" ]
    }
  ]
  worker_scaling  = [
    {
      public_ip               = true
      asg_min_size            = var.cluster_fault_tolerant ? var.cluster_capacity.min * local.available_zones : var.cluster_capacity.min
      asg_max_size            = var.cluster_fault_tolerant ? var.cluster_capacity.max * local.available_zones : var.cluster_capacity.max
      asg_desired_capacity    = var.cluster_fault_tolerant ? var.cluster_capacity.min * local.available_zones : var.cluster_capacity.min
      override_instance_types = var.cluster_size
      kubelet_extra_args      = "--node-labels=node.kubernetes.io/lifecycle=spot"
    }
  ]
}