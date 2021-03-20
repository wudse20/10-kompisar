"use strict";
let questions = [];
let wrong = [];
let count = 0;
let correct = 0;
let errorMode = false;;

let clockCanvas = null;
let clockCtx = null;
let minuteColor = "blue";
let hourColor = "red";

// Game logic
function init(length) {
    showGame();

    count = 0;
    correct = 0;
    if (errorMode) {
        questions = wrong;
        wrong = [];
    } else {
        for (let i = 1; i <= length; i++) {
            // NaN, since clock question doesn't take a max.
            questions.push(new ClockQuestion().generate(NaN));
        }
    }

    draw(questions[count]);
    startTimer();
}

function submit() {
    let min = parseInt(document.getElementById("times").value);
    let hour = parseInt(document.getElementById("inp").value);
    hour = min > 15 ? hour - 1 : hour; // To compensate for input format.
    let ans = new ClockAnswer(+hour, +min);

    console.log(min)

    if (questions[count].checkAnswer(ans))
        correct++;
    else
        wrong.push(questions[count].clone());

    if (++count < questions.length) {
        draw(questions[count]);
        document.getElementById("inp").value = "";
    } else {
        endGame();
    }
}

function endGame() {
    hideGame();
    let txt = document.getElementById("res");

    let result = "Resultat: (" + correct + " av " + questions.length + " rätt)<br>"
    result += "Tid: " + endTimer();
    for (let i = 0; i < questions.length; i++) {
        result += "<br>" + (i + 1) + ": " + questions[i].toString();
    }

    txt.innerHTML = result;

    let btn = document.getElementById("btnStart");

    if (wrong.length != 0) {
        let res = confirm("Vill du försöka igen med de som blev fel?");
        btn.innerHTML = res ? "Försök igen" : "Stata spelet";
        errorMode = res;
    } else {
        errorMode = false;
        btn.innerHTML = "Starta spelet";
    }
}

window.onload = function() {
    init(10);
    let input = document.getElementById("inp");
    input.addEventListener("keyup", function (event) {
        if (event.keyCode == 13)
            submit();
    });
}

// Clock drawing
function getRelativeHour(min) {
    return min / 12;
}

function draw(question) {
    // Returns if question isn't a ClockQuestion.
    if (!(question instanceof ClockQuestion))
        return;

    // Sets the text
    document.getElementById("clockLabel").innerHTML = question.toString();

    // Initalizes the clock canvas.
    initClockCanvas();

    clockCtx.clearRect(0, 0, clockCanvas.width, clockCanvas.height);

    // Gets the time
    let hour = question.hour;
    let min = question.minute;
    let radius = clockCanvas.width / 3;

    // Calculates the middle pos.
    let middle = new Pos(clockCanvas.width / 2, clockCanvas.height / 2);

    // Minutes
    let minPos = toPosMin(min, radius, clockCanvas); // From timer.js

    // Draws line
    clockCtx.lineWidth = 2;
    clockCtx.strokeStyle = minuteColor;
    clockCtx.beginPath();
    clockCtx.moveTo(middle.getX(), middle.getY());
    clockCtx.lineTo(minPos.getX(), minPos.getY());
    clockCtx.stroke();

    // Hour
    let hourPos = toPosMin(hour * 5 + getRelativeHour(min), radius, clockCanvas); // From timer.js

    // Draws line
    clockCtx.lineWidth = 3;
    clockCtx.strokeStyle = hourColor;
    clockCtx.beginPath();
    clockCtx.moveTo(middle.getX(), middle.getY());
    clockCtx.lineTo(hourPos.getX(), hourPos.getY());
    clockCtx.stroke();

    // Draws smaller lines
    for (let i = 1; i <= 12; i++) {
        // Gets the pos.
        let pos = toPosMin(i * 5 + getRelativeHour(0), radius, clockCanvas); // From timer.js 

        // Draws the line
        clockCtx.fillStyle = "black";
        clockCtx.fillRect(pos.getX(), pos.getY(), 3, 3);
    }
}

function initClockCanvas() {
    clockCanvas = document.getElementById("clockGame");
    clockCtx = clockCanvas.getContext("2d");
    resizeCanvasToDisplaySize(clockCanvas); // From timer.js
}

// Window functions
function hideGame() {
    let r2 = document.getElementById("row-2");
    let r3 = document.getElementById("row-3");
    let r4 = document.getElementById("row-4");
    let r5 = document.getElementById("row-5");

    r2.style.display = "none";
    r3.style.display = "none";
    r4.style.display = "block";
    r5.style.display = "block";
}

function showGame() {
    let r2 = document.getElementById("row-2");
    let r3 = document.getElementById("row-3");
    let r4 = document.getElementById("row-4");
    let r5 = document.getElementById("row-5");

    r2.style.display = "block";
    r3.style.display = "block";
    r4.style.display = "none";
    r5.style.display = "none";
}
