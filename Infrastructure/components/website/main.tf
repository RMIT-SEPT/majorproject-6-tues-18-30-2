terraform {
  backend "s3" {}
}

provider "aws" {
  version = "~> 2.0"
  region  = var.region_name
}

#resource "aws_acm_certificate" "cert" {
#  domain_name       = var.domain_name
#  validation_method = "DNS"
#
#  lifecycle {
#    create_before_destroy = true
#  }
#}
#
#resource "aws_route53_record" "validation" {
#  zone_id = var.zone_id
#  name    = aws_acm_certificate.cert.domain_validation_options.0.resource_record_name
#  type    = aws_acm_certificate.cert.domain_validation_options.0.resource_record_type
#  records = [
#    aws_acm_certificate.cert.domain_validation_options.0.resource_record_value
#  ]
#  ttl     = 60
#}
#
#resource "aws_acm_certificate_validation" "cert" {
#  certificate_arn = aws_acm_certificate.cert.arn
#
#  validation_record_fqdns = [
#    aws_route53_record.validation.fqdn
#  ]
#}

resource "aws_route53_record" "a_record" {
  zone_id = var.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_s3_bucket.website.website_domain
    zone_id                = aws_s3_bucket.website.hosted_zone_id
    evaluate_target_health = false
  }

  depends_on = [ aws_s3_bucket.website ]
}

resource "aws_route53_record" "cname_record" {
  zone_id = var.zone_id
  name    = "www"
  type    = "CNAME"
  ttl     = "300"
  records = [ var.domain_name ]
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = "${aws_s3_bucket.website.bucket}.s3.amazonaws.com"
    origin_id   = local.website_origin_id
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Distributes the traffic inbound to the official website"
  default_root_object = "index.html"

  #aliases = [ var.domain_name ]

  default_cache_behavior {
    allowed_methods  = [
      "DELETE",
      "GET",
      "HEAD",
      "OPTIONS",
      "PATCH",
      "POST",
      "PUT"
    ]
    cached_methods   = [ "GET", "HEAD" ]
    target_origin_id = local.website_origin_id

    forwarded_values {
      query_string = false
      headers      = [ "Origin" ]

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    #acm_certificate_arn = aws_acm_certificate_validation.cert.certificate_arn
    #minimum_protocol_version = "TLSv1"
    #ssl_support_method = "sni-only"
    cloudfront_default_certificate = true
  }

  depends_on = [
    aws_s3_bucket.website,
    #aws_acm_certificate.cert
  ]
}

resource "aws_s3_bucket" "website" {
  bucket = var.domain_name
  acl    = "public-read"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadWebsiteBucket",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::${var.domain_name}/*"
    }
  ]
}
EOF

  website {
    index_document = "index.html"
    error_document = "error.html"
  }

  cors_rule {
    allowed_headers = [ "*" ]
    allowed_methods = [ "PUT", "POST" ]
    allowed_origins = [ "*" ]
    expose_headers  = [ "ETag" ]
    max_age_seconds = 3000
  }
}

resource "aws_s3_bucket_object" "source_code" {
  for_each = fileset(var.artifact_directory, "**")

  bucket           = aws_s3_bucket.website.id
  key              = each.value
  source           = "${var.artifact_directory}/${each.value}"
  content_type     = local.website_content_types[element(split(".", each.value), length(split(".", each.value)) - 1)]
  content_language = "en-US"
  etag             = filemd5("${var.artifact_directory}/${each.value}")
}

resource "aws_s3_bucket" "website_redirection" {
  bucket = "www.${var.domain_name}"
  acl    = "public-read"

  website {
    redirect_all_requests_to = var.domain_name
  }
}

locals {
  website_origin_id          = "website"
  website_content_types      = {
    "html" = "text/html"
    "htm"  = "text/html"
    "css"  = "text/css"
    "png"  = "image/png"
    "jpg"  = "image/jpeg"
    "jpeg" = "image/jpeg"
    "svg"  = "image/svg+xml"
    "js"   = "application/x-javascript"
  }
}