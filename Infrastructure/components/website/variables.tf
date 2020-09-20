variable "region_name" {
  description = "The AWS region identifier to deploy resources into."
  type        = string

  validation {
    condition = contains(["us-east-2", "us-east-1", "us-west-1", "us-west-2", "af-south-1", "ap-east-1", "ap-south-1", "ap-northeast-3", "ap-northeast-2", "ap-southeast-1", "ap-southeast-2", "ap-northeast-1", "ca-central-1", "cn-north-1", "cn-northwest-1", "eu-central-1", "eu-west-1", "eu-west-2", "eu-south-1", "eu-west-3", "eu-north-1", "me-south-1", "sa-east-1"], var.region_name)
    error_message = "The AWS region name is not valid."
  }
}

variable "zone_id" {
  description = "The zone id designated to the AWS account."
  type        = string

  validation {
    condition     = length(var.zone_id) >= 1
    error_message = "The zone id was invalid."
  }
}

variable "domain_name" {
  description = "The static website domain name."
  type        = string

  validation {
    condition     = length(var.domain_name) >= 3
    error_message = "The domain name must be a valid length and available TLD."
  }
}

variable "artifact_directory" {
  description = "The root of the artifact directory containing the website files to upload."
  type        = string
  default     = "artifacts/distributable"

  validation {
    condition     = length(var.artifact_directory) >= 1
    error_message = "The directory specified does not exist."
  }
}