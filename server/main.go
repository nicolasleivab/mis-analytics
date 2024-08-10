package main

import (
    "log"
    "net/http"
    "project-root/controller/GoServer"
)

func main() {
    http.HandleFunc("/api/data", GoServer.GetAllData)
    http.HandleFunc("/api/data/update", GoServer.UpdateData)

    log.Println("Server started on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
