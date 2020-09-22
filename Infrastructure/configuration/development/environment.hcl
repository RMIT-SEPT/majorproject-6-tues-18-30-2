inputs = {
  region_code  = "ase2"
  remote_state = {
    config = {
      bucket         = "s3-infrastructure-%s-%s"
      region         = "ap-southeast-2"
      encrypt        = true
      dynamodb_table = "dynamodb-infrastructure-%s-%s"
    }
  }
}