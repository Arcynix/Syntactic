# Use the official Nginx base image with Alpine Linux
FROM nginx:alpine

# Copy your website files from the current directory into the Nginx public html directory
COPY . /usr/share/nginx/html

# Expose port 80 to indicate the container listens for HTTP traffic on this port
EXPOSE 80
