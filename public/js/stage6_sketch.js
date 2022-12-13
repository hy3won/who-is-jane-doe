let btn;
let video;
let ghost;
let dialogues = [
  "내가 바보인줄 알아요?",
  "9월부터 제 글 보고있었던거 다 알아요",
  "방문 기록이 뜬다고요 방문기록이!",
  "그래서. 경찰에 신고하게요?",
  "뭐 해보세요.",
  "근데 그거 아세요?",
  "전 생각보다 당신에 대해서 잘 안답니다.",
  "사진 하나 보여드릴게요",
  "ㅋㅋㅋㅋ 신기하죠?",
  "그 지금부터 제가 조언 하나만 할게요",
  "움직이지 마세요",
  "잘못 맞으면 서로 피곤해요",
  "한번에 갑시다",
  "",
];
let index = -1;
let BGM;
let hitsound;
let stage = 0;
let pg;

function setup() {
  video = createCapture(VIDEO); //access live webcam
  video.size(windowWidth, windowHeight);
  video.hide();
  createCanvas(windowWidth, windowHeight);
  btn = new Button(0, 0, 50, 50);
  soundFormats("mp3");
  BGM = loadSound("../assets/beat.mp3");
  hitsound = loadSound("../assets/hammer3.mp3");
  ghost = loadImage("../img/ghost.png");
  pg = createGraphics(width, height);

}

function mouseClicked() {
  if (index == 10) {
    stage += 1;
  }
  if (index == 11) {
    stage -= 2;
  }
  if (index == 13){
    BGM.play();
  }
  if (index == 16) {
    BGM.stop();
    hitsound.play();
  }
}

function draw() {
  if (stage == 0) {
    draw_first_stage();
  } else if (stage == 1) {
    draw_capture();
  } else {
    draw_captured();
  }
}

function draw_first_stage() {
  background(50);
  btn.show();
  if (btn.click()) {
    index += 1;
  }
  if (index >= 0 && index < 10) {
    read(dialogues[index]);
  }
  /*if (index == 10) {
    imageMode(CENTER);
    image(video, width / 2, height / 2, height * 1.5, height);
    imageMode(CORNER);
    image(ghost, (windowWidth * 3) / 4, 0, windowWidth / 2, windowHeight / 2);
  }
  */
  if (index > 10) {
    read(dialogues[index]);
  }
  if (index == 16) {
    background(0);
  }
}

function draw_capture() { //stage 1
  if (video.loadedmetadata) {
    let c = video.get(0, 0, width, height);
    pg.image(c, 0, 0, width, (width * video.height) / video.width);
    stage += 1;
  }
  pg.image(video, 0, 0, width, (width * video.height) / video.width);
}

function draw_captured() { //stage 2
  pg.filter(GRAY);
  image(pg, 0, 0);
  imageMode(CORNERS)
  image(ghost,width,0,width*2/3,height/3);
  btn.show();
  if (btn.click()) {
    index += 1;
  }
}

function read(dialogue) {
  fill(255);
  textAlign(CENTER);
  textSize(20);
  text(dialogue, width / 2, height / 2); // 대사
}

class Button {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.title = "Keep Clicking";
    this.isClicked = false;
  }

  show() {
    if (this.over()) {
      fill(255, 255, 0);
    } else {
      fill(255);
    }
    rect(this.x, this.y, this.w, this.h);
    fill(0);
    textSize(9);
    textAlign(CENTER);
    text(this.title, this.x + this.w / 2, this.y + this.h / 2);
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
}