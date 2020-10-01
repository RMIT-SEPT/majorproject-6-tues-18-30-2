variable "environment_name" {
  description = "The environment name where the resources are being deployed into."
  type        = string
}

variable "resource_suffix" {
  description = "The resource suffix assigned to each AWS resource to distinguish the region and environment."
  type        = string
}

variable "ip_block" {
  description = "The reserved CIDR IP Address block used by the VPC."
  type        = string
}

variable "ip_block_prefix" {
  description = "The associated CIDR block prefix for calculating the amount of CIDR blocks in each subnetwork."
  type        = number
}

variable "ip_block_offset" {
  description = "The extension offset used to calculate public subnets in the CIDR block while avoiding private collisions."
  type        = number
}

variable "eks_cluster_name" {
  description = "The name of the EKS cluster created against the given environment."
  type        = string
}