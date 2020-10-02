variable "environment_name" {
  description = "The environment name where the resources are being deployed into."
  type        = string
}

variable "resource_suffix" {
  description = "The resource suffix assigned to each AWS resource to distinguish the region and environment."
  type        = string
}

variable "cluster_name" {
  description = "The name of the EKS cluster to be created against the given environment."
  type        = string
}

variable "kubernetes_version" {
  description = "The version EKS use when provisioning the managed cluster."
  type        = string
  default     = "1.17"
}

variable "cluster_network" {
  description = "The network configuration of the EKS cluster."
  type        = object({
    vpc_id  = string
    subnets = list(string)
  })
}

variable "cluster_size" {
  description = "The worker node size for each EC2 instance."
  type        = list(string)
}

variable "cluster_fault_tolerant" {
  description = "Determines whether the EKS cluster size will be multiples the amount of availability zones."
  type        = bool
}

variable "cluster_capacity" {
  description = "The worker node capacity planning for the EKS cluster."
  type        = object({
    min = number
    max = number
  })
}

variable "cluster_administrators" {
  description = "The administrative users who have complete access to the EKS cluster."
  type        = list(string)
}

variable "cluster_developers" {
  description = "The developers who have restricted access to the EKS cluster."
  type        = list(string)
  default     = []
}

variable "cluster_namespaces" {
  description = "The namespaces to provision within the Kubernetes cluster."
  type        = list(string)
  default     = []
}