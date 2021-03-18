"use strict";
class Pos {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    setX(x) {
        this.x = x;
    }

    getX() {
        return this.x;
    }

    setY(y) {
        this.y = y;
    }

    getY() {
        return this.y;
    }
}

let questions = [];
let current = 0;
let myCanvas;
let myCanvasCtx;

function init(length) {
    let r1 = document.getElementById("row-1");
    let r2 = document.getElementById("row-2");
    let r3 = document.getElementById("row-3");
    let r4 = document.getElementById("row-4");

    r1.style.display = "none";
    r2.style.display = "block";
    r3.style.display = "block";
    r4.style.display = "none";

    for (let i = 0; i < length; i++) {
        // NaN, since the clock doesn't take a max.
        questions.push(new ClockQuestion().generate(NaN));
    }

    draw(questions[current]);
}

function toPosMin(min, radius) {
    let t = 2 * Math.PI * (min - 15) / 60;
    let x = (myCanvas.width / 2 + radius * Math.cos(t));
    let y = (myCanvas.height / 2 + radius * Math.sin(t));

    return new Pos(x, y);
}

function draw(question) {
    initClockCanvas();
    console.log(`Drawing ${question}`)
    let minuteColor = "#0000FF";
    let middle = new Pos(myCanvas.width / 2, myCanvas.height / 2);

    // Sets line width
    myCanvasCtx.lineWidth = 3;

    // Clears the myCanvas
    myCanvasCtx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    // Minutes
    let minPos = toPosMin(question.minute, myCanvas.width / 2 - 1, myCanvas);

    // Draws line
    myCanvasCtx.strokeStyle = minuteColor;
    myCanvasCtx.beginPath();
    myCanvasCtx.moveTo(middle.getX(), middle.getY());
    myCanvasCtx.lineTo(minPos.getX(), minPos.getY());
    myCanvasCtx.stroke();

    // Sets line width
    myCanvasCtx.lineWidth = 2;

    // Circle
    myCanvasCtx.strokeStyle = "black";
    myCanvasCtx.beginPath();
    myCanvasCtx.arc(middle.getX(), middle.getY(), Math.max(myCanvas.width / 2 - 1, 0), 0, Math.PI * 2);
    myCanvasCtx.stroke();

    // Lines
    myCanvasCtx.beginPath();
    myCanvasCtx.moveTo(myCanvas.width / 2, 0);
    myCanvasCtx.lineTo(myCanvas.width / 2, 10);
    myCanvasCtx.stroke();

    myCanvasCtx.beginPath();
    myCanvasCtx.moveTo(myCanvas.width / 2, myCanvas.height);
    myCanvasCtx.lineTo(myCanvas.width / 2, myCanvas.height - 10);
    myCanvasCtx.stroke();

    myCanvasCtx.beginPath();
    myCanvasCtx.moveTo(0, myCanvas.height / 2);
    myCanvasCtx.lineTo(10, myCanvas.height / 2);
    myCanvasCtx.stroke();

    myCanvasCtx.beginPath();
    myCanvasCtx.moveTo(myCanvas.width, myCanvas.height / 2);
    myCanvasCtx.lineTo(myCanvas.width - 10, myCanvas.height / 2);
    myCanvasCtx.stroke();
}

function resizeCanvasToDisplaySize(canvas) {
    // Lookup the size the browser is displaying the canvas in CSS pixels.
    const displayWidth  = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    // Check if the canvas is not the same size.
    const needResize = canvas.width  !== displayWidth ||
                       canvas.height !== displayHeight;

    if (needResize) {
      // Make the canvas the same size
      canvas.width  = displayWidth;
      canvas.height = displayHeight;
    }
}

function initClockCanvas() {
    console.log("inti canvas");
    myCanvas = document.getElementById("gameClock");
    myCanvasCtx = myCanvas.getContext("2d");
    resizeCanvasToDisplaySize(myCanvas);
}

window.onload = function() {
    initClockCanvas();
}
