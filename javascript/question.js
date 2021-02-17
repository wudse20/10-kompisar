"use strict";
class TenBuddiesQuestion {
    constructor(n1) {
        this.n1 = n1;
        this.ans = NaN;
    }
    
    clone() {
        return new TenBuddiesQuestion(this.n1);
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

    clone() {
        return new AddQuestion(this.i1, this.ans);
    }

    checkAnswer(inp) {
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

class DoubHalfQuestion {
    constructor(i1) {
        if (this.constructor == DoubHalfQuestion) {
            throw new Error("Abstract classes can't be instantiated.")
        } else {
            this.i1 = +i1;
            this.solved = false;
            this.correct = false;
        }
    }

    checkAnswer(ans) {
        throw new Error("Method 'checkAnswer' must be implemented.");
    }

    toString() {
        throw new Error("Method 'toString' must be implemented.");
    }
}

class DoubleQuestion extends DoubHalfQuestion {
    constructor(i1) {
        super(i1);
    }

    checkAnswer(ans) {
        this.solved = true;
        this.correct = !isNaN(ans) && (+ans / 2) === +this.i1;
        return this.correct;
    }

    toString() {
        let text = this.solved ? (+this.i1 * 2) + " är dubbelt så stort som " + this.i1 + (this.correct ? ": Rätt" : ": Fel") :
                                 "_ är dubbelt så stort som " + this.i1;
        return text;
    }
}

class HalfQuestion extends DoubHalfQuestion {
    constructor(i1) {
        super(i1);
    }

    checkAnswer(ans) {
        this.solved = true;
        this.correct = !isNaN(ans) && (+ans * 2) === +this.i1;
        return this.correct;
    }

    toString() {
        let ans = +this.i1 / 2;
        let text = this.solved ? ans +  " är hälften så stort som " + this.i1 + (this.correct ? ": Rätt" : ": Fel") :
                                 "_ är hälften så stort som " + this.i1;
        return text;
    }
}
