const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
  };

  function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
  
    if (waitingForSecondOperand === true) {
      calculator.displayValue = digit;
      calculator.waitingForSecondOperand = false;
    } else {
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
  }

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    expression = '';
  }

  function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);
  
    if (operator && calculator.waitingForSecondOperand)  {
      calculator.operator = nextOperator;
      return;
    }
  
      const currentValue = firstOperand || 0;
      let toSend = {expression: expression};
      let result = ""
      $.ajax({
          type: "POST",
          url: 'http://localhost:8080',
          crosDomain: true,
          data: toSend,
          dataType: "json",
          headers: {
              'access-Control-Allow-Origin': 'localhost:8080'
          },
          success : function (data) {
              result = data
              calculator.displayValue = String(result);
              calculator.firstOperand = result;
              updateDisplay();
          }
      });
  
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
  }


function updateDisplay() {
    const display = document.querySelector('.calculator-display');
    display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-body');
let expression = "";
keys.addEventListener('click', (event) => {
    const {target} = event;
    if (!target.matches('button')) {
        return;
    }

    if (!(target.classList.contains('clearAll') || target.classList.contains('equal-sign'))) {
        expression += target.value;
    }
    if (target.classList.contains('clearAll')) {
            resetCalculator();
            updateDisplay();
    }
    
    if (target.classList.contains('equal-sign')) {
        handleOperator(target.value);
            updateDisplay();
        return;
      }

    inputDigit(target.value);
    updateDisplay();
})