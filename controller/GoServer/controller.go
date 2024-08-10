package GoServer

import (
    "encoding/json"
    "net/http"

    "MIS-Analytics/model/GoServer"  // Import the model/GoServer package
)

func GetAllData(w http.ResponseWriter, r *http.Request) {
    data, err := GoServer.LoadData()  // Use the fully qualified name
    if err != nil {
        http.Error(w, "Unable to load data", http.StatusInternalServerError)
        return
    }
    json.NewEncoder(w).Encode(data)
}

func UpdateData(w http.ResponseWriter, r *http.Request) {
    var newData GoServer.DataModel  // Use the fully qualified name
    if err := json.NewDecoder(r.Body).Decode(&newData); err != nil {
        http.Error(w, "Invalid input", http.StatusBadRequest)
        return
    }
    data, err := GoServer.LoadData()
    if err != nil {
        http.Error(w, "Unable to load data", http.StatusInternalServerError)
        return
    }
    for i, d := range data {
        if d.ID == newData.ID {
            data[i] = newData
            break
        }
    }
    if err := GoServer.SaveData(data); err != nil {
        http.Error(w, "Unable to save data", http.StatusInternalServerError)
        return
    }
    w.WriteHeader(http.StatusOK)
}
