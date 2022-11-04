"use strict";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function generateNumbers(array) {
  let number;
  while (array.length < 5) {
    number = getRandomInt(1, 100);
    if (!array.includes(number)) {
      array.push(number);
    }
  }
  return array;
}
function eraseField(container) {
  container.innerHTML = "";
}
function makeField(container, array) {
  eraseField(container);
  for (let i = 0; i < array.length; i++) {
    const cellNumber = document.createElement("div");
    cellNumber.innerHTML = array[i];
    container.append(cellNumber);
  }
}
function simonEpilogue(container, array, answerArray) {
  let counter = 0;
  for (let i = 0; i < array.length; i++) {
    const cellNumber = document.createElement("div");
    cellNumber.innerHTML = array[i];
    cellNumber.style.borderWidth = `4px`;
    if (answerArray.includes(array[i])) {
      cellNumber.style.color = `darkgreen`;
      cellNumber.style.borderColor = `darkgreen`;
      counter++;
    } else {
      cellNumber.style.color = `darkred`;
      cellNumber.style.borderColor = `darkred`;
    }
    container.append(cellNumber);
  }
  return counter;
}
function simonQuestion(container, array, answerArray, status) {
  for (let i = 0; i < array.length; i++) {
    let answer = Number(
      prompt(`Inserisci il ${i + 1}° dei ${array.length} numeri`)
    );
    answerArray.push(answer);
  }

  let correctAnswer = simonEpilogue(container, array, answerArray);
  if (correctAnswer > (array.length / 5) * 3) {
    status.innerHTML = `Complimenti, hai risposto correttamente a ${correctAnswer} su ${array.length}!`;
  } else {
    status.innerHTML = `Fai pena, hai azzeccato giusto ${correctAnswer} su ${array.length}, riprova`;
  }
}

// Form submit -> start
const start = document.getElementById("generator");
// Creazione board su submit da bottone
generator.addEventListener("submit", function (event) {
  event.preventDefault();

  // Board
  const board = document.getElementById("board");
  // Game Status
  const gameStatus = document.getElementById("game-status");
  gameStatus.innerHTML = "";

  const simonNumbers = [];
  makeField(board, generateNumbers(simonNumbers));
  const countdown = 5;
  alert(`hai ${countdown} secondi per memorizzare i numeri`);

  setTimeout(function () {
    eraseField(board);
  }, countdown * 1000);

  const simonAnswers = [];
  setTimeout(function () {
    simonQuestion(board, simonNumbers, simonAnswers, gameStatus);
  }, countdown * 1050);
});
