"use strict";

class Question 
{
    constructor(i1, ans) 
    {
        this.i1 = i1;
        this.ans = ans;
    }

    isCorrect(inp)
    {
        return !isNaN(parseInt(inp)) && (inp + this.i1 == this.ans);
    }

    toString()
    {
        return this.i1 + " + _ = " + this.ans;
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
        let i1 = generateRandomNumber(+max);
        let i2 = generateRandomNumber(+max);
        let ans = +i1 + +i2;
        console.log(ans);
        questions.push(new Question(+i1, +ans));
        console.log(questions[i].toString());    
    }

    document.getElementById("question").innerHTML = "Fråga " + (+count + 1) + ": " + questions[count].toString();
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
    if (!isNaN(value) && questions[count].isCorrect(value))
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
