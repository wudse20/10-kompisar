"use strict";
let questions = [];
let errors = [];
let errorMode = false;
let count = 0;
let correct = 0;

function init(length, max) {
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
            let num = generateRandomNumber(100);

            switch (num % 7) {
                case 0:
                    questions.push(new TenBuddiesQuestion().generate(max));
                    break;
                case 1:
                    questions.push(new AddQuestion().generate((num % 2 == 0) ? max : +max * 2));
                    break;
                case 2:
                    questions.push(new SubQuestion().generate(max));
                    break;
                case 3:
                    questions.push(new HalfQuestion().generate(max));
                    break;
                case 4:
                    questions.push(new DoubleQuestion().generate(max));
                    break;
                case 5:
                    // NaN since question type doesn't take a max value.
                    questions.push(new SymetiryQuestion().generate(NaN));
                    break;
                case 6:
                    questions.push(new NeighbourQuestion().generate(100));
                    break;
            }
        }
    } else {
        questions = errors;
        errors = [];
    }

    swapInputType();
    document.getElementById("question").innerHTML = "Fråga " + (count + 1) + ": " + questions[count].toString();

    startTimer();
}

function swapInputType() {
    let input = document.getElementById("inp");

    if (questions[count] instanceof SymetiryQuestion) {
        input.type = "checkbox";
    } else {
        input.type = "number";
    }
}

function submitAnswer() {
    let input = document.getElementById("inp");
    let value = NaN;

    if (questions[count] instanceof SymetiryQuestion) {
        value = input.checked;
        input.checked = false;
    } else {
        value = parseInt(input.value);
    }

    multiMode(value);
    input.value = "";
}

function multiMode(value) {
    if (questions[count].checkAnswer(value))
        correct++;
    else
        errors.push(questions[count].clone());

    if (++count < questions.length) {
        swapInputType();
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
