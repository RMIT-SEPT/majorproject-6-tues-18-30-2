data "aws_route53_zone" "root_domain" {
  name = var.root_domain
}

resource "aws_acm_certificate" "eks" {
  domain_name               = local.eks_domain
  subject_alternative_names = [ "*.${local.eks_domain}" ]
  validation_method         = "DNS"

  tags = {
    "name"        = local.eks_domain
    "environment" = var.environment_name
  }
}

resource "aws_route53_record" "eks_validation" {
  name    = aws_acm_certificate.eks.domain_validation_options.0.resource_record_name
  type    = aws_acm_certificate.eks.domain_validation_options.0.resource_record_type
  zone_id = data.aws_route53_zone.root_domain.id
  records = [ aws_acm_certificate.eks.domain_validation_options.0.resource_record_value ]
  ttl     = 60
}

resource "aws_acm_certificate_validation" "eks_validation" {
  certificate_arn         = aws_acm_certificate.eks.arn
  validation_record_fqdns = [ aws_route53_record.eks_validation.fqdn ]
}

module "ingress" {
  source              = "./modules/nginx"
  namespace           = var.namespace
  ingress_certificate = aws_acm_certificate.eks.id
  ingress_annotations = {
    "controller.service.httpPort.targetPort"                                                                    = "http",
    "controller.service.httpsPort.targetPort"                                                                   = "http",
    "controller.service.annotations.service\\.beta\\.kubernetes\\.io/aws-load-balancer-backend-protocol"        = "http",
    "controller.service.annotations.service\\.beta\\.kubernetes\\.io/aws-load-balancer-ssl-ports"               = "https",
    "controller.service.annotations.service\\.beta\\.kubernetes\\.io/aws-load-balancer-connection-idle-timeout" = "60",
    "controller.service.annotations.service\\.beta\\.kubernetes\\.io/aws-load-balancer-type"                    = "elb"
  }
}

data "aws_elb_hosted_zone_id" "elb_zone_id" {}

resource "aws_route53_record" "eks" {
  zone_id = data.aws_route53_zone.root_domain.id
  name    = local.eks_domain
  type    = "A"

  alias {
    name                   = module.ingress.hostname
    zone_id                = data.aws_elb_hosted_zone_id.elb_zone_id.id
    evaluate_target_health = true
  }

  depends_on = [
    module.ingress
  ]
}

locals {
  eks_domain = "k8s.${var.root_domain}"
}