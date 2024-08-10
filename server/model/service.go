package GoServer

import (
    "encoding/json"
    "io/ioutil"
    "os"
)

var jsonFilePath = "model/db.json"

func LoadData() ([]DataModel, error) {
    var data []DataModel
    file, err := os.Open(jsonFilePath)
    if err != nil {
        return nil, err
    }
    defer file.Close()
    byteValue, _ := ioutil.ReadAll(file)
    json.Unmarshal(byteValue, &data)
    return data, nil
}

func SaveData(data []DataModel) error {
    file, err := os.OpenFile(jsonFilePath, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0755)
    if err != nil {
        return err
    }
    defer file.Close()
    byteValue, err := json.Marshal(data)
    if err != nil {
        return err
    }
    file.Write(byteValue)
    return nil
}
