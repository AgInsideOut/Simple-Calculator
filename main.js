let prevOperText = document.getElementById('prev-oper');
let currOperText = document.getElementById('curr-oper');
let currOper = '';
let prevOper = '';
let oper;

function clearDisplay() {
    currOper = '';
    prevOper = '';
    oper = undefined;
    updateDisplay();
}

function appendNumber(number) {
    // Handle leading zeros
    if (number === 0 && currOper === '0') return;
    if (currOper === '0' || currOper === '-0') {
        currOper = currOper.slice(0, -1);
    }

    // Check if the "-" symbol is pressed and treat it as an operator
    if (number === '±') {
        if (currOper === '') {
            currOper = '-';
        } else {
            chooseOperator(number);
        }
        return;
    }

    // Handle the case when "0" is pressed after the decimal separator "."
    if (number === 0 && currOper === '') {
        currOper = '0.';
        return;
    }

    // Check if the decimal separator "." is pressed and handle it correctly
    if (number === '.') {
        if (currOper === '') {
            currOper = '0.';
        } else if (!currOper.includes('.')) {
            currOper += '.';
        }
        return;
    }

    // Check if the "%" symbol is pressed and treat it as a percentage value
    if (number === '%') {
        if (currOper !== '') {
            currOper = (parseFloat(currOper) / 100).toString();
        }
        updateDisplay(); // Update the display after handling the percentage
        return;
    }

    currOper += number;
    updateDisplay();
}

function chooseOperator(operator) {
    if (currOper === '') return;

    if (prevOper !== '') {
        compute();
    }

    oper = operator;
    prevOper = currOperText.innerText;
    currOper = '';
    updateDisplay();
}

function compute() {
    let comp;
    const prev = parseFloat(prevOper);
    const curr = parseFloat(currOper);
    if (isNaN(prev) || isNaN(curr)) return;

    switch (oper) {
        case 'add':
            comp = prev + curr;
            break;
        case 'subtract':
            comp = prev - curr;
            break;
        case 'multiply':
            comp = prev * curr;
            break;
        case 'divide':
            comp = prev / curr;
            break;
        default:
            return;
    }

    currOper = comp.toString();
    oper = undefined;
    prevOper = '';
    updateDisplay();
}

function updateDisplay() {
    currOperText.innerText = currOper;
    if (oper != null) {
        prevOperText.innerText = `${prevOper} ${getOperatorSymbol(oper)}`;
    } else {
        prevOperText.innerText = '';
    }
}

function calculate() {
    if (oper === undefined) return;
    compute();
}

function getOperatorSymbol(operator) {
    switch (operator) {
        case 'add':
            return '+';
        case 'subtract':
            return '-';
        case 'multiply':
            return '×';
        case 'divide':
            return '÷';
        default:
            return '';
    }
}

document.querySelectorAll('.calculator__keys button').forEach(button => {
    button.addEventListener('click', function() {
        const action = this.dataset.action;
        if (action === 'calculate') {
            calculate();
        } else if (action === 'clear') {
            clearDisplay();
        } else {
            appendNumber(this.innerText);
            if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
                chooseOperator(action);
            }
        }
    });
});
