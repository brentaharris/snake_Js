import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
  getSnakeHead,
  snakeIntersection,
} from "./snake.js";
import { outsideGrid } from "./grid.js";

import { update as updateFood, draw as drawFood } from "./food.js";

//todo
//implement difficulty and score

let lastRenderTime = 0;
let gameOver = false;
let gameStarted = false;
const gameBoard = document.getElementById("game-board");
const playBtn = document.querySelector(".btn-play");
const restartBtn = document.querySelector(".btn-restart");
const modalEl = document.querySelector(".modal-start");
const modalEndEl = document.querySelector(".modal-end");

playBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restart);
//main game loop
function main(currentTime) {
  if (gameStarted) {
    if (gameOver) {
      // modalEndEl.classList.toggle("hidden");
      if (confirm("You lost, press OK to restart game.")) {
        window.location = "/";
      }
      return;
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

function startGame(difficulty) {
  gameStarted = true;
  modalEl.classList.toggle("hidden");
  main();
}

function restart() {
  modalEndEl.classList.toggle("hidden");
  modalEl.classList.toggle("hidden");
  console.log("click");
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
