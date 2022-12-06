let btn;
let video;
let capturebutton;
let dialogues = [
  '이봐요 당신.',
  '그래요 저랑 창의 알고리즘 겹강인 ‘김우영’씨.',
  '내가 바보인줄 알아요?','9월부터 제 글 보고있었던거 다 알아요','방문 기록이 뜬다고요 방문기록이!','그래서. 경찰에 신고하게요?','뭐 해보세요.','근데 그거 아세요? 전 생각보다 당신에 대해서 잘 안답니다.','사진 하나 보여드릴게요','하하','ㅋㅋㅋㅋ 신기하죠?','그 지금부터 제가 조언 하나만 할게요(여기부터 두근두근 소리)','움직이지 마세요','잘못 맞으면 서로 피곤해요','한번에 갑시다'
];
let index = -1;

function setup() {
  video = createCapture(VIDEO); //access live webcam
  video.size(100, 100);
  video.hide();
  capturebutton = createButton('Click this first');
  capturebutton.mousePressed(takesnap); //when the button is pressed, call the function called "takesnap"
  createCanvas(400, 400);
  btn = new Button(0, 0, 50, 50);
}

function takesnap() {
  image(video, 0, 0);
}

function draw() {
  background(255);
  btn.show();
  if (btn.click()) {
    index += 1;
  }
  if (index >= 0 && index <=8) {
    read(dialogues[index]);
  }
  if (index == 9) {
    image(video,200,200);
  }
  if (index >=10) {
    read(dialogues[index]);
  }
}

function read(dialogue) {
  fill(0);
  textAlign(CENTER);
  textSize(15);
  text(dialogue, width/2, height/2); // 대사
}