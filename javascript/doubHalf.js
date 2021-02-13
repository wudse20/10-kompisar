"use strict";
let questions = [];
let length = 0;
let count = 0;
let correct = 0;

function init(_length, max) {
    length = _length;

    let r1 = document.getElementById("row-1");
    let r2 = document.getElementById("row-2");
    let r3 = document.getElementById("row-3");
    let r4 = document.getElementById("row-4");

    r1.style.display = "none";
    r2.style.display = "block";
    r3.style.display = "block";
    r4.style.display = "none";

    questions = [];
    correct = 0;
    count = 0;

    for (let i = 0; i < max; i++) {
       if (i % 2 === 0) {
           let num = generateRandomNumber(+max + 1);

           do { num = generateRandomNumber(max); }
           while(num % 2 != 0);

           questions.push(new HalfQuestion(+num));
       } else {
           let num = generateRandomNumber(+max / 2);
           questions.push(new DoubleQuestion(+num));
       }
    }

    console.log(questions);
    document.getElementById("question").innerHTML = "Fråga " + (+count + 1) + ": " + questions[count].toString();
    startTimer();
}

function submitAnswer() {
    let input = document.getElementById("inp");
    let value = parseInt(input.value);
    check(value);
    input.value = "";
}

function check(value) {
    if (questions[count].checkAnswer(value))
        correct++;

    if (++count < length) {
        document.getElementById("question").innerHTML = "Fråga " + (count + 1) + ": " + questions[count].toString();
    } else {
        let r1 = document.getElementById("row-1");
        let r2 = document.getElementById("row-2");
        let r3 = document.getElementById("row-3");
        let r4 = document.getElementById("row-4");
        let txt = document.getElementById("res");

        r1.style.display = "block";
        r2.style.display = "none";
        r3.style.display = "none";
        r4.style.display = "block";

        let result = "Resultat: (" + correct + " av 10 rätt)<br>"
        result += "Tid: " + endTimer() + " sekunder";
        for (let i = 0; i < questions.length; i++) {
            result += "<br>" + (i + 1) + ": " + questions[i].toString();
        }

        txt.innerHTML = result;
    }
}

window.onload = function () {
    let input = document.getElementById("inp");
    input.addEventListener("keyup", function (event) {
        console.log(event.keyCode);
        if (event.keyCode == 13)
            submitAnswer();
    });
}
