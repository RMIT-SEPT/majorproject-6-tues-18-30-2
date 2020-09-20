include {
  path = find_in_parent_folders()
}

dependency "core_routing" {
  config_path = "${get_parent_terrragrunt_dir()/core/routing}"
}

inputs = {
  zone_id     = dependency.core_routing.outputs.zone_id
  domain_name = dependency.core_routing.outputs.domain_name
}