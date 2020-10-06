terraform {
  backend "s3" {}
}

provider "aws" {
  version = ">= 2.28.1"
  region  = var.region_name
}

provider "kubernetes" {
  version                = "~> 1.11"
  host                   = module.cluster.cluster_configuration.host
  cluster_ca_certificate = module.cluster.cluster_configuration.ca_certificate
  token                  = module.cluster.cluster_authentication.token
  load_config_file       = false
}

provider "helm" {
  version = "~> 1.2"
  kubernetes {
    host                   = module.cluster.cluster_configuration.host
    cluster_ca_certificate = module.cluster.cluster_configuration.ca_certificate
    token                  = module.cluster.cluster_authentication.token
    load_config_file       = false
  }
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

module "cluster" {
  source                 = "./modules/cluster"
  environment_name       = var.environment_name
  resource_suffix        = var.resource_suffix
  cluster_name           = var.eks_cluster_name
  cluster_network        = {
    vpc_id  = module.networking.vpc_id
    subnets = module.networking.private_subnets
  }
  cluster_size           = var.eks_cluster_size
  cluster_capacity       = {
    min = var.eks_cluster_min_capacity
    max = var.eks_cluster_max_capacity
  }
  cluster_fault_tolerant = var.eks_cluster_fault_tolerant
  cluster_administrators = var.eks_cluster_administrators
  cluster_namespaces     = list(local.application_namespace, local.ingress_namespace)

  depends_on = [
    module.networking
  ]
}

module "cluster_addons" {
  source                    = "./modules/cluster_addons"
  worker_scaling_template   = module.cluster.worker_scaling_template
  worker_autoscaling_groups = module.cluster.workers_asg_names

  depends_on = [
    module.cluster
  ]
}

module "service_accounts" {
  source                 = "./modules/service_accounts"
  cluster_name           = var.eks_cluster_name
  environment_namespaces = list(local.application_namespace, local.ingress_namespace)

  depends_on = [
    module.cluster
  ]
}

module "routing" {
  source           = "./modules/routing"
  namespace        = local.ingress_namespace
  environment_name = var.environment_name
  root_domain      = var.domain_name

  depends_on = [
    module.cluster,
    module.cluster_addons
  ]
}

locals {
  application_namespace = "components"
  ingress_namespace     = "components-ingress"
  kubernetes            = {
    host           = module.cluster.cluster_configuration.host
    token          = module.service_accounts.environment_token
    ca_certificate = module.cluster.cluster_configuration.ca_certificate
    namespace      = local.application_namespace
  }
}