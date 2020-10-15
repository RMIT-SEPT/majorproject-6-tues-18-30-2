terraform {
  backend "s3" {}
}

provider "aws" {
  version = ">= 2.28.1"
  region  = var.region_name
}

data "aws_secretsmanager_secret" "authentication" {
  name = "authentication-api"
}

data "aws_secretsmanager_secret_version" "authentication" {
  secret_id = data.aws_secretsmanager_secret.authentication.id
}

module "application" {
  source    = "../../modules/application-deployment"
  name      = "authentication-api"
  namespace = var.kubernetes_namespace
  container = var.application_container
  replicas  = 3
  strip_path = true

  environment_variables = {
    "APP_PORT"          = "8080"
    "JWT_SECRET"        = jsondecode(data.aws_secretsmanager_secret_version.authentication.secret_string)["jwt"]
    "DATABASE_URL"      = jsondecode(data.aws_secretsmanager_secret_version.authentication.secret_string)["database-endpoint"]
    "DATABASE_USER"     = jsondecode(data.aws_secretsmanager_secret_version.authentication.secret_string)["database-username"]
    "DATABASE_PASSWORD" = jsondecode(data.aws_secretsmanager_secret_version.authentication.secret_string)["database-password"]
    "DATABASE_DRIVER"   = jsondecode(data.aws_secretsmanager_secret_version.authentication.secret_string)["database-driver"]
  }

  ingress = {
    hostname = var.application_fqdn
    path     = "/api/authentication/"
  }

  ports = {
    service     = 80
    application = 8080
  }
}