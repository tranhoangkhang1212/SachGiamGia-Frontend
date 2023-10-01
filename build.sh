#!/bin/bash

container_name="sach_giam_gia_fe_container"

# Check container exists
if [[ "$(docker ps -aqf name=${container_name})" ]]; then
  echo "Stopping and removing the existing Docker container: ${container_name}"
  docker stop ${container_name}
  docker rm ${container_name}
fi

# Step 1: Build the Docker image
docker build -t sach_giam_gia_fe \
  --build-arg API_ENDPOINT=http://193.203.167.4:8080 \
  . 

if [ $? -eq 0 ]; then
  echo "Docker image built successfully."
else
  echo "Docker image build failed. Exiting..."
  exit 1
fi

# Step 2: Run the Docker container
docker run -d --name ${container_name} -p 8081:3000 sach_giam_gia_fe

# Check container start
if [ $? -eq 0 ]; then
  echo "Docker container running on PORT 8081"
fi  