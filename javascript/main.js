"use strict";
let questions = [];
let count = 0;
let correct = 0;
let length;


function swapPage(path) {
    location.replace(path);
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
}

function init(_length) {
    let r1 = document.getElementById("row-1");
    let r2 = document.getElementById("row-2");
    let r3 = document.getElementById("row-3");

    r1.style.display = "none";
    r2.style.display = "block";
    r3.style.display = "block";
    
    questions = [];
    count = 0;
    correct = 0;
    for (let i = 0; i < _length; i++) {
        questions.push(generateRandomNumber());
        console.log(questions[i]);
    }

    length = _length;

    document.getElementById("question").innerHTML = "Fråga " + (count + 1) + ": " + questions[count];
}

function submitAnswer() {
    let input = document.getElementById("inp");
    let value = parseInt(input.value);

    tenBuddies(value);
    
    input.value = "";
}

function tenBuddies(value)
{
    if (!isNaN(value) && value == (10 - questions[count]))
        correct++;
    
    if (++count < length) {
        document.getElementById("question").innerHTML = "Fråga " + (count + 1) + ": " + questions[count];
    } else {
        let r1 = document.getElementById("row-1");
        let r2 = document.getElementById("row-2");
        let r3 = document.getElementById("row-3");

        r1.style.display = "block";
        r2.style.display = "none";
        r3.style.display = "none";

        alert("Du fick: " + correct + " rätt av 10!");
    }

}