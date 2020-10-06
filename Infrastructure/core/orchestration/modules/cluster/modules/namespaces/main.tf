resource "kubernetes_namespace" "eks" {
  for_each = toset(var.names)

  metadata {
    name        = each.value
    annotations = {
      name = each.value
    }
  }
}