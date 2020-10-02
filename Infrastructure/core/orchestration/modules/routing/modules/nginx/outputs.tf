output "hostname" {
  value = data.kubernetes_service.ingress.load_balancer_ingress.0.hostname
}