"use strict";

/*-----------
  FUNCTIONS
-----------*/

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
// Riempie array con 5 numeri casuali
function generateNumbers(array, wantedLength) {
  let number;
  while (array.length < wantedLength) {
    number = getRandomInt(1, 100);
    if (!array.includes(number)) {
      array.push(number);
    }
  }
  return array;
}
// Resetta campo
function eraseField(container) {
  container.innerHTML = "";
}
// Crea campo con numeri da array (svuota preventivamente)
function makeField(container, array) {
  eraseField(container);
  // for (let i = 0; i < array.length; i++) {
  //   const cellNumber = document.createElement("div");
  //   cellNumber.innerHTML = array[i];
  //   container.append(cellNumber);
  // }
  array.forEach((element) => {
    const cellNumber = document.createElement("div");
    cellNumber.innerHTML = element;
    container.append(cellNumber);
  });
}
// Controlla che i numeri inseriti siano presenti in quelli dell'array e restituisce numero
// delle risposte esatte, colora celle a seconda della risposta
function simonEpilogue(container, array, answerArray) {
  let counter = 0;
  // for (let i = 0; i < array.length; i++) {
  //   const cellNumber = document.createElement("div");
  //   cellNumber.innerHTML = array[i];
  //   cellNumber.style.borderWidth = `4px`;
  //   if (answerArray.includes(array[i])) {
  //     cellNumber.style.color = `darkgreen`;
  //     cellNumber.style.borderColor = `darkgreen`;
  //     counter++;
  //   } else {
  //     cellNumber.style.color = `darkred`;
  //     cellNumber.style.borderColor = `darkred`;
  //   }
  //   container.append(cellNumber);
  // }
  array.forEach((element) => {
    const cellNumber = document.createElement("div");
    cellNumber.innerHTML = element;
    cellNumber.style.borderWidth = `4px`;
    if (answerArray.includes(element)) {
      cellNumber.style.color = `darkgreen`;
      cellNumber.style.borderColor = `darkgreen`;
      counter++;
    } else {
      cellNumber.style.color = `darkred`;
      cellNumber.style.borderColor = `darkred`;
    }
    container.append(cellNumber);
  });
  return counter;
}
// Domanda numeri, chiama funzione per sapere quante risposte esatte sono state date
// Stampa in HTML il risultato
function simonQuestion(container, array, status) {
  const answerArray = [];
  for (let i = 0; i < array.length; i++) {
    let answer = Number(
      prompt(`Inserisci il ${i + 1}° dei ${array.length} numeri`)
    );
    answerArray.push(answer);
  }
  // array.forEach((element) => {
  //   let answer = Number(
  //     prompt(
  //       `Inserisci il ${array.indexOf(element)}° dei ${array.length} numeri`
  //     )
  //   );
  //   answerArray.push(answer);
  // });

  let correctAnswer = simonEpilogue(container, array, answerArray);
  if (correctAnswer > (array.length / 5) * 3) {
    status.innerHTML = `Complimenti, hai risposto correttamente a ${correctAnswer} domande su ${array.length}!`;
  } else {
    status.innerHTML = `Male, hai azzeccato giusto ${correctAnswer} risposte su ${array.length}, riprova`;
  }
}

/*-------
  MAIN
-------*/

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
  let wantedNumbers = 5;
  makeField(board, generateNumbers(simonNumbers, wantedNumbers));
  const countdown = 5;
  alert(`hai ${countdown} secondi per memorizzare i numeri`);

  setTimeout(function () {
    eraseField(board);
  }, countdown * 1000);

  setTimeout(function () {
    simonQuestion(board, simonNumbers, gameStatus);
  }, countdown * 1050);
});
