"use strict";
let questions = [];
let count = 0;
let correct = 0;
let length = 0;
let submit = 13;

function init(_length) {
    length = _length;
    let max = 0;

    let r1 = document.getElementById("row-1");
    let r2 = document.getElementById("row-2");
    let r3 = document.getElementById("row-3");
    let r4 = document.getElementById("row-4");

    let ten = document.getElementById("max10");
    let twenty = document.getElementById("max20");

    // Game started. Disable mode radio buttons
    enableRadioButtons(false);

    if (ten.checked)
        max = 10;
    else if (twenty.checked)
        max = 20;

    r1.style.display = "none";
    r2.style.display = "block";
    r3.style.display = "block";
    r4.style.display = "none";

    questions = [];
    correct = 0;
    count = 0;

    for (let i = 0; i < _length; i++) {
        let i1 = generateRandomRange(1, +max);
        let itemp = +max - +i1

        // Sleep to get more deversified random numbers
        sleep(10);
        let i2 = generateRandomRange(1, +itemp);
        let ans = +i1 + +i2;
        console.log("Generated: " + i1 + " + " + i2 + " = " + ans);
        questions.push(new AddQuestion(+i1, +ans));
        console.log(questions[i].toString());
    }

    document.getElementById("question").innerHTML = "Fråga " + (+count + 1) + ": " + questions[count].toString();
    startTimer();
}

function enableRadioButtons(enable)
{
    let radioButtons = document.getElementById("modeMax");
    for(let i=0; i < radioButtons.length; i++) {
       console.log ("DSK DSK DSK i=" + i)
       radioButtons[i].disabled = !enable;
    }
}

function submitAnswer()
{
    let input = document.getElementById("inp");
    let value = parseInt(input.value);
    addition(value);
    input.value = "";
}

function addition(value)
{
    if (questions[count].isCorrect(value))
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
        result += "Tid: " + endTimer();
        for (let i = 0; i < questions.length; i++) {
            result += "<br>" + (i + 1) + ": " + questions[i].toString();
        }
        
        txt.innerHTML = result;

        // Game finished. Enable mode radio buttons agin
        enableRadioButtons(true);
    }
}


window.onload = function () {
    let input = document.getElementById("inp");
    input.addEventListener("keyup", function (event) {
        console.log(event.keyCode);
        if (event.keyCode == submit)
            submitAnswer();
    });
    
    document.getElementById("res").style.color = "black";
}
