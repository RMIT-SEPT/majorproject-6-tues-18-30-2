variable "name" {
  description = "The name of the application to deploy."
  type        = string
}

variable "namespace" {
  description = "The namespace to deploy the application into."
  type        = string
}

variable "container" {
  description = "The container information for the application."
  type        = object({
    image = string
    tag   = string
  })
}

variable "ports" {
  description = "The ports intended for exposing the service and to access the application by the service respectively."
  type        = object({
    service     = number
    application = number
  })
}

variable "singleton" {
  description = "Determines whether the application is intended to be a singleton service."
  type        = bool
  default     = false
}

variable "replicas" {
  description = "The amount of replicas to run of the application."
  type        = number
  default     = 1
}

variable "resource_limits" {
  description = "The application resource limits for autoscaling."
  type        = object({
    cpu    = string
    memory = string
  })
  default     = {
    cpu    = "100m"
    memory = "1024Mi"
  }
}

variable "request_limits" {
  description = "The application request limits for autoscaling."
  type        = object({
    cpu    = string
    memory = string
  })
  default     = {
    cpu    = "30m"
    memory = "128Mi"
  }
}

variable "environment_variables" {
  description = "The plaintext environment variables associated with the application."
  type        = map(string)
  default     = {}
}

variable "environment_secrets" {
  description = "The reference to kubernetes secrets that already exist to associate with the application."
  type        = map(object({
    name = string
    key  = string
  }))
  default     = {}
}

variable "ingress" {
  description = "The nginx ingress routing to the application."
  type        = object({
    hostname = string
    path     = string
  })
}

variable "ingress_annotations" {
  description = "Any additional Kubernetes ingress annotations."
  type        = map(string)
  default     = {}
}

variable "strip_path" {
  description = "Determines whether the path is stripped from the ingress request for routing to the application."
  type        = bool
  default     = false
}