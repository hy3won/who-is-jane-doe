let bugs = [];
let score = 0;
let img = []
let current = 0;

function setup() {
  var canvas = createCanvas(400, 400);
  canvas.parent("sketch-holder");

  for (let t = 0; t < 2; t++){
    img[t] = loadImage('../img/stage4_모기_' + t + '.png')
  }
  
  bugs[0] = new Mosq(400, 300, -2, 1);
  bugs[1] = new Mosq(100, 50, 2, 1);
  bugs[2] = new Mosq(50, 200, -1, 4);
  bugs[3] = new Mosq(250, 200, 4, 4);
  bugs[4] = new Mosq(150, 300, -1, 2);
}

function draw() {
  background(220);
  for (let i = 0; i < bugs.length; i++) {
    bugs[i].show();
    bugs[i].move();
    if (bugs[i].click()) {
      score += 1;
      bugs[i].caught();
    }
  }
  text("죽인 횟수 : " + score, 300, 50);
}


class Mosq {
  constructor(x, y, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.isClicked = false;
  }

  show() {
    for (let t = 0; t < 2; t++) {
        if (t < 2) {
          t++;
        } else {
          t = 0;
        }
        image(img[t], this.x, this.y, 40, 40);
      }
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > width || this.x < 0) {
      this.speedX *= -1;
    }
    if (this.y > height || this.y < 0) {
      this.speedY = this.speedY * -1;
    }
  }

  over() {
    if (
      this.x - 20 < mouseX &&
      mouseX < this.x + 20 &&
      this.y - 20 < mouseY &&
      mouseY < this.y + 20
    ) {
      return true;
    } else {
      return false;
    }
  }

  click() {
    if (
      this.x - 20 < mouseX &&
      mouseX < this.x + 20 &&
      this.y - 20 < mouseY &&
      mouseY < this.y + 20
    ) {
      if (mouseIsPressed) {
        if (!this.isClicked) {
          this.isClicked = true;
          return true;
        } else {
          return false;
        }
      }
    }

    this.isClicked = false;
    return false;
  }

  caught() {
    this.y = -1000;
    this.speedY = 0;
  }
}