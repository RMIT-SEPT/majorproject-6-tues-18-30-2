include {
  path = find_in_parent_folders()
}

dependency "core_dns" {
  config_path = "${get_parent_terragrunt_dir()}/core/dns"
}

inputs = {
  domain_name = dependency.core_dns.outputs.domain_name
}