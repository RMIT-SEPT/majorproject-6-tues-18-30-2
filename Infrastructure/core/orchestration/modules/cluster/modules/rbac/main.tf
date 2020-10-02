resource "kubernetes_cluster_role" "iam" {
  count = length(var.members) > 0 ? 1 : 0

  metadata {
    name = local.name
  }

  dynamic "rule" {
    for_each = toset(var.rules)

    content {
      api_groups = rule.value.api_groups
      resources  = rule.value.resources
      verbs      = rule.value.verbs
    }
  }
}

resource "kubernetes_cluster_role_binding" "iam" {
  count = length(var.members) > 0 ? 1 : 0

  metadata {
    name = local.name
  }

  role_ref {
    api_group = "rbac.authorization.k8s.io"
    kind      = "ClusterRole"
    name      = local.name
  }

  dynamic "subject" {
    for_each = toset(var.members)

    content {
      name      = subject.value
      kind      = "User"
      api_group = "rbac.authorization.k8s.io"
    }
  }
}

locals {
  name    = "${local.purpose}-${var.name}"
  purpose = "sept"
}