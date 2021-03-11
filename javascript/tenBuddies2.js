"use strict";
let questions = [];
let errors = [];
let errorMode = false;
let count = 0;
let correct = 0;

function init(length) {
    let r1 = document.getElementById("row-1");
    let r2 = document.getElementById("row-2");
    let r3 = document.getElementById("row-3");
    let r4 = document.getElementById("row-4");

    r1.style.display = "none";
    r2.style.display = "block";
    r3.style.display = "block";
    r4.style.display = "none";

    count = 0;
    correct = 0;

    if (!errorMode) {
        questions = [];
        errors = [];

        for (let i = 0; i < length; i++) {
            questions.push(new TenBuddiesQuestion(true).generate(10));
        }
    } else {
        questions = errors;
        errors = [];
    }

    document.getElementById("question").innerHTML = "Fråga " + (count + 1) + ": " + questions[count].toString();

    startTimer();
}


function submitAnswer() {
    let input = document.getElementById("inp");
    let value = parseInt(input.value);
    tenBuddies(value);
    input.value = "";
}

function tenBuddies(value) {
    if (questions[count].checkAnswer(value))
        correct++;
    else
        errors.push(questions[count].clone());

    if (++count < questions.length) {
        document.getElementById("question").innerHTML = "Fråga " + (count + 1) + ": " + questions[count].toString();
    } else {
        endGame();
    }
}

function endGame() {
    let r1 = document.getElementById("row-1");
    let r2 = document.getElementById("row-2");
    let r3 = document.getElementById("row-3");
    let r4 = document.getElementById("row-4");
    let txt = document.getElementById("res");

    r1.style.display = "block";
    r2.style.display = "none";
    r3.style.display = "none";
    r4.style.display = "block";

    let result = "Resultat: (" + correct + " av " + questions.length + " rätt)<br>"
    result += "Tid: " + endTimer();
    for (let i = 0; i < questions.length; i++) {
        result += "<br>" + (i + 1) + ": " + questions[i].toString();
    }

    txt.innerHTML = result;

    let btn = document.getElementById("btnStart");

    if (errors.length != 0) {
        let res = confirm("Vill du försöka igen med de som blev fel?");
        btn.innerHTML = res ? "Försök igen" : "Stata spelet";
        errorMode = res;
    } else {
        errorMode = false;
        btn.innerHTML = "Starta spelet";
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
