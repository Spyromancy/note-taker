const express = require('express');
const notes = require('./db/db.json');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes', (req, res) => {
    results = notes
    res.json(results);
});

app.post('/api/notes', (req,res) => {
    const note = req.body;
    note.id = notes.length.toString();
    notes.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notes, null, 2)
    );
    res.json(note);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.listen(PORT,() => {
    console.log(`API server now on port ${PORT}!`);
});