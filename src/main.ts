import { Game } from './Game';

const game = new Game("canvas");

const startButton = document.getElementById("start-button") as HTMLButtonElement;
const restartButton= document.getElementById("restartButton") as HTMLButtonElement;

startButton.addEventListener("click", () => {
  startButton.style.display = "none"; 
  game.startGame();
});

restartButton.addEventListener('click', () => {
  game.startGame();
  game.hideRestartButton();
});