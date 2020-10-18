resource "helm_release" "spot_termination_handler" {
  name       = var.chart_name
  chart      = var.chart_name
  repository = var.chart_repository
  version    = var.chart_version
  namespace  = var.chart_namespace
}

resource "aws_autoscaling_policy" "eks_autoscaling_policy" {
  count                  = length(var.worker_scaling_template)
  name                   = "${var.worker_autoscaling_groups[count.index]}-autoscaling-policy"
  autoscaling_group_name = var.worker_autoscaling_groups[count.index]
  policy_type            = "TargetTrackingScaling"

  target_tracking_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ASGAverageCPUUtilization"
    }
    target_value = var.worker_cpu_average
  }
}