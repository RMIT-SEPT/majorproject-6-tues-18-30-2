resource "aws_acm_certificate" "eks" {
  domain_name               = local.eks_domain
  subject_alternative_names = [ "*.${local.eks_domain}" ]
  validation_method         = "DNS"

  tags = {
    "name"        = local.eks_domain
    "environment" = var.environment_name
  }
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

locals {
  eks_domain = "k8s.${var.root_domain}"
}