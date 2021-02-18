"use strict";
class Question {
    constructor() {
        if (this.constructor == Question) {
            throw new Error("Abstract classes can't be instantiated.")
        } else {
            this.i1 = NaN;
            this.solved = false;
            this.correct = false;
        }
    }

    generate(max) {
        throw new Error("Method 'generate' must be implemented.")
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
    constructor() {
        super()
        this.ans = NaN;
    }

    generate(max) {
        this.i1 = generateRandomNumber(max) + 1;
        return this;
    }
    
    clone() {
        let newObj = new TenBuddiesQuestion();
        newObj.i1 = this.i1;
        return newObj;
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
    constructor() {
        super();
        this.ans = NaN;
    }

    generate(max) {
        let i1 = generateRandomRange(1, +max);
        let itemp = +max - +i1

        // Sleep to get more deversified random numbers
        sleep(10);
        let i2 = generateRandomRange(1, +itemp);
        this.ans = +i1 + +i2;
        this.i1 = i1;
        return this;
    }

    clone() {
        let newObj = new AddQuestion(this.i1, this.ans);
        newObj.i1 = this.i1;
        newObj.ans = this.ans;
        return newObj;
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
    constructor() {
        super();
        this.i2 = NaN;
        this.ans = NaN;
    }

    generate(max) {
        let i1 = generateRandomNumber(+max - 1) + 1;
        let i2 = generateRandomNumber(+max);

        while(parseInt(i2) >= parseInt(i1)) {
            if (+i1 == 0) {
                i2 = 0;
                break;
            } else if (+i1 == 1) {
                i2 = generateRandomNumber(0, 1);
                break;
            }

            i2 = generateRandomNumber(+max);
        }

        this.i1 = i1;
        this.i2 = i2;

        return this;
    }

    clone() {
        let newObj = new SubQuestion();
        newObj.i1 = this.i1;
        newObj.i2 = this.i2;
        return newObj;
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
    constructor() {
        super();
    }

    generate(max) {
        this.i1 = generateRandomNumber(+max / 2);
        return this;
    }

    clone() {
        let newObj = new DoubleQuestion();
        newObj.i1 = this.i1;
        return newObj;
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
    constructor() {
        super();
    }

    generate(max) {
        let num = generateRandomNumber(+max + 1);

        do { num = generateRandomNumber(max); }
        while(num % 2 != 0);

        this.i1 = num;

        return this;
    }

    clone() {
        let newObj = new HalfQuestion();
        newObj.i1 = this.i1;
        return newObj;
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
