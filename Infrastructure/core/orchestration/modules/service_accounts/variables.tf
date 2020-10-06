variable "cluster_name" {
  description = "The name of the EKS cluster created against the given environment."
  type        = string
}

variable "service_account_namespace" {
  description = "The name of the unique namespace to provision service accounts."
  type        = string
  default     = "cicd-service-accounts"
}

variable "environment_identifier" {
  description = "The unique identifier for environmental service accounts."
  type        = string
  default     = "environment-deployer"
}

variable "environment_namespaces" {
  description = "The namespaces used by the environment for applications and their respective ingresses."
  type        = list(string)
}