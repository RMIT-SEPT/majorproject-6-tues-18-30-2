terraform {
  backend "s3" {}
}

provider "aws" {
  version = "~> 2.0"
  region  = var.region_name
}

resource "aws_route53_zone" "domain" {
  name = var.domain_name
}