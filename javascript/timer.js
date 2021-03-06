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

let startTime = new Date();
let elapsedTime = new Date();
let interval = null;
let canvas = null;
let ctx = null;

function formatTime(time) {
    let min = time / (1000 * 60);
    let mins = Math.floor(min);

    let sec = (min - mins) * 60;
    let secs = Math.floor(sec);

    let ten = (sec - secs) * 10;
    let tens = Math.floor(ten)

    drawClock(mins, secs, tens);

    let res = mins.toString().padStart(2, "0") + ":" +
              secs.toString().padStart(2, "0") + ":" +
              tens.toString().padStart(2, "0");

    return res;
}

function startTimer() {
    initCanvas();
    document.getElementById("time").innerHTML = "Tid 00:00:00";
    startTime = Date.now();
    interval = setInterval(function time() {
        elapsedTime = Date.now() - startTime;
        document.getElementById("timeLabel").innerHTML = "Tid " + formatTime(elapsedTime);
    }, 100);
}

function endTimer() {
    clearInterval(interval);
    return formatTime(elapsedTime);
}

function toPosMin(min, radius, _canvas) {
    let t = 2 * Math.PI * (min - 15) / 60;
    let x = (_canvas.width / 2 + radius * Math.cos(t));
    let y = (_canvas.height / 2 + radius * Math.sin(t));

    return new Pos(x, y);
}

function toPosSec(sec, radius, _canvas) {
    return toPosMin(sec, radius, _canvas);
}

function drawClock(mins, secs) {
    let minuteColor = "#0000FF";
    let secondsColor = "#000000";
    let middle = new Pos(canvas.width / 2, canvas.height / 2);

    // Sets line width
    ctx.lineWidth = 3;

    // Clears the clock
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Minutes
    let minPos = toPosMin(mins, canvas.width / 2 - 1, canvas);

    // Draws line
    ctx.strokeStyle = minuteColor;
    ctx.beginPath();
    ctx.moveTo(middle.getX(), middle.getY());
    ctx.lineTo(minPos.getX(), minPos.getY());
    ctx.stroke();

    // Sets line width
    ctx.lineWidth = 2;

    // Seconds
    let secPos = toPosSec(secs, canvas.width / 2 - 1, canvas);

    // Draws line
    ctx.strokeStyle = secondsColor;
    ctx.beginPath();
    ctx.moveTo(middle.getX(), middle.getY());
    ctx.lineTo(secPos.getX(), secPos.getY());
    ctx.stroke();

    // Sets line width
    ctx.lineWidth = 1;

    // Circle
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.arc(middle.getX(), middle.getY(), Math.max(canvas.width / 2 - 1, 0), 0, Math.PI * 2);
    ctx.stroke();

    // Lines
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, 10);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height);
    ctx.lineTo(canvas.width / 2, canvas.height - 10);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(10, canvas.height / 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(canvas.width, canvas.height / 2);
    ctx.lineTo(canvas.width - 10, canvas.height / 2);
    ctx.stroke();
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

function initCanvas() {
    canvas = document.getElementById("time");
    ctx = canvas.getContext("2d");
    resizeCanvasToDisplaySize(canvas);
}

window.onload = function() {
    initCanvas();
}
