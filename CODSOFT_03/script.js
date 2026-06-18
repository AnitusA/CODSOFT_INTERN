const display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = null;

const buttons = document.querySelectorAll('button');

function updateDisplay(value) {
  display.value = value;
}

function handleNumber(num) {
  if (num === '.' && currentInput.includes('.')) return;
  currentInput += num;
  updateDisplay(currentInput);
}

function handleOperator(op) {
  if (currentInput === '' && previousInput === '') return;
  if (previousInput !== '' && currentInput !== '') {
    calculate();
  }
  operator = op;
  previousInput = currentInput || previousInput;
  currentInput = '';
}

function calculate() {
  if (previousInput === '' || currentInput === '' || !operator) return;

  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);
  let result;

  if (operator === '+') {
    result = prev + curr;
  } else if (operator === '-') {
    result = prev - curr;
  } else if (operator === '*') {
    result = prev * curr;
  } else if (operator === '/') {
    if (curr === 0) {
      updateDisplay('Error');
      currentInput = '';
      previousInput = '';
      operator = null;
      return;
    }
    result = prev / curr;
  } else {
    return;
  }

  result = Math.round(result * 1e10) / 1e10;
  currentInput = result.toString();
  operator = null;
  previousInput = '';
  updateDisplay(currentInput);
}

function clearAll() {
  currentInput = '';
  previousInput = '';
  operator = null;
  updateDisplay('0');
}

function backspace() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput || '0');
}

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    const value = this.textContent;

    if (this.classList.contains('number')) {
      handleNumber(value);
    } else if (this.classList.contains('operator')) {
      handleOperator(value);
    } else if (this.classList.contains('equals')) {
      calculate();
    } else if (this.classList.contains('clear')) {
      clearAll();
    } else if (this.classList.contains('backspace')) {
      backspace();
    }
  });
}
