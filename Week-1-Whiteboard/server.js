const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// In-memory storage
let drawings = [];

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// GET all drawings
app.get("/drawings", (req, res) => {
    res.json(drawings);
});

// Save drawing
app.post("/drawings", (req, res) => {
    const drawing = {
        id: Date.now(),
        data: req.body.data
    };

    drawings.push(drawing);

    res.status(201).json({
        message: "Drawing Saved",
        drawing
    });
});

// Delete all drawings
app.delete("/drawings", (req, res) => {
    drawings = [];
    res.json({ message: "All Drawings Deleted" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});