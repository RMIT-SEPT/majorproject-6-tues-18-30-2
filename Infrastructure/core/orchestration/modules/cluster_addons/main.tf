module "spot_termination" {
  source                    = "./modules/spot_termination"
  worker_scaling_template   = var.worker_scaling_template
  worker_autoscaling_groups = var.worker_autoscaling_groups
}