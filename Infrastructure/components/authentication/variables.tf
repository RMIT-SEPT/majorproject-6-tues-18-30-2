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

variable "kubernetes_namespace" {
  description = "The kubernetes namespace for deploying the application into."
  type        = string
}

variable "application_fqdn" {
  description = "The fully qualified domain name associated with the application."
  type        = string
}

variable "application_container" {
  description = "The artifact details persisted inside of an elastic container registry."
  type        = object({
    image = string
    tag   = string
  })
}