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

    correct = 0;
    count = 0;

    if (!errorMode) {
        questions = [];
        for (let i = 0; i < length; i++) {
            let i1 = generateRandomNumber(+max - 1) + 1;
            let i2 = generateRandomNumber(+max);

            while(parseInt(i2) >= parseInt(i1)) {
                if (+i1 == 0 || +i1 == 1) {
                    i2 = 0;
                    break;
                }

                i2 = generateRandomNumber(+max);
            }

            console.log(i1, " - ", i2);
            questions.push(new SubQuestion(parseInt(i1), parseInt(i2)));
            console.log(questions[i].toString());
        }
    } else {
        questions = errors;
        errors = [];
    }

    document.getElementById("question").innerHTML = "Fråga " + (+count + 1) + ": " + questions[count].toString();
    startTimer();
}


function submitAnswer() {
    let input = document.getElementById("inp");
    let value = parseInt(input.value);
    sub(value);
    input.value = "";
}

function sub(value) {
    if (questions[count].checkAnswer(parseInt(value)))
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

    document.getElementById("res").style.color = "black";
}
