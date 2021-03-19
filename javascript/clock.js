"use strict";
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
    startTimer();
}

function draw(question) {
    initClockCanvas();
    console.log(`Drawing: ${question}`);

    myCanvasCtx.fillStyle = "lime";
    myCanvasCtx.fillRect(0, 0, myCanvas.width, myCanvas.height);
}

function initClockCanvas() {
    console.log("inti canvas");
    myCanvas = document.getElementById("gameClock");
    myCanvasCtx = myCanvas.getContext("2d");
}

window.onload = function() {
    initClockCanvas();
}
