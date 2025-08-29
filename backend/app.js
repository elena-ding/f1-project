const express = require('express');
const { connectToDb, getDb } = require('./db');
const { ObjectId } = require('mongodb');

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

let db;

const PORT = process.env.PORT || 3000;

connectToDb((err) => {
    if (!err) {
        app.listen(PORT, () => {
            console.log("listening");
        })
        db = getDb();
    }
});


app.get('/drivers', (req, res) => {
    let drivers = [];
     db.collection('drivers').find().forEach((driver) => drivers.push(driver)).then(() => res.status(200).json(drivers))
})

app.get('/labels', (req, res) => {
    let labels = [];
     db.collection('labels').find().forEach((label) => labels.push(label)).then(() => res.status(200).json(labels))
})

app.get('/globe', (req, res) => {
    let globe = [];
     db.collection('globe').find().forEach((race) => globe.push(race)).then(() => res.status(200).json(globe))
})

app.get('/circuits', (req, res) => {
    let circuits = [];
     db.collection('circuits').find().forEach((circuit) => circuits.push(circuit)).then(() => res.status(200).json(circuits))
})

app.get('/about', (req, res) => {
    let about = [];
     db.collection('about').find().forEach((image) => about.push(image)).then(() => res.status(200).json(about))
})

app.post('/home', (req, res) => {
    const driver = req.body;

    db.collection('drivers').insertOne(driver)
    .then(result => res.status(201).json(result))
})

app.delete('/home/:name', (req, res) => {
    const driverName = req.params.name;

    db.collection('drivers').deleteOne({ name: driverName })
    .then((result) => res.status(200).json(result))
})

app.patch('/home/:name', (req, res) => {
    const updates = req.body;

     db.collection('drivers').updateOne({name: req.params.name}, {$set: updates})
     .then((result) => res.status(200).json(result))
})
