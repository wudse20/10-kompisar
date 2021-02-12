"use strict";
var timer = 0;

function generateRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

function startTimer() {
    let d = new Date();
    timer = d.getTime();
}

function endTimer() {
    let d = new Date();
    let diff = timer - d.getTime();
    return Math.abs(Math.floor(diff / 1000 % 60));
}
