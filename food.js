import { onSnake, expandSnake } from "./snake.js";
import { randomGridPositon } from "./grid.js";
let scoreElement = document.querySelector(".score");
let score = 0;
let food = getRandomFoodPosition();
const EXPANSION_RATE = 1;
let newSegments = 0;

export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    food = getRandomFoodPosition();
    score += 1;
    scoreElement.textContent = `Score: ${score}`;
  }
}
export function draw(gameBoard) {
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPositon();
  }
  return newFoodPosition;
}
