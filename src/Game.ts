import { Line, Car, EnemyCar } from './GameObject';

export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  lives: number;
  speed: number;
  stopGame: boolean;
  myReq: number | null;
  left: boolean;
  right: boolean;
  lines: Line[];
  myCar: Car;
  enemyCars: EnemyCar[];
  collisionCooldown: boolean;

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.lives = 5;
    this.speed = 4;
    this.stopGame = false;
    this.myReq = null;
    this.left = false;
    this.right = false;
    this.lines = [
      new Line(133, -140),
      new Line(133, 160),
      new Line(267, -140),
      new Line(267, 160),
    ];
    this.myCar = new Car("./car-1.png", 160, 600);
    this.enemyCars = [
      new EnemyCar("./car-2.png", 50, -150),
      new EnemyCar("./car-3.png", 250, -450),
    ];
    this.collisionCooldown = false;

    this.initEventListeners();
  }

  initEventListeners() {
    addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") this.left = true;
      if (event.key === "ArrowRight") this.right = true;
    });

    addEventListener("keyup", (event) => {
      if (event.key === "ArrowLeft") this.left = false;
      if (event.key === "ArrowRight") this.right = false;
    });

    setInterval(() => {
      this.speed++;
    }, 3000);
  }

  drawBackground() {
    this.ctx.fillStyle = "Gray";
    this.ctx.fillRect(0, 0, 400, 700);
  }

  drawLives() {
    this.ctx.font = "30px Serif";
    this.ctx.fillStyle = "White";
    this.ctx.fillText("Lives: " + this.lives, 300, 40);
  }

  drawLines() {
    this.lines.forEach((line) => {
      line.draw(this.ctx);
      line.update();
    });
  }

  drawMyCar() {
    if (this.left) this.myCar.moveLeft();
    if (this.right) this.myCar.moveRight();
    this.myCar.draw(this.ctx);
  }

  drawEnemyCars() {
    this.enemyCars.forEach((enemyCar) => {
      enemyCar.draw(this.ctx);
      enemyCar.update(this.speed, this.myCar, this.loseLife.bind(this));
    });
  }

  loseLife() {
    if (!this.collisionCooldown) {
      this.lives--;
      this.collisionCooldown = true;
      setTimeout(() => {
        this.collisionCooldown = false;
      }, 1000); // Cooldown period of 1 second

      if (this.lives < 1) this.stop();
    }
  }

  stop() {
    if (this.myReq) {
      cancelAnimationFrame(this.myReq);
    }
    this.ctx.font = "60px Serif";
    this.ctx.fillStyle = "Red";
    this.ctx.fillText("Game Over", 80, 350);
    this.ctx.font = "40px Serif";
    this.ctx.fillStyle = "Blue";
    this.ctx.fillText(`Your score was: ${this.speed}`, 80, 400);
    this.stopGame = true;
  }

  render() {
    if (this.stopGame) return;

    this.drawBackground();
    this.drawLives();
    this.drawLines();
    this.drawMyCar();
    this.drawEnemyCars();
    this.myReq = requestAnimationFrame(this.render.bind(this));
  }

  start() {
    this.render();
  }

  startGame() {
    this.stopGame = false;
    this.lives = 5;
    this.speed = 4;
    this.enemyCars.forEach(enemyCar => enemyCar.resetPosition());
    this.start();
  }
}
