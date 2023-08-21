const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

let Patients = new Object();
Patients["999991234"] =  ["Jenson", "Watkins", "425-555-1234"]
Patients["999991235"] =  ["Patrick", "Bartholomew", "425-555-1111"]

let records = new Object();
records["999991234"] = "status : Healthy body" 
records["999991235"] = "status : Slightly Cold"

//Get patient medical record
app.get("/record", (req, res) =>{
    res.status(200).send({"msg": "HTTP GET - SUCCESS"})
    console.log(records[req.headers.ssn] === undefined )
    //Verify Patients Exists.
    

    //Verify SSN matches FirstName and LastName.


    //Return Appropriate Record.
});

//Create a new patient
app.put("/", (req, res) => {
    res.status(200).send({"msg":"HTTP PUT - SUCCESS"})

});

//Update existing patient phone number
app.post("/", (req, res) =>{
    res.status(200).send({"msg":"HTTP POST - SUCCESS"})
})

//Delete patient records
app.delete("/", (req, res) =>{
    res.status(200).send({"msg": "HTTP DELET - SUCCESS"})
})
app.listen(3000);