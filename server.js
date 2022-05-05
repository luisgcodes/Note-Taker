// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const data = require('./db/db.json');
const {v4: uuid} = require('uuid');

// Sets up Express
const app = express();
const PORT = process.env.PORT || 3001;

// Formats data to json / access files from public / data parsing
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Routes /notes to notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// Routes /index to index.html
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

