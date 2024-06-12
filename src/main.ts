import { Game } from './Game';

const game = new Game("canvas");

const startButton = document.getElementById("start-button") as HTMLButtonElement;

startButton.addEventListener("click", () => {
  startButton.style.display = "none"; // Hide the button when the game starts
  game.startGame();
});
