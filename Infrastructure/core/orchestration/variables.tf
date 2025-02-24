variable "region_name" {
  description = "The AWS region identifier to deploy resources into."
  type        = string

  validation {
    condition = contains(
      [
        "us-east-2", "us-east-1", "us-west-1", "us-west-2", "af-south-1", "ap-east-1", "ap-south-1", "ap-northeast-3",
        "ap-northeast-2", "ap-southeast-1", "ap-southeast-2", "ap-northeast-1", "ca-central-1", "cn-north-1",
        "cn-northwest-1", "eu-central-1", "eu-west-1", "eu-west-2", "eu-south-1", "eu-west-3", "eu-north-1",
        "me-south-1", "sa-east-1"
      ],
      var.region_name
    )
    error_message = "The AWS region name is not valid."
  }
}

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
  description = "The name of the EKS cluster."
  type        = string
}

variable "eks_cluster_size" {
  description = "The worker node size for each EC2 instance."
  type        = list(string)
}

variable "eks_cluster_min_capacity" {
  description = "The minimum amount of worker nodes in the EKS cluster."
  type        = number
}

variable "eks_cluster_max_capacity" {
  description = "The maximum amount of worker nodes in the EKS cluster."
  type        = number
}

variable "eks_cluster_fault_tolerant" {
  description = "Is the EKS cluster going to be fault tolerant."
  type        = bool
}

variable "eks_cluster_administrators" {
  description = "The administrative users who have complete access to the EKS cluster."
  type        = list(string)
}

variable "domain_name" {
  description = "The domain name designated to the AWS account."
  type        = string

  validation {
    condition     = length(var.domain_name) >= 3
    error_message = "The domain name must be a valid length and available TLD."
  }
}