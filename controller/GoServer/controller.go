package GoServer

import (
    "encoding/json"
    "net/http"
)

func GetAllData(w http.ResponseWriter, r *http.Request) {
    data, err := LoadData()
    if err != nil {
        http.Error(w, "Unable to load data", http.StatusInternalServerError)
        return
    }
    json.NewEncoder(w).Encode(data)
}

func UpdateData(w http.ResponseWriter, r *http.Request) {
    var newData DataModel
    if err := json.NewDecoder(r.Body).Decode(&newData); err != nil {
        http.Error(w, "Invalid input", http.StatusBadRequest)
        return
    }
    data, err := LoadData()
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
    if err := SaveData(data); err != nil {
        http.Error(w, "Unable to save data", http.StatusInternalServerError)
        return
    }
    w.WriteHeader(http.StatusOK)
}
