// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const data = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');

// Sets up Express
const app = express();
const PORT = process.env.PORT || 3001;

// Formats data to json / access files from public/data parsing
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/api/notes', (req,res) => {
    res.json(data);
});

// Routes /notes to notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// Routes /index to index.html
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Post sends the data to the body  
app.post('/api/notes', (req,res) => {
    const note = req.body;
    console.log(note);

    const addNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    }
    data.push(addNote);
    console.log(data);

    updateData();

    return res.json(addNote);
});

// Delets ID
app.delete('/api/notes/:id', (req,res) => {
    const requestId = parseInt(req.params.id);

    data.forEach((note, i) => {
        if (note.id === requestId) {
            data.splice(i,1);
            return res.json(note);
        }
    })
    updateData();
});

function updateData() {
    fs.writeFileSync("./db/db.json", JSON.stringify(data), err => {
        if (err) {
          console.error(err);
        } else {
          console.log("Success!")
        };
      });
}
// Listener
app.listen(PORT, () => {
    console.log(`Listening to http://localhost:${PORT}`)
});