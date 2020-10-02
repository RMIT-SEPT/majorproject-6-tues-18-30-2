terraform {
  backend "s3" {}
}

provider "aws" {
  version = ">= 2.28.1"
  region  = var.region_name
}

module "networking" {
  source           = "./modules/networking"
  environment_name = var.environment_name
  resource_suffix  = var.resource_suffix
  ip_block         = var.ip_block
  ip_block_prefix  = var.ip_block_prefix
  ip_block_offset  = var.ip_block_offset
  eks_cluster_name = var.eks_cluster_name
}