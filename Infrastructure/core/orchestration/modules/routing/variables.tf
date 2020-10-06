variable "environment_name" {
  description = "The environment name where the resources are being deployed into."
  type        = string
}

variable "root_domain" {
  description = "The root domain name already configured in the AWS account."
  type        = string

  validation {
    condition     = length(var.root_domain) >= 3
    error_message = "The domain name must be a valid length and available TLD."
  }
}

variable "namespace" {
  description = "The namespace used for provisioning the nginx gateway."
  type        = string
}