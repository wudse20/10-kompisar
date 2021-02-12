"use strict";
class TenBuddiesQuestion {
    constructor(n1) {
        this.n1 = n1;
        this.ans = NaN;
    }
    
    checkAnswer(answer) {
        this.ans = (isNaN(answer)) ? -1 : answer;
        return !isNaN(+answer) && (10 - +answer === +this.n1);
    }
    
    toString() {
        let text = isNaN(this.ans) ? "Tiokompis till " + this.n1 + " är _" :
                                     "Tiokompis till " + this.n1 + " är " + 
                                     (10 - +this.n1) + (this.checkAnswer(this.ans) ? ": Rätt" : ": Fel");
        return text;
    }
}

class AddQuestion {
    constructor(i1, ans) {
        this.i1 = i1;
        this.ans = ans;
        this.solved = false;
        this.correct = false;
    }

    isCorrect(inp) {
        this.solved = true;
        this.correct = !isNaN(parseInt(inp)) && (inp + this.i1 == this.ans);
        return this.correct;
    }

    toString() {
        let text = this.solved ? this.i1 + " + " + (parseInt(this.ans) - parseInt(this.i1)) +
                                 " = " + this.ans + (this.correct ? ": Rätt" : ": Fel") :
                                 this.i1 + " + _ = " + this.ans;
        return text;
    }
}

class SubQuestion {
    constructor(i1, i2) {
        this.i1 = i1;
        this.i2 = i2;
        this.ans = NaN;
    }
    
    checkAnswer(answer) {
        this.ans = (isNaN(answer)) ? -1 : answer;
        return !isNaN(answer) && (parseInt(this.i1) - parseInt(this.i2) === parseInt(answer));
    }
    
    toString() {
        let text = isNaN(this.ans) ? this.i1 + " - " + this.i2 + " = _" :
                                this.i1 + " - " + this.i2 + " = " + (parseInt(this.i1) - parseInt(this.i2)) +
                                (this.checkAnswer(this.ans) ? ": Rätt" : ": Fel");
        return text;
    }
}