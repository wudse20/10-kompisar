"use strict";
function generateRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

function generateRandomRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function sleep(millis) {
    let start_time = new Date();
    let time_now = null;
    do { time_now = new Date(); }
    while(time_now-start_time < millis);
}
