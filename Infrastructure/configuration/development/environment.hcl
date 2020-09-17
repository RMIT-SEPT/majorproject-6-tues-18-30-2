inputs = {
  region_code  = "ase2"
  remote_state = {
    config = {
      bucket         = "s3-%s-%s-infrastructure"
      region         = "ap-southeast-2"
      encrypt        = true
      dynamodb_table = "dynamodb-%s-%s-infrastructure"
    }
  }
}