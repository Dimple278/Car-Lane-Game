export class Line {
  x: number;
  y: number;
  image: HTMLImageElement;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = "./line.png";
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y);
  }

  update() {
    this.y += 3;
    if (this.y > 700) {
      this.y = -140;
    }
  }
}

export class Car {
  image: HTMLImageElement;
  x: number;
  y: number;

  constructor(src: string, x: number, y: number) {
    this.image = new Image();
    this.image.src = src;
    this.x = x;
    this.y = y;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y);
  }

  moveLeft() {
    if (this.x > 0) this.x -= 7;
  }

  moveRight() {
    if (this.x < 335) this.x += 7;
  }
}

export class EnemyCar extends Car {
  initialX: number;
  initialY: number;
  static positions: number[] = [50, 183, 316]; // Possible positions on the x-axis for cars.

  constructor(src: string, x: number, y: number) {
    super(src, x, y);
    this.initialX = x;
    this.initialY = y;
  }

  update(speed: number, myCar: Car, loseLife: () => void, incrementScore: () => void, enemyCars: EnemyCar[]) {
    this.y += speed;
    if (this.y > 700) {
      this.resetPosition(enemyCars);
      incrementScore();
    }
    if (this.detectCollision(myCar)) {
      loseLife();
      this.resetPosition(enemyCars);
    }
  }

  resetPosition(enemyCars: EnemyCar[]) {
    this.y = this.initialY;
    let newPosition: number;

    // Ensure the new position does not overlap with other enemy cars.
    do {
      newPosition = Math.floor(Math.random() * 3) * 133 + 50;
    } while (enemyCars.some(car => car !== this && car.x === newPosition && Math.abs(car.y - this.y) < 140));

    this.x = newPosition;
  }

  detectCollision(myCar: Car): boolean {
    return (
      this.y + 100 > myCar.y &&
      this.x + 65 > myCar.x &&
      this.x < myCar.x + 65
    );
  }
}


