output "eks_cluster" {
  value = local.kubernetes
}

output "application_ingress" {
  value = module.routing.eks_domain
}