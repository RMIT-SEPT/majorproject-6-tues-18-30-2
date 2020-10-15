include {
  path = find_in_parent_folders()
}

dependency "core_orchestration" {
  config_path = "${get_parent_terragrunt_dir()}/core/orchestration"
}

generate "kubernetes" {
  path      = "kubernetes.tf"
  if_exists = "overwrite"
  contents = <<EOF
provider "kubernetes" {
  version                = "=1.11.4"
  host                   = "${dependency.core_orchestration.outputs.eks_cluster.host}"
  token                  = "${dependency.core_orchestration.outputs.eks_cluster.token}"
  load_config_file       = false
  cluster_ca_certificate = <<EOT
${dependency.core_orchestration.outputs.eks_cluster.ca_certificate}
EOT
}
EOF
}

inputs = {
  kubernetes_namespace = dependency.core_orchestration.outputs.eks_cluster.namespace
  application_fqdn     = dependency.core_orchestration.outputs.application_ingress
}