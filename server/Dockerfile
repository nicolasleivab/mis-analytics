# Use an official Golang image as a build stage
FROM golang:1.20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum from the /server directory
COPY go.mod go.sum ./

# Download dependencies
RUN go mod tidy

# Copy the contents of the /server directory into the container
COPY . .

# Build the Go application
RUN go build -o main .

# Use a smaller base image for the final stage
FROM alpine:latest

# Set the working directory in the final stage
WORKDIR /root/

# Copy the built Go binary from the build stage
COPY --from=build /app/main .

# Expose the port the app will run on
EXPOSE 8080

# Command to run the application
CMD ["./main"]
