# Use an official Golang image as a build stage
FROM golang:1.20-alpine AS build
WORKDIR /app
COPY . .
RUN go mod tidy
RUN go build -o main .

# Use a smaller base image for the final stage
FROM alpine:latest
WORKDIR /root/
COPY --from=build /app/main .
COPY --from=build /app/model/GoServer/db.json ./model/GoServer/
CMD ["./main"]
EXPOSE 8080
