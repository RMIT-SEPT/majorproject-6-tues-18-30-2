terraform {
  backend "s3" {}
}

provider "aws" {
  version = ">= 2.28.1"
  region  = var.region_name
}

data "aws_secretsmanager_secret" "booking" {
  name = "booking-api"
}

data "aws_secretsmanager_secret_version" "booking" {
  secret_id = data.aws_secretsmanager_secret.booking.id
}

module "application" {
  source     = "../../modules/application-deployment"
  name       = "booking-api"
  namespace  = var.kubernetes_namespace
  container  = var.application_container
  replicas   = 3

  environment_variables = {
    "APP_PORT"          = "8080"
    "DATABASE_URL"      = jsondecode(data.aws_secretsmanager_secret_version.booking.secret_string)["database-endpoint"]
    "DATABASE_USER"     = jsondecode(data.aws_secretsmanager_secret_version.booking.secret_string)["database-username"]
    "DATABASE_PASSWORD" = jsondecode(data.aws_secretsmanager_secret_version.booking.secret_string)["database-password"]
    "DATABASE_DRIVER"   = jsondecode(data.aws_secretsmanager_secret_version.booking.secret_string)["database-driver"]
  }

  ingress = {
    hostname = var.application_fqdn
    path     = "/api/booking"
  }

  ports = {
    service     = 80
    application = 8080
  }
}