"use strict";
let clockCanvas = null;
let clockCtx = null;
let questions = [];
let minuteColor = "blue";
let hourColor = "red";

function init(length) {
    showGame();

    for (let i = 1; i <= length; i++) {
        // NaN, since clock question doesn't take a max.
        questions.push(new ClockQuestion().generate(NaN));
    }

    startTimer();
}

function getRelativeHour(min) {
    return Math.floor(min / 12);
}

function draw(question) {
    // Returns if question isn't a ClockQuestion.
    if (!(question instanceof ClockQuestion))
        return;

    // Initalizes the clock canvas.
    initClockCanvas();

    // Gets the time
    let hour = question.hour;
    let min = question.minute;

    // Calculates the middle pos.
    let middle = new Pos(clockCanvas.width / 2, clockCanvas.height / 2);

    // Circle
    clockCtx.strokeStyle = "black";
    clockCtx.beginPath();
    clockCtx.arc(middle.getX(), middle.getY(), Math.max(clockCanvas.width / 2 - 1, 0), 0, Math.PI * 2);
    clockCtx.stroke();

    // Minutes
    let minPos = toPosMin(min, clockCanvas.width / 2 - 1, clockCanvas); // From timer.js

    // Draws line
    clockCtx.lineWidth = 2;
    clockCtx.strokeStyle = minuteColor;
    clockCtx.beginPath();
    clockCtx.moveTo(middle.getX(), middle.getY());
    clockCtx.lineTo(minPos.getX(), minPos.getY());
    clockCtx.stroke();

    // Hour
    let hourPos = toPosMin(hour * 5 + getRelativeHour(min), clockCanvas.width / 2 - 1, clockCanvas); // From timer.js

    // Draws line
    clockCtx.lineWidth = 3;
    clockCtx.strokeStyle = hourColor;
    clockCtx.beginPath();
    clockCtx.moveTo(middle.getX(), middle.getY());
    clockCtx.lineTo(hourPos.getX(), hourPos.getY());
    clockCtx.stroke();
}

function hideGame() {
    let r2 = document.getElementById("row-2");
    let r3 = document.getElementById("row-3");
    let r4 = document.getElementById("row-4");

    r2.style.display = "none";
    r3.style.display = "none";
    r4.style.display = "block";
}

function showGame() {
    let r2 = document.getElementById("row-2");
    let r3 = document.getElementById("row-3");
    let r4 = document.getElementById("row-4");

    r2.style.display = "block";
    r3.style.display = "block";
    r4.style.display = "none";
}

function initClockCanvas() {
    clockCanvas = document.getElementById("clockGame");
    clockCtx = clockCanvas.getContext("2d");
    resizeCanvasToDisplaySize(clockCanvas); // From timer.js
}

window.onload = function() {
    init(10);
}