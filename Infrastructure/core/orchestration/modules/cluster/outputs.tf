output "cluster_configuration" {
  value = {
    id             = module.eks.cluster_id
    host           = data.aws_eks_cluster.cluster.endpoint
    ca_certificate = base64decode(data.aws_eks_cluster.cluster.certificate_authority.0.data)
  }
}

output "cluster_authentication" {
  sensitive = true
  value     = {
    token = data.aws_eks_cluster_auth.cluster.token
  }
}

output "worker_scaling_template" {
  value = local.worker_scaling
}

output "workers_asg_names" {
  value = module.eks.workers_asg_names
}