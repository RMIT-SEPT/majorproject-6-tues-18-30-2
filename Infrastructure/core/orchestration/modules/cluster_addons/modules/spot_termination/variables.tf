variable "chart_name" {
  description = "The name of the Helm chart used for handling EKS Spot instances termination."
  type        = string
  default     = "aws-node-termination-handler"
}

variable "chart_repository" {
  description = "The name of the Helm repository containing the EKS Spot instance terminator."
  type        = string
  default     = "https://aws.github.io/eks-charts"
}

variable "chart_version" {
  description = "The version associated with the Helm chart for terminating EKS Spot instances."
  type        = string
  default     = "0.9.1"
}

variable "chart_namespace" {
  description = "The Kubernetes namespace used to deploy the Helm chart for terminating EKS Spot instances."
  type        = string
  default     = "kube-system"
}

variable "worker_scaling_template" {
  description = "The applied worker scaling group launch template associated with EKS Spot instances."
  type        = list(object({
    public_ip               = bool
    asg_min_size            = number
    asg_max_size            = number
    asg_desired_capacity    = number
    override_instance_types = list(string)
    kubelet_extra_args      = string
  }))
}

variable "worker_autoscaling_groups" {
  description = "The worker autoscaler groups that were provisioned alongside the EKS cluster."
  type        = list(string)
  default     = []
}

variable "worker_cpu_average" {
  description = "The average CPU threshold use for determining the EKS worker instances autoscale."
  type        = number
  default     = 50
}