provider "aws" {
  region = var.aws_region
}

resource "aws_s3_bucket" "genai_bucket" {
  bucket = var.s3_bucket_name
}

resource "aws_db_instance" "genai_db" {
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "13.3"
  instance_class       = "db.t2.micro"
  username             = var.db_user
  password             = var.db_password
  publicly_accessible  = false
}

output "s3_bucket_name" {
  value = aws_s3_bucket.genai_bucket.bucket
}

output "db_instance_address" {
  value = aws_db_instance.genai_db.address
}
