data "aws_availability_zones" "all_available" {
  state = "available"
}

resource "aws_eip" "gateway" {
  vpc = true

  tags = {
    "cluster"     = var.eks_cluster_name
    "environment" = var.environment_name
  }
}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "2.54.0"

  name = "${local.purpose}-vpc-${var.resource_suffix}"
  cidr = var.ip_block
  azs  = data.aws_availability_zones.all_available.names

  private_subnets = [
    for zone_id in data.aws_availability_zones.all_available.zone_ids : (
      cidrsubnet(
        var.ip_block,
        var.ip_block_prefix,
        tonumber(substr(zone_id, length(zone_id) - 1, 1)) - 1
      )
    )
  ]

  public_subnets = [
    for zone_id in data.aws_availability_zones.all_available.zone_ids : (
      cidrsubnet(
        var.ip_block,
        var.ip_block_prefix,
        tonumber(substr(zone_id, length(zone_id) - 1, 1)) + var.ip_block_offset - 1)
    )
  ]

  enable_nat_gateway     = true
  single_nat_gateway     = true
  one_nat_gateway_per_az = false
  enable_dns_hostnames   = true
  reuse_nat_ips          = true
  external_nat_ip_ids    = [ aws_eip.gateway.id ]

  tags = {
    "kubernetes.io/cluster/${var.eks_cluster_name}" = "shared"
    "environment"                                   = var.environment_name
  }

  public_subnet_tags = {
    "kubernetes.io/cluster/${var.eks_cluster_name}" = "shared"
    "kubernetes.io/role/elb"                        = "1"
    "environment"                                   = var.environment_name
  }

  private_subnet_tags = {
    "kubernetes.io/cluster/${var.eks_cluster_name}" = "shared"
    "kubernetes.io/role/internal-elb"               = "1"
    "environment"                                   = var.environment_name
  }
}

locals {
  purpose = "sept"
}