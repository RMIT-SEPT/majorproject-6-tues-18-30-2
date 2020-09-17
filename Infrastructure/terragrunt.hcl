locals {
  config_path = "${get_terragrunt_parent_dir()}/configuration/${get_env("TF_VAR_ENVIRONMENT")}"
  config_env  = read_terragrunt_config("${local.config_path}/environment.hcl").inputs
  config_file = "${local.config_path}/${trimsuffix(path_relative_to_include(), "/")}.tfvars"
}

remote_state {
  backend = "s3"
  config  = merge(local.config_env.remote_state.config, {
    bucket         = lower(format(
      local.config_env.remote_state.config.bucket,
      local.config_env.region_code,
      substr(get_env("TF_VAR_ENVIRONMENT", 0, 1))
    ))
    key            = lower("${get_env("TF_VAR_ENVIRONMENT")}/${trimsuffix(path_relative_to_include(), "/"}.tfstate")
    dynamodb_table = lower(format(
      local.config_env.remote_state.config.dynamodb_table,
      local.config_env.region_code,
      substr(get_env("TF_VAR_ENVIRONMENT", 0, 1))
    ))
  })
}

terraform {
  extra_arguments "configuration" {
    commands           = get_terraform_commands_that_need_vars()
    required_var_files = fileexists(local.config_file) ? [
      local.config_file
    ] : []
  }
}

terraform_version_constraint  = "0.13.3"