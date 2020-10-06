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