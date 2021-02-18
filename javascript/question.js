"use strict";
class Question {
    constructor(i1) {
        if (this.constructor == Question) {
            throw new Error("Abstract classes can't be instantiated.")
        } else {
            this.i1 = +i1;
            this.solved = false;
            this.correct = false;
        }
    }

    clone() {
        throw new Error("Method 'clone' must be implemented.");
    }

    checkAnswer(ans) {
        throw new Error("Method 'checkAnswer' must be implemented.");
    }

    toString() {
        throw new Error("Method 'toString' must be implemented.");
    }
}

class TenBuddiesQuestion extends Question {
    constructor(i1) {
        super(i1)
        this.ans = NaN;
    }
    
    clone() {
        return new TenBuddiesQuestion(this.i1);
    }

    checkAnswer(answer) {
        this.ans = (isNaN(answer)) ? -1 : answer;
        return !isNaN(+answer) && (10 - +answer === +this.i1);
    }
    
    toString() {
        let text = isNaN(this.ans) ? "Tiokompis till " + this.i1 + " är _" :
                                     "Tiokompis till " + this.i1 + " är " +
                                     (10 - +this.i1) + (this.checkAnswer(this.ans) ? ": Rätt" : ": Fel");
        return text;
    }
}

class AddQuestion extends Question {
    constructor(i1, ans) {
        super(i1);
        this.ans = ans;
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

class SubQuestion extends Question {
    constructor(i1, i2) {
        super(i1);
        this.i2 = i2;
        this.ans = NaN;
    }

    clone() {
        return new SubQuestion(this.i1, this.i2);
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

class DoubleQuestion extends Question {
    constructor(i1) {
        super(i1);
    }

    clone() {
        return new DoubleQuestion(this.i1);
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

class HalfQuestion extends Question {
    constructor(i1) {
        super(i1);
    }

    clone() {
        return new HalfQuestion(this.i1);
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
