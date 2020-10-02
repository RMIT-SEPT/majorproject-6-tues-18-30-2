variable "name" {
  description = "The name of the group for configuring RBAC."
  type        = string
}

variable "members" {
  description = "The member usernames part of the group."
  type        = list(string)
}

variable "rules" {
  description = "The access rules applied to the group."
  type        = list(object({
    api_groups = list(string)
    resources  = list(string)
    verbs      = list(string)
  }))
  default = [
    {
      api_groups = [ "*" ]
      resources  = [ "deployments", "pods", "pods/log", "services" ]
      verbs      = [ "get", "list" ]
    },
    {
      api_groups = [ "*" ]
      resources  = [ "pods/exec" ]
      verbs      = [ "create" ]
    },
    {
      api_groups = [ "*" ]
      resources  = [ "pods/portforward" ]
      verbs      = [ "*" ]
    }
  ]
}