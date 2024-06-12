export class GameObject {
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
  }
  
  export class Line extends GameObject {
    constructor(x: number, y: number) {
      super("./line.png", x, y);
    }
  
    update() {
      this.y += 3;
      if (this.y > 700) {
        this.y = -140;
      }
    }
  }
  
  export class Car extends GameObject {
    constructor(src: string, x: number, y: number) {
      super(src, x, y);
    }
  
    moveLeft() {
      if (this.x > 0) this.x -= 7;
    }
  
    moveRight() {
      if (this.x < 335) this.x += 7;
    }
  }
  
  export class EnemyCar extends Car {
    constructor(src: string, x: number, y: number) {
      super(src, x, y);
    }
  
    update(speed: number, myCar: Car, loseLife: () => void) {
      this.y += speed;
      if (this.y > 700) {
        this.resetPosition();
      }
  
      if (
        this.y + 100 > myCar.y &&
        this.x + 65 > myCar.x &&
        this.x < myCar.x + 65
      ) {
        loseLife();
        this.resetPosition();
      }
    }
  
    resetPosition() {
      this.y = -100;
      this.x = Math.floor(Math.random() * 3) * 133 + 50;
    }
  }
  