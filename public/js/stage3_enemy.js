class Enemy {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
  
      this.img = loadImage('../img/stage3_person.png');
  
      this.isClicked = false;
    }
  
    show() {
      image(this.img, this.x, this.y, this.w, this.h);
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