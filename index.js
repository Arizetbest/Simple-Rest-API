const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

let patients = new Object();
patients["999991234"] =  ["Jenson", "Watkins", "425-555-1234"]
patients["999991235"] =  ["Patrick", "Bartholomew", "425-555-1111"]

let records = new Object();
records["999991234"] = "status : Healthy body" 
records["999991235"] = "status : Slightly Cold"

//Get patient medical record
app.get("/records", (req, res) =>{


    //Verify  Exists.
    if(records[req.headers.ssn] === undefined ) {
        res.status(404).send({"msg": "Patient not found"})
        return;
    }
    

    //Verify SSN matches FirstName and LastName.
    if (req.headers.firstname == [req.headers.ssn][0] && req.headers.lastname == [req.headers.ssn][1]){
    //firstname,lastname and ssn match
    if (req.body.reasonforvist === "medicalrecords") {
        // we will return medical records
        res.status(200).send(records[req.headers.ssn]);
        return;
    }
    else{
        // return error
        res.status(501).send({"msg":"unable to complete request at this time: " + req.body.reasonforvist})
        return;
    }

    }
    else{
        res.status(401).send({"msg": "Firstname or Lastname and SSN didnt match"})
        return;
    }


    //Return Appropriate Record.
    res.status(200).send({"msg": "HTTP GET -SUCCESS!"});
});

//Create a new patient
app.post("/", (req, res) =>{
    patients[req.headers.ssn] = [req.headers.firstname, req.headers.lastname, req.headers.phone]
    res.status(200).send(patients)
})


//Update existing patient phone number
app.put("/", (req, res) => {

    if(records[req.headers.ssn] === undefined) {
        res.status(404).send({"msg": "patient not found."})
        return;
    }
    
    if (req.headers.firstname == patients[req.headers.ssn][0] && req.headers.lastname == patients[req.headers.ssn][1]) {
        // update the phone number and return the patient info
        patients[req.headers.ssn] = [req.headers.firstname, req.headers.lastname, req.body.phone];
        res.status(201).send(patients[req.headers.ssn]);
        return;
    }
    else{
        res.status(401).send({"msg": "First or Lastname didn't match SSN. Trying to update phone number"})
        return;
    }

    res.status(200).send({"msg":"HTTP PUT - SUCCESS"})

});

//Delete patient records
app.delete("/", (req, res) =>{
    res.status(200).send({"msg": "HTTP DELET - SUCCESS"})
})
app.listen(3000);