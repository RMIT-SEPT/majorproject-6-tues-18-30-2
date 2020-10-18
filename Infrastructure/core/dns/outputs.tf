output "zone_id" {
  value = aws_route53_zone.domain.zone_id
}

output "domain_name" {
  value = var.domain_name
}

output "name_servers" {
  value = aws_route53_zone.domain.name_servers
}