"use strict";
let questions = [];

function swapPage(path) {
    location.replace(path);
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
}

function init(length) {
    let r1 = document.getElementById("row-1");
    let r2 = document.getElementById("row-2");

    r1.style.display = "none";
    r2.style.display = "block";

    questions = [];
    for (let i = 0; i < length; i++) {
        questions.push(generateRandomNumber());
        console.log(questions[i]);
    }

    console.log(questions)
}