"use strict";
let startTime = new Date();
let elapsedTime = new Date();
let interval = null;

function generateRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

function generateRandomRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
 
function formatTime(time) {
    let min = time / (1000 * 60);
    let mins = Math.floor(min);

    let sec = (min - mins) * 60;
    let secs = Math.floor(sec);

    let hundred = (sec - secs) * 10;
    let hundreds = Math.floor(hundred)

    let res = mins.toString().padStart(2, "0") + ":" +
              secs.toString().padStart(2, "0") + ":" +
              hundreds.toString().padStart(2, "0");

    return res;
}

function startTimer() {
    document.getElementById("time").innerHTML = "Tid 00:00:00";
    startTime = Date.now();
    interval = setInterval(function time() {
        elapsedTime = Date.now() - startTime;
        document.getElementById("time").innerHTML = "Tid " + formatTime(elapsedTime);
    }, 100);
}

function endTimer() {
    clearInterval(interval);
    return formatTime(elapsedTime);
}

function sleep(millis)
{
    let start_time = new Date();
    let time_now = null;
    do { time_now = new Date(); }
    while(time_now-start_time < millis);
}
