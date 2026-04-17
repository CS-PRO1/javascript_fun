class Calculator {
    //Initialize calculator with display elements
    constructor(prevOperandTextElement, currOperandTextElement) {
        this.prevOperandTextElement = prevOperandTextElement;
        this.currOperandTextElement = currOperandTextElement;
        this.clearAll(); //clearing to make sure display is empty on load
    }

    //Output display clearing
    clearAll() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    //Clears only the current operand, leaving previous operand and operation intact
    clearCurrent() {
        this.currentOperand = '0';
    }

    //Deletes the last digit from the current operand
    delete() {
        //Slice => gets a portion of the string and returns it as a new string
        //Here 0 is the beginnng of the string and -1 is the second to last character of the string
        //This effectively removes the last character from the current operand string
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') {
            this.currentOperand = '0';
        }
    }

    //Appends a digit to the current operand string, ensuring only one decimal point is allowed
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    //Sets the current operation and prepares for the next operand
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    //Negates the current operand value (multiplies by -1)
    negateValue() {
        calculator.currentOperand = (parseFloat(calculator.currentOperand) * -1).toString();

    }
    reciprocateValue() {
        calculator.currentOperand = (1 / parseFloat(calculator.currentOperand)).toString();
    }

    squaredValue() {
        calculator.currentOperand = (parseFloat(calculator.currentOperand) ** 2).toString();
    }

    sqrtValue() {
        calculator.currentOperand = (Math.sqrt(parseFloat(calculator.currentOperand))).toString();
    }

    //Does the calculation
    compute() {
        let result;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(curr)) return;

        switch (this.operation) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '×':
                result = prev * curr;
                break;
            case '÷':
                result = prev / curr;
                break;
            //To calculate a percentage on a calculator, enter a number and hit the % button to turn the number into a decimal. Alternatively, if you want to find the percentage of a number, multiply the number by the percentage as a fraction of 100 (e.g., to find 20% of 80, multiply 80 by 0.2).
            case '%':
                result = prev * (curr / 100);
                break;
            default:
                return;
        }

        this.currentOperand = result.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    //Formatting input/output numbers in the display
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        //we split the decimal portion out because it doesn't need to be formatted
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    // Refreshes the display
    updateDisplay() {
        this.currOperandTextElement.innerText = this.currentOperand;
        this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.prevOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        }
        else {
            this.prevOperandTextElement.innerText = '';
        }
    }
}



//Button and display element selectors
const numButtons = document.querySelectorAll('[data-number]');
const opButtons = document.querySelectorAll('[data-operation]');
const negateButton = document.querySelector('[data-negate]');
const reciprocalButton = document.querySelector('[data-reciprocal]');
const squaredButton = document.querySelector('[data-squared]');
const sqrtButton = document.querySelector('[data-sqrt]');
const equalsButton = document.querySelector('[data-equals]');
const delButton = document.querySelector('[data-delete]');
const clearCurrentButton = document.querySelector('[data-clear-current]');
const clearAllButton = document.querySelector('[data-all-clear]');
const prevOperandTextElement = document.querySelector('[data-prev-operand]');
const currOperandTextElement = document.querySelector('[data-current-operand]')


//Create a calculator object
const calculator = new Calculator(prevOperandTextElement, currOperandTextElement);


// Add event listeners to buttons and calling corresponding calculator methods
numButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

opButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

clearAllButton.addEventListener('click', () => {
    calculator.clearAll();
    calculator.updateDisplay();
});

delButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

clearCurrentButton.addEventListener('click', () => {
    calculator.clearCurrent();
    calculator.updateDisplay();
});

negateButton.addEventListener('click', () => {
    calculator.negateValue();
    calculator.updateDisplay();
});

reciprocalButton.addEventListener('click', () => {
    calculator.reciprocateValue();
    calculator.updateDisplay();
});

squaredButton.addEventListener('click', () => {
    calculator.squaredValue();
    calculator.updateDisplay();
});

sqrtButton.addEventListener('click', () => {
    calculator.sqrtValue();
    calculator.updateDisplay();
});