resource "kubernetes_deployment" "application" {
  metadata {
    name      = var.name
    namespace = var.namespace
  }

  spec {
    selector {
      match_labels = {
        "app" = var.name
      }
    }

    replicas = var.singleton ? 1 : var.replicas
    strategy {
      type = var.singleton ? "Recreate" : "RollingUpdate"
    }

    revision_history_limit = 1
    template {
      metadata {
        labels = {
          "app" = var.name
        }
      }

      spec {
        dns_config {
          option {
            name = "single-request-reopen"
          }
        }

        container {
          name              = var.name
          image             = "${var.container.image}:${var.container.tag}"
          image_pull_policy = "Always"

          port {
            container_port = var.ports.application
          }

          resources {
            limits {
              cpu    = var.resource_limits.cpu
              memory = var.resource_limits.memory
            }

            requests {
              cpu    = var.request_limits.cpu
              memory = var.request_limits.memory
            }
          }

          dynamic "env" {
            for_each = var.environment_variables

            content {
              name  = replace(replace(env.key, ".", "_"), ":", "__")
              value = env.value
            }
          }

          dynamic "env" {
            for_each = var.environment_secrets

            content {
              name = replace(replace(env.key, ".", "_"), ":", "__")
              value_from {
                config_map_key_ref {
                  name = env.value.name
                  key  = env.value.key
                }
              }
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "application" {
  metadata {
    name        = var.name
    namespace   = var.namespace
    annotations = {
      "service.beta.kubernetes.io/aws-load-balancer-internal" = "true"
    }
  }

  spec {
    selector = {
      app = var.name
    }

    port {
      port        = var.ports.service
      target_port = var.ports.application
    }
  }
}

resource "kubernetes_ingress" "application" {
  metadata {
    name        = "${var.name}-ingress"
    namespace   = var.namespace
    annotations = merge(
      {
        "external-dns.alpha.kubernetes.io/hostname"     = var.ingress.hostname
        "nginx.ingress.kubernetes.io/enable-access-log" = "false"
      },
      var.ingress.path != "/" ? {
        "nginx.ingress.kubernetes.io/rewrite-target" = "${var.strip_path ? "" : var.ingress.path}/$2"
      } : {},
      var.ingress_annotations
    )
  }

  spec {
    rule {
      host = var.ingress.hostname
      http {
        path {
          path = var.ingress.path == "/" ? var.ingress.path : "${var.ingress.path}(/|$)(.*)"
          backend {
            service_name = var.name
            service_port = var.ports.service
          }
        }
      }
    }
  }
}