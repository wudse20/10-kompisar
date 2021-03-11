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
    constructor(isHardMode) {
        super()
        this.ans = NaN;
        this.isHardMode = isHardMode;
        this.message = null;
    }

    generate(max) {
        if (this.isHardMode) {
            let num1 = 0;
            let num2 = 0;
            switch (generateRandomNumber(100) % 2) {
                case 0:
                    num1 = generateRandomNumber(max) + 1;
                    num2 = generateRandomRange(0, +num1);
                    this.i1 = +num1 - +num2;
                    this.message = num1 + " - " + num2;
                    break;
                case 1:
                    this.i1 = generateRandomNumber(max) + 1;
                    num1 = generateRandomNumber(this.i1) + 1;
                    num2 = +this.i1 - +num1;
                    this.message = num1 + " + " + num2;
                    break;
            }

            console.log(this.message);
        } else {
            this.i1 = generateRandomNumber(max) + 1;
            this.message = this.i1;
        }

        return this;
    }
    
    clone() {
        let newObj = new TenBuddiesQuestion();
        newObj.i1 = this.i1;
        newObj.isHardMode = this.isHardMode;
        newObj.message = this.message
        return newObj;
    }

    checkAnswer(answer) {
        this.ans = (isNaN(answer)) ? -1 : answer;
        return !isNaN(+answer) && (10 - +answer === +this.i1);
    }

    toString() {
        let text = isNaN(this.ans) ? "Tiokompis till " + this.message + " är _" :
                                     "Tiokompis till " + this.message + " är " +
                                     (10 - +this.i1) + (this.checkAnswer(this.ans) ? ": Du svarade rätt" : ": Du svarade fel (" + this.ans + ")");
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
                                 " = " + this.ans + (this.correct ? ": Du svarade rätt" : ": Du svarade fel (" + this.ans + ")") :
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
                                (this.checkAnswer(this.ans) ? ": Du svarade rätt" : ": Du svarade fel (" + this.ans + ")");
        return text;
    }
}

class DoubleQuestion extends Question {
    constructor() {
        super();
        this.ans = NaN;
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
        this.ans = ans;
        return this.correct;
    }

    toString() {
        let text = this.solved ? (+this.i1 * 2) + " är dubbelt så stort som " + this.i1 + (this.correct ? ": Du svarade rätt" : ": Du svarade fel (" + this.ans + ")") :
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
        let text = this.solved ? ans +  " är hälften så stort som " + this.i1 + (this.correct ? ": Du svarade rätt" : ": Du svarade fel (" + this.ans + ")") :
                                 "_ är hälften så stort som " + this.i1;
        return text;
    }
}

let m = new Map();
m.set("A", true);
m.set("B", false);
m.set("C", true);
m.set("D", true);
m.set("E", true);
m.set("F", false);
m.set("G", false);
m.set("H", true);
m.set("I", true);
m.set("J", false);
m.set("K", true)
m.set("L", false);
m.set("M", true);
m.set("N", false);
m.set("O", true);
m.set("P", false);
m.set("Q", false);
m.set("R", false);
m.set("S", false);
m.set("T", true);
m.set("U", true);
m.set("V", true);
m.set("W", true);
m.set("X", true);
m.set("Y", true);
m.set("Z", true);
m.set("Å", true);
m.set("Ä", true);
m.set("Ö", true);
m.set("a", false);
m.set("b", false);
m.set("c", true);
m.set("d", false);
m.set("e", false);
m.set("f", false);
m.set("g", false);
m.set("h", false);
m.set("i", true);
m.set("j", false);
m.set("k", false)
m.set("l", true);
m.set("m", true);
m.set("n", false);
m.set("o", true);
m.set("p", false);
m.set("q", false);
m.set("r", false);
m.set("s", false);
m.set("t", false);
m.set("u", false);
m.set("v", true);
m.set("w", true);
m.set("x", true);
m.set("y", false);
m.set("z", true);
m.set("å", false);
m.set("ä", false);
m.set("ö", true);

const alphabet = "abcdefghijklmnopqrstuvwxyzåäöABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";

class SymetiryQuestion extends Question {
    constructor() {
        super();
        this.ans = "";
    }

    generate(max) {
        this.letter = alphabet[Math.floor(Math.random() * alphabet.length)];
        return this;
    }

    clone() {
        let newObj = new SymetiryQuestion();
        newObj.letter = this.letter;
        return newObj;
    }

    checkAnswer(ans) {
        this.correct = ans == m.get(this.letter);
        this.solved = true;
        this.ans = ans;
        return this.correct;
    }

    toString() {
        let ans = this.ans ? "ja" : "nej";
        let string = "Är bokstaven: '" + this.letter + "' symetrisk?"
        return string + (this.solved ? m.get(this.letter) ? " Ja" : " Nej" : "") + (this.solved ? this.correct ? ": Du svarade rätt" : ": Du svarade fel (" + ans + ")" : "");
    }
}

class NeighbourQuestion extends Question {
    constructor() {
        super();
        this.showingNeighbour = 0;
        this.ans = NaN;
        this.pAns = NaN;
    }

    generate(max) {
        this.i1 = generateRandomRange(1, max);
        this.showingNeighbour = (Math.random() < 0.5) ? this.i1 + 1 : this.i1 - 1;
        this.ans = (this.showingNeighbour > this.i1) ? this.i1 - 1 : this.i1 + 1;

        return this;
    }

    clone() {
        let newObj = new NeighbourQuestion();
        newObj.i1 = this.i1;
        newObj.showingNeighbour = this.showingNeighbour;
        newObj.ans = this.ans;

        return newObj;
    }

    checkAnswer(ans) {
        this.pAns = ans;
        this.correct = +ans === this.ans;
        this.solved = true;

        return this.correct;
    }

    toString() {
        let txt = "Skriv in den saknade talgrannen: ";

        txt += this.solved ? (+this.i1 - 1) + " " + this.i1 + " " + (+this.i1 + 1)  + (this.correct ? ": Du svarade rätt" : ": Du svarade fel (" + this.pAns + ")") :
               this.showingNeighbour > this.i1 ? "<br>_ " + this.i1 + " " + this.showingNeighbour :
               "<br>" + this.showingNeighbour + " " + this.i1 + " _";

        return txt;
    }
}
