"use strict";
var timer = 0;

function generateRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

function generateRandomRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
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

function sleep(millis)
{
    let start_time = new Date();
    let time_now = null;
    do { time_now = new Date(); }
    while(time_now-start_time < millis);
}