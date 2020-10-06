resource "helm_release" "ingress" {
  name         = var.chart_name
  chart        = var.chart_name
  repository   = var.chart_repository
  version      = var.chart_version
  namespace    = var.namespace
  timeout      = 600
  force_update = false

  dynamic "set" {
    for_each = var.ingress_annotations

    content {
      name  = set.key
      value = set.value
      type  = "string"
    }
  }

  set {
    name  = "controller.service.annotations.service\\.beta\\.kubernetes\\.io/aws-load-balancer-ssl-cert"
    value = var.ingress_certificate
  }
}

data "kubernetes_service" "ingress" {
  metadata {
    name      = "${helm_release.ingress.name}-controller"
    namespace = var.namespace
  }

  depends_on = [
    helm_release.ingress
  ]
}