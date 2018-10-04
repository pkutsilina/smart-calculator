class SmartCalculator {

    static priorities() {
        return {
            '+': 0,
            '-': 0,
            '*': 1,
            '/': 1,
            '^': 2
        };
    }

    static operators() {
        return ['-', '+', '*', '/', '^'];
    }

    static isOperatorLeftAssosiative(operator) {
        return (operator != '^');
    }

    constructor(initialValue) {
        this.tempStack = [];
        this.resultPolskiStrig = [];
        this.resultPolskiStrig.push(initialValue);
    }

    add(number) {
        this.commonFillPolskiString('+');
        this.resultPolskiStrig.push(number);
        return this;
    }

    subtract(number) {
        this.commonFillPolskiString('-');
        this.resultPolskiStrig.push(number);
        return this;
    }

    multiply(number) {
        this.commonFillPolskiString('*');
        this.resultPolskiStrig.push(number);
        return this;
    }

    devide(number) {
        this.commonFillPolskiString('/');
        this.resultPolskiStrig.push(number);
        return this;
    }

    pow(number) {
        this.commonFillPolskiString('^');
        this.resultPolskiStrig.push(number);
        return this;
    }

    //Maintain reverse polish string and corresponding stack with current operator
    commonFillPolskiString(operator) {
        let isContinue = false;
        do {
            let topStackElement = this.tempStack.pop();
            if (topStackElement != undefined) {
                if (SmartCalculator.priorities()[topStackElement] > SmartCalculator.priorities()[operator]
                    || (SmartCalculator.priorities()[topStackElement] == SmartCalculator.priorities()[operator]
                        && SmartCalculator.isOperatorLeftAssosiative(operator))) {
                    this.resultPolskiStrig.push(topStackElement);
                    isContinue = true;
                }
                else {
                    this.tempStack.push(topStackElement);
                    isContinue = false;
                }
            } else {
                isContinue = false;
            }
        }
        while (isContinue);
        this.tempStack.push(operator);
    }

    valueOf() {
        return this.computePolskiString();
    }

    //Gets result of reverse polish notation
    computePolskiString() {
        let it = this.tempStack.pop();
        while (it != undefined) {
            this.resultPolskiStrig.push(it);
            it = this.tempStack.pop();
        }

        let stackNumbersForComputing = [];
        for (let i = 0; i < this.resultPolskiStrig.length; i++) {
            let currentSymbol = this.resultPolskiStrig[i];
            if (SmartCalculator.operators().includes(currentSymbol)) {
                let last = stackNumbersForComputing.pop();
                let preLast = stackNumbersForComputing.pop();
                switch (currentSymbol) {
                    case '+':
                        stackNumbersForComputing.push(preLast + last);
                        break;
                    case '-':
                        stackNumbersForComputing.push(preLast - last);
                        break;
                    case '*':
                        stackNumbersForComputing.push(preLast * last);
                        break;
                    case '/':
                        stackNumbersForComputing.push(preLast / last);
                        break;
                    case '^':
                        stackNumbersForComputing.push(Math.pow(preLast, last));
                        break;
                }
            }
            else {
                stackNumbersForComputing.push(currentSymbol);
            }
        }
        let result = stackNumbersForComputing.pop();
        return result;
    }
}


module.exports = SmartCalculator;
