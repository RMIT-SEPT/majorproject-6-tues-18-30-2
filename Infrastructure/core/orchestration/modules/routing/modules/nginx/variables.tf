variable "chart_name" {
  description = "The name of the Helm chart used for handling ingress with nginx."
  type        = string
  default     = "nginx-ingress"
}

variable "chart_channel" {
  description = "The channel associated with the Helm chart."
  type        = string
  default     = "stable"
}

variable "chart_repository" {
  description = "The name of the Helm repository containing nginx ingress."
  type        = string
  default     = "https://kubernetes-charts.storage.googleapis.com"
}

variable "chart_version" {
  description = "The version associated with the Helm chart for nginx ingress."
  type        = string
  default     = "1.41.2"
}

variable "namespace" {
  description = "The namespace used for provisioning the nginx gateway."
  type        = string
}

variable "ingress_certificate" {
  description = "The resource id associated with the EKS SSL certificate."
  type        = string
}

variable "ingress_annotations" {
  description = "All of the ingress annotations associated with the gateway for routing to EKS."
  type        = map(string)
}