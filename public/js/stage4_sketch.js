let bugs = [];
let score = 0;
let stage = 0;
let img;
let hand;
let blood;
let xoff = 0;
let yoff = 0;
let hitsound;
let timer = 15;
let index = -1;
let mixer;
let dialogues = [
  "최유정 그냥 죽여버렸어.",
  "장도리로 머리통을 부숴버렸어. 그냥.",
  "살은 냉동실에 넣어 두고",
  "뼈는 갈아서 하수구에 버렸어",
  "아주 개운해",
  "믹서기는 뭐가 끼었는지 고장나서 버렸지만…",
  "하여튼 이제 새로운 인생 시작이다..!",
  "게임 깨서 비번 알아내려면",
  "새로고침 하든가 ㅋㅋ",
];

function preload() {
  hand = loadImage("../img/stage4_hand.png");
  blood = loadImage("../img/stage4_blood.png");
}

function setup() {
  var canvas = createCanvas(400, 400);
  canvas.parent("sketch-holder");
  img = loadImage("../img/stage4_mosq.gif");
  bugs[0] = new Mosq(100, 300, 0.006, -0.01, 0, 0);
  bugs[1] = new Mosq(100, 50, 0.007, 0.02, 50, 10);
  bugs[2] = new Mosq(50, 200, 0.007, -0.02, 30, 40);
  bugs[3] = new Mosq(250, 200, 0.02, 0.01, 20, 30);
  bugs[4] = new Mosq(150, 300, 0.015, 0.01, 100, 20);

  soundFormats("mp3");
  hitsound = loadSound("../assets/hit_2.mp3");
  mixer = loadImage("../img/stage4_mixer.gif");
}

function draw() {
  switch (stage) {
    case 0:
      background(50);
      fill(255);
      textSize(30);
      textAlign(CENTER);
      text("Press ENTER to Start!", width / 2, height / 2);
      break;
    case 1:
      background(50);
      for (let i = 0; i < bugs.length; i++) {
        bugs[i].show();
        bugs[i].move();
        if (bugs[i].click()) {
          score = score + 1;
          bugs[i].caught();
        }
      }
      fill(220);
      textAlign(CENTER);
      textSize(15);
      text("죽인 횟수 : " + score, 330, 50);
      text("남은 시간 : " + timer + "초", 70, 50);
      if (frameCount % 60 == 0 && timer > 0) {
        timer--;
      }
      if (score >= 5) {
        text("You Won! :D", width / 2, height / 2);
        text("다음 글 비밀번호는 9998!", width / 2, height / 2 + 50);
      }
      image(hand, mouseX - 20, mouseY - 20, 50, 50);

      if (timer == 0 && score < 5) {
        background(0);
        image(mixer, width / 2 - 75, 50, 150, 200);
        if (index >= -1) {
          read(dialogues[index]);
          textAlign(CENTER);
          textSize(10);
          text("Keep clicking mouse", 200, 300);
        }
      }
  }
}

function keyPressed() {
  switch (stage) {
    case 0:
      if (keyCode == ENTER) {
        stage = 1;
      }
      break;
    default:
  }
}

function mouseClicked() {
  if (timer > 0 && score <= 5) {
    hitsound.play();
  } else {
    index += 1;
  }
}

function read(dialogue) {
  fill(255);
  textAlign(CENTER);
  textSize(20);
  text(dialogue, width / 2, height - 50); // 대사
}

class Mosq {
  constructor(x, y, n, m, xoff, yoff) {
    this.x = x;
    this.y = y;
    this.n = n;
    this.m = m;
    this.xoff = xoff;
    this.yoff = yoff;
    this.isClicked = false;
  }

  show() {
    for (let t = 0; t < 2; t++) {
      if (t < 2) {
        t++;
      } else {
        t = 0;
      }
      image(img, this.x, this.y, 40, 40);
    }
    if (this.n == 0) {
      image(blood, this.x - 20, this.y - 20, 80, 80);
    }
  }

  move() {
    this.xoff = this.xoff + this.n;
    this.yoff = this.yoff + this.m;
    this.x = noise(this.xoff) * width;
    this.y = noise(this.yoff) * height;
  }

  click() {
    if (
      this.x - 20 < mouseX &&
      mouseX < this.x + 20 &&
      this.y - 20 < mouseY &&
      mouseY < this.y + 20
    ) {
      if (this.n != 0){
        if (mouseIsPressed){
          if (!this.isClicked) {
            this.isClicked = true;
            return true;
          } else {
            return false;
          }
        }
      }
    }

    this.isClicked = false;
    return false;
  }

  caught() {
    this.n = 0;
    this.m = 0;
  }
}