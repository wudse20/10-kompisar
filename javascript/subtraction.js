"use strict";
class Question {
    constructor(i1, i2) {
        this.i1 = i1;
        this.i2 = i2;
    }
    
    checkAnswer(ans) {
        return !isNaN(ans) && (parseInt(this.i1) - parseInt(this.i2) === parseInt(ans));
    }
    
    toString() {
        return this.i1 + " - " + this.i2 + " = _";
    }
}

let questions = [];
let count = 0;
let correct = 0;
let length = 0;

function init(_length, max)
{
    length = _length;

    let r1 = document.getElementById("row-1");
    let r2 = document.getElementById("row-2");
    let r3 = document.getElementById("row-3");

    r1.style.display = "none";
    r2.style.display = "block";
    r3.style.display = "block";

    questions = [];
    correct = 0;
    count = 0;

    for (let i = 0; i < _length; i++) 
    {
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
        questions.push(new Question(parseInt(i1), parseInt(i2)));
        console.log(questions[i].toString());    
    }

    document.getElementById("question").innerHTML = "Fråga " + (+count + 1) + ": " + questions[count].toString();
}


function submitAnswer()
{
    let input = document.getElementById("inp");
    let value = parseInt(input.value);
    sub(value);
    input.value = "";
}

function sub(value)
{
    if (!isNaN(value) && questions[count].checkAnswer(parseInt(value)))
        correct++;
    
    if (++count < length) 
    {
        document.getElementById("question").innerHTML = "Fråga " + (count + 1) + ": " + questions[count].toString();
    }
    else
    {
        let r1 = document.getElementById("row-1");
        let r2 = document.getElementById("row-2");
        let r3 = document.getElementById("row-3");

        r1.style.display = "block";
        r2.style.display = "none";
        r3.style.display = "none";

        alert("Du fick: " + correct + " rätt av 10!");
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
