"use strict";

// Functions for the calculator

const add = function (a, b) {
  return a + b;
};
const subtract = function (a, b) {
  return a - b;
};
const multiply = function (a, b) {
  return a * b;
};
const divide = function (a, b) {
  return a / b;
};

const operate = function (a, b, operator) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "X":
      return multiply(a, b);
    case "/":
      if (b === 0) {
        return "oops";
      } else {
        return divide(a, b);
      }
    default:
      return console.log("Choose a different operator!");
  }
};

// Selectors
const divideButton = document.querySelector(".divide");
const multiplyButton = document.querySelector(".multiply");
const subtractButton = document.querySelector(".subtract");
const addButton = document.querySelector(".add");
const clearButton = document.querySelector(".clear");
const equalButton = document.querySelector(".equal");
const numberButton = document.querySelectorAll(".number");
const operatorButton = document.querySelectorAll(".operator");
const screen = document.querySelector(".screen");
const dotButton = document.querySelector(".dot");
const deleteButton = document.querySelector(".delete");

// Variables
let storedNumber = "";
let firstNumber = "";
let chosenOperator = "";
let result = "";
screen.textContent = 0;

// Number click
numberButton.forEach((number) => {
  number.addEventListener("click", () => {
    storedNumber += number.value;

    populate(storedNumber);
    console.log(storedNumber);
  });
});

// Operator click
operatorButton.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (storedNumber && firstNumber) {
      getResult();
      chosenOperator = operator.textContent;
      console.log(chosenOperator);
    } else {
      firstNumber = storedNumber;
      chosenOperator = operator.textContent;
      storedNumber = "";

      console.log(chosenOperator);
    }
  });
});

// Get result
const getResult = function () {
  result = operate(Number(firstNumber), Number(storedNumber), chosenOperator);

  if (typeof result === "number") {
    populate(roundToTwo(result));
  } else populate(result);

  firstNumber = result;
  storedNumber = "";

  console.log(roundToTwo(result));
};

// Equal button
equalButton.addEventListener("click", () => {
  if (firstNumber && storedNumber && chosenOperator) {
    getResult();
    storedNumber;
  }
});

// Clear all data
clearButton.addEventListener("click", () => {
  populate(0);
  firstNumber = "";
  storedNumber = "";
  chosenOperator = "";
});

// Dot Button (add decimals)
dotButton.addEventListener("click", () => {
  if (!storedNumber.includes(".")) {
    storedNumber += dotButton.value;
    populate(storedNumber);
  }
});

//Delete one character
deleteButton.addEventListener("click", () => {
  storedNumber = storedNumber.slice(0, storedNumber.length - 1);
  populate(storedNumber);
});

// Populate the screen
const populate = function (data) {
  screen.textContent = data;
};

// Round result to 2 decimals
const roundToTwo = function (num) {
  return +(Math.round(num + "e+2") + "e-2");
};
