let currentNumber = '';
let previousNumber = '';
let operation = null;
let memory = 0;
let currentMode = 'basic';

function updateDisplay() {
    document.getElementById('current').innerText = currentNumber || '0';
    document.getElementById('previous').innerText = previousNumber + (operation || '');
}

function appendNumber(num) {
    if (num === '.' && currentNumber.includes('.')) return;
    if (currentNumber === '0' && num !== '.') {
        currentNumber = num;
    } else {
        currentNumber += num;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (currentNumber === '' && op === '-') {
        currentNumber = '-';
        updateDisplay();
        return;
    }
    if (currentNumber === '') return;
    if (previousNumber !== '') {
        calculate();
    }
    operation = op;
    previousNumber = currentNumber;
    currentNumber = '';
    updateDisplay();
}

function addFunction(func) {
    if (currentNumber === '') currentNumber = '0';
    currentNumber = func + currentNumber + ')';
    updateDisplay();
}

function addConstant(constant) {
    if (constant === 'pi') {
        appendNumber(Math.PI.toString());
    } else if (constant === 'e') {
        appendNumber(Math.E.toString());
    }
}

function addParenthesis(paren) {
    currentNumber += paren;
    updateDisplay();
}

function addPercent() {
    if (currentNumber !== '') {
        currentNumber = (parseFloat(currentNumber) / 100).toString();
        updateDisplay();
    }
}

function toggleSign() {
    if (currentNumber !== '') {
        currentNumber = (parseFloat(currentNumber) * -1).toString();
        updateDisplay();
    }
}

function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}

function evaluateExpression(expr) {
    expr = expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/\^/g, '**');
    
    while (expr.includes('factorial(')) {
        expr = expr.replace(/factorial\(([^)]+)\)/g, (match, num) => {
            return factorial(parseFloat(num));
        });
    }
    
    expr = expr.replace(/sin\(/g, 'Math.sin(');
    expr = expr.replace(/cos\(/g, 'Math.cos(');
    expr = expr.replace(/tan\(/g, 'Math.tan(');
    expr = expr.replace(/asin\(/g, 'Math.asin(');
    expr = expr.replace(/acos\(/g, 'Math.acos(');
    expr = expr.replace(/atan\(/g, 'Math.atan(');
    expr = expr.replace(/sinh\(/g, 'Math.sinh(');
    expr = expr.replace(/cosh\(/g, 'Math.cosh(');
    expr = expr.replace(/tanh\(/g, 'Math.tanh(');
    expr = expr.replace(/sqrt\(/g, 'Math.sqrt(');
    expr = expr.replace(/log\(/g, 'Math.log10(');
    expr = expr.replace(/ln\(/g, 'Math.log(');
    expr = expr.replace(/exp\(/g, 'Math.exp(');
    
    expr = expr.replace(/pi/g, Math.PI);
    expr = expr.replace(/e(?![a-z])/g, Math.E);
    
    return Function('"use strict";return (' + expr + ')')();
}

function calculate() {
    let expression = '';
    if (previousNumber !== '' && operation && currentNumber !== '') {
        expression = previousNumber + operation + currentNumber;
    } else if (currentNumber !== '') {
        expression = currentNumber;
    } else {
        return;
    }
    
    try {
        let result = evaluateExpression(expression);
        if (isNaN(result) || !isFinite(result)) {
            throw new Error('Invalid calculation');
        }
        result = Math.round(result * 1000000) / 1000000;
        currentNumber = result.toString();
        previousNumber = '';
        operation = null;
        updateDisplay();
        
        document.getElementById('current').classList.add('result-animation');
        setTimeout(() => {
            document.getElementById('current').classList.remove('result-animation');
        }, 300);
    } catch (error) {
        alert('Invalid expression!');
        clearAll();
    }
}

function clearAll() {
    currentNumber = '';
    previousNumber = '';
    operation = null;
    updateDisplay();
}

function deleteLast() {
    currentNumber = currentNumber.slice(0, -1);
    updateDisplay();
}

function memorySave() {
    if (currentNumber !== '') {
        memory += parseFloat(currentNumber);
    }
}

function memoryRecall() {
    if (memory !== 0) {
        currentNumber = memory.toString();
        updateDisplay();
    }
}

function memoryClear() {
    memory = 0;
}

function setMode(mode) {
    currentMode = mode;
    if (mode === 'basic') {
        document.getElementById('basic-buttons').classList.remove('hidden');
        document.getElementById('scientific-buttons').classList.add('hidden');
    } else {
        document.getElementById('basic-buttons').classList.add('hidden');
        document.getElementById('scientific-buttons').classList.remove('hidden');
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (e.key === '.') appendNumber('.');
    if (e.key === '+') appendOperator('+');
    if (e.key === '-') appendOperator('-');
    if (e.key === '*') appendOperator('*');
    if (e.key === '/') appendOperator('/');
    if (e.key === 'Enter') calculate();
    if (e.key === 'Escape') clearAll();
    if (e.key === 'Backspace') deleteLast();
    if (e.key === '%') addPercent();
});

document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

updateDisplay();