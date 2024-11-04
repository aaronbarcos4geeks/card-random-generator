/* eslint-disable */
import "bootstrap";
import "./style.css";

const symbols = ["♦", "♥", "♠", "♣"];
const numbers = [
  "♙",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "♔",
  "♕",
  "♖"
];

let intervalId;
let isTimerRunning = false;
let timeLeft = 10;

const generateRandomCart = () => {
  const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
  const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];

  const cardElement = document.querySelector(".card");
  const symbolElements = document.querySelectorAll(".symbol");
  const numberElement = document.querySelector(".number");

  cardElement.style.display = "flex";
  symbolElements.forEach(el => (el.textContent = randomSymbol));
  numberElement.textContent = randomNumber;

  cardElement.setAttribute("data-symbol", randomSymbol);
};

const updateButtonLabel = button => {
  button.textContent = `Pause Timer (${timeLeft}s)`;
};

const startTimer = button => {
  if (isTimerRunning) {
    clearInterval(intervalId);
    isTimerRunning = false;
    button.textContent = "Start Timer";
  } else {
    intervalId = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        timeLeft = 10;
        generateRandomCart();
      }
      updateButtonLabel(button);
    }, 1000);

    isTimerRunning = true;
    updateButtonLabel(button);
  }
};

const addEventListenerBtns = () => {
  const button = document.querySelector(".random-btn");
  button.addEventListener("click", generateRandomCart);

  const startTimerButton = document.querySelector(".start-timer-btn");
  startTimerButton.addEventListener("click", () => {
    startTimer(startTimerButton);
  });

  const applySizeButton = document.querySelector(".apply-size-btn");
  applySizeButton.addEventListener("click", () => {
    const widthInput = document.querySelector("#width-input").value;
    const heightInput = document.querySelector("#height-input").value;
    const cardElement = document.querySelector(".card");

    if (widthInput) cardElement.style.width = widthInput;
    if (heightInput) cardElement.style.height = heightInput;
  });
};

window.onload = function() {
  generateRandomCart();
  addEventListenerBtns();
};
