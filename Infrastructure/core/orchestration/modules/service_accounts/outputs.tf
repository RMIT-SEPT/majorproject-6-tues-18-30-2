output "environment_token" {
  sensitive = true
  value     = data.kubernetes_secret.environment_service_account_token.data.token
}