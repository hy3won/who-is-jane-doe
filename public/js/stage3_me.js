class Me {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
  
      this.img = loadImage('../img/oldboy.png');
  
      this.isClicked = false;
    }
  
    show() {
      image(this.img, this.x, this.y, this.w, this.h);
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
  }