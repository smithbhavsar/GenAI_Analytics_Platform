variable "aws_region" {
  description = "AWS region to deploy the infrastructure"
  default     = "us-east-1"
}

variable "s3_bucket_name" {
  description = "Name of the S3 bucket for storing data"
}

variable "db_name" {
  description = "Name of the PostgreSQL database"
}

variable "db_user" {
  description = "Database username"
}

variable "db_password" {
  description = "Database password"
  sensitive   = true
}
