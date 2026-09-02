const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let notes = [
    { id: 1, text: "Welcome to Whiteboard!" }
];

// GET - Get all notes
app.get("/api/notes", (req, res) => {
    res.json(notes);
});

// POST - Add a new note
app.post("/api/notes", (req, res) => {
    const newNote = {
        id: Date.now(),
        text: req.body.text
    };

    notes.push(newNote);
    res.status(201).json(newNote);
});

// DELETE - Delete a note
app.delete("/api/notes/:id", (req, res) => {
    const id = Number(req.params.id);

    notes = notes.filter(note => note.id !== id);

    res.json({ message: "Note deleted successfully" });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
