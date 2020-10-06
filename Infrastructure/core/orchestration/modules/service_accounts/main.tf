resource "kubernetes_namespace" "service_accounts" {
  metadata {
    name = var.service_account_namespace
  }
}

resource "kubernetes_service_account" "cluster_administrator" {
  metadata {
    name      = "cluster-administrator-${var.cluster_name}-cicd"
    namespace = var.service_account_namespace
  }

  depends_on = [
    kubernetes_namespace.service_accounts
  ]
}

resource "kubernetes_cluster_role_binding" "cluster_administrator" {
  metadata {
    name = "cluster-administrator-${var.cluster_name}-cicd"
  }

  role_ref {
    api_group = "rbac.authorization.k8s.io"
    kind      = "ClusterRole"
    name      = "cluster-admin"
  }

  subject {
    kind      = "ServiceAccount"
    name      = "cluster-administrator-${var.cluster_name}-cicd"
    namespace = var.service_account_namespace
  }

  depends_on = [
    kubernetes_namespace.service_accounts,
    kubernetes_service_account.cluster_administrator
  ]
}

data "kubernetes_secret" "cluster_administrator_service_account_token" {
  metadata {
    name      = kubernetes_service_account.cluster_administrator.default_secret_name
    namespace = var.service_account_namespace
  }

  depends_on = [
    kubernetes_service_account.cluster_administrator
  ]
}

resource "kubernetes_service_account" "environment" {
  metadata {
    name      = "${var.environment_identifier}-${var.cluster_name}-cicd"
    namespace = var.service_account_namespace
  }

  depends_on = [
    kubernetes_namespace.service_accounts
  ]
}

resource "kubernetes_role_binding" "environment" {
  for_each = {
    for namespace in var.environment_namespaces : (
      namespace
    ) => {
      namespace       = namespace,
      service_account = format("%s-%s-cicd", var.environment_identifier, var.cluster_name)
    }
  }

  metadata {
    name      = "${each.value.service_account}:cluster-admin"
    namespace = each.value.namespace
  }

  role_ref {
    api_group = "rbac.authorization.k8s.io"
    kind      = "ClusterRole"
    name      = "cluster-admin"
  }

  subject {
    kind      = "ServiceAccount"
    name      = each.value.service_account
    namespace = var.service_account_namespace
  }

  depends_on = [
    kubernetes_namespace.service_accounts,
    kubernetes_service_account.environment
  ]
}

data "kubernetes_secret" "environment_service_account_token" {
  metadata {
    name      = kubernetes_service_account.environment.default_secret_name
    namespace = var.service_account_namespace
  }

  depends_on = [
    kubernetes_service_account.environment
  ]
}