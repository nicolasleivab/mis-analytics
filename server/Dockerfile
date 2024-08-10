# Use an official Golang image as a build stage
FROM golang:1.20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum from the /server directory
COPY server/go.mod server/go.sum ./

# Download dependencies
RUN go mod tidy

# Copy the controller directory
COPY ../controller/GoServer ./controller/GoServer

# Copy the model directory
COPY ../model/GoServer ./model/GoServer

# Copy the contents of the /server directory into the container
COPY server/main.go ./main.go

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
