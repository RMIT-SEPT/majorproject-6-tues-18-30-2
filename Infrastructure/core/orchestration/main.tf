terraform {
  backend "s3" {}
}

provider "aws" {
  version = ">= 2.28.1"
  region  = var.region_name
}