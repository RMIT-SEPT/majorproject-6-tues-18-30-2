locals {
  default_env = "development"
  binary_path = "${get_parent_terragrunt_dir()}/binaries/${get_platform()}"
  config_path = "${get_parent_terragrunt_dir()}/configuration/${get_env("TF_VAR_ENVIRONMENT", local.default_env)}"
  config_env  = read_terragrunt_config("${local.config_path}/environment.hcl").inputs
  config_file = "${local.config_path}/${trimsuffix(path_relative_to_include(), "/")}.tfvars"
}

remote_state {
  backend = "s3"
  config  = merge(local.config_env.remote_state.config, {
    bucket         = lower(format(
      local.config_env.remote_state.config.bucket,
      local.config_env.region_code,
      substr(get_env("TF_VAR_ENVIRONMENT", local.default_env), 0, 1)
    ))
    key            = lower("${get_env("TF_VAR_ENVIRONMENT", local.default_env)}/${trimsuffix(path_relative_to_include(), "/")}.tfstate")
    dynamodb_table = lower(format(
      local.config_env.remote_state.config.dynamodb_table,
      local.config_env.region_code,
      substr(get_env("TF_VAR_ENVIRONMENT", local.default_env), 0, 1)
    ))
  })
}

terraform {
  extra_arguments "configuration" {
    commands           = get_terraform_commands_that_need_vars()
    required_var_files = fileexists(local.config_file) ? [
      local.config_file
    ] : []
    env_vars           = {
      TF_VAR_region_name = local.config_env.remote_state.config.region
    }
  }
}

terraform_binary              = "${local.binary_path}/terraform${get_platform() == "windows" ? ".exe" : ""}"
terraform_version_constraint  = "0.13.3"
terragrunt_version_constraint = ">= 0.25.0"