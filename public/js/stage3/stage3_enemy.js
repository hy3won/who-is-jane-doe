class Enemy {
  constructor(x, y, w, h, hidden) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.img = loadImage('../img/stage3_man.png');

    this.isClicked = false;

    this.hidden = hidden;
    this.text = null;
  }

  show() {
    image(this.img, this.x, this.y, this.w, this.h);

    if (!this.text) {
      this.text = random(0, 1) > 0.5 ? '교수' : '최승아';
    }

    if (this.hidden) {
      text(this.text, this.x + 30, this.y);
    }
  }

  move(move_x, move_y) {
    this.x += move_x;
    this.y += move_y;
  }

  over() {
    let x2 = this.x + this.w;
    let y2 = this.y + this.h;
    if (this.x < mouseX && mouseX < x2 && this.y < mouseY && mouseY < y2) {
      return true;
    } else {
      return false;
    }
  }

  click() {
    let x2 = this.x + this.w;
    let y2 = this.y + this.h;
    if (this.x < mouseX && mouseX < x2 && this.y < mouseY && mouseY < y2) {
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

  cought() {
    this.y = -999;
  }
}