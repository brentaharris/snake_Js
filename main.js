import {
  update as updateSnake,
  draw as drawSnake,
  getSnakeHead,
  snakeIntersection,
} from "./snake.js";

import { howText } from "./howto.js";

import { outsideGrid } from "./grid.js";

import { update as updateFood, draw as drawFood } from "./food.js";

//dom cache and variable init
let SNAKE_SPEED = 2;
let lastRenderTime = 0;
let gameOver = false;
let gameStarted = false;
const gameBoard = document.getElementById("game-board");
const playBtn = document.querySelector(".btn-play");
const restartBtn = document.querySelector(".btn-restart");
const modalEl = document.querySelector(".modal-start");
const modalEndEl = document.querySelector(".modal-end");
let difficultyEl = document.querySelector(".difficulty");
const howBtn = document.querySelector(".btn-how-to");
const howModal = document.querySelector(".modal-how-to");
const closeHowBtn = document.querySelector(".btn-close");

//event listeners
playBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restart);
howBtn.addEventListener("click", showHowTo);
closeHowBtn.addEventListener("click", closeHowTo);

//choose difficulty
difficultyEl.addEventListener("change", () => {
  switch (difficultyEl.value) {
    case "Easy":
      SNAKE_SPEED = 2;
      break;
    case "Harder":
      SNAKE_SPEED = 5;
      break;
    case "Hardest":
      SNAKE_SPEED = 10;
  }
});

//main game loop
function main(currentTime) {
  if (gameStarted) {
    if (gameOver) {
      //show gameover modal window
      modalEndEl.classList.remove("hidden");
    }

    window.requestAnimationFrame(main);
    let secondSinceLastRender = (currentTime - lastRenderTime) / 1000;

    if (secondSinceLastRender < 1 / SNAKE_SPEED) return;

    lastRenderTime = currentTime;

    update();
    draw();
  }
}

window.requestAnimationFrame(main);

function startGame() {
  gameStarted = true;
  modalEl.classList.toggle("hidden");
  main();
}

//functions
function restart() {
  window.location = "/";
}

function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

function showHowTo() {
  howModal.classList.remove("hidden");
  const howTextEl = document.querySelector(".how-text");
  howTextEl.textContent = howText;
}

function closeHowTo() {
  howModal.classList.add("hidden");
}
