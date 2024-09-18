# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /workspace

# Install necessary dependencies
RUN apt-get update && \
    apt-get install -y curl git && \
    apt-get clean

# Install Node.js (for frontend dependencies if needed)
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs

# Copy the current directory contents into the container
COPY . .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose ports for frontend and backend
EXPOSE 3000 8000
