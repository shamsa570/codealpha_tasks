
let currentInput = "";
let operator = null;
let previousInput = "";

const resultInput = document.getElementById("result");


const updateDisplay = () => {

  if (operator && previousInput) {
    resultInput.value = `${previousInput} ${operator} ${currentInput || ""}`;
  } else {
    resultInput.value = currentInput || "0";
  }
};


document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    if (value === "C") {
   
      currentInput = "";
      previousInput = "";
      operator = null;
    } else if (value === "=") {
   
      if (operator && previousInput !== "" && currentInput !== "") {
        const prev = parseFloat(previousInput);
        const curr = parseFloat(currentInput);
        switch (operator) {
          case "+":
            currentInput = (prev + curr).toString();
            break;
          case "-":
            currentInput = (prev - curr).toString();
            break;
          case "*":
            currentInput = (prev * curr).toString();
            break;
          case "/":
            currentInput = curr !== 0 ? (prev / curr).toString() : "Error";
            break;
        }
        operator = null;
        previousInput = "";
      }
    } else if (["+", "-", "*", "/"].includes(value)) {

      if (currentInput !== "") {
        operator = value;
        previousInput = currentInput;
        currentInput = "";
      }
    } else {
    
      currentInput += value;
    }

    updateDisplay();
  });
});


updateDisplay();
