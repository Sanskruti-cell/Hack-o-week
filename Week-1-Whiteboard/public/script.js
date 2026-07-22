const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let drawing = false;
let eraserMode = false;
let alertShown = false;

const colorPicker = document.getElementById("colorPicker");
const size = document.getElementById("size");

ctx.lineCap = "round";

// Start Drawing
canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});

// Draw
canvas.addEventListener("mousemove", (e) => {

    if (!drawing) return;

    ctx.lineWidth = size.value;

    if (eraserMode) {
        ctx.strokeStyle = "white";
    } else {
        ctx.strokeStyle = colorPicker.value;
    }

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

});

// Stop Drawing
canvas.addEventListener("mouseup", () => {
    drawing = false;
});

// If user leaves the whiteboard while drawing
canvas.addEventListener("mouseleave", () => {

    if (drawing && !alertShown) {
        alert("⚠️ You can draw only inside the Whiteboard.");
        alertShown = true;
        drawing = false;
    }

});

// Reset alert when mouse comes back
canvas.addEventListener("mouseenter", () => {
    alertShown = false;
});

// Eraser Toggle
document.getElementById("eraser").addEventListener("click", () => {

    eraserMode = !eraserMode;

    if (eraserMode) {
        document.getElementById("eraser").innerText = "Pen";
    } else {
        document.getElementById("eraser").innerText = "Eraser";
    }

});

// Clear Canvas
document.getElementById("clear").addEventListener("click", () => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

});

// Save Drawing
document.getElementById("save").addEventListener("click", () => {

    const image = canvas.toDataURL();

    fetch("/drawings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data: image
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
    });

});