let img;
let btn;

// TODO: 대화들을 여기에 저장시킵니다.
let dialogues = [
  '짠! 안녕! 나는 혜영이야!',
  '너 좀 귀엽다! 키키',
  '그 다음 대화를 넣어요',
];
let index = -1;

function preload() {
  // TODO: 여기에 이미지 링크를 넣습니다.
  img = loadImage('../img/logo.png');
}

function setup() {
  createCanvas(1000, 500);
  // TODO: 여기에 버튼 위치, 크기를 지정합니다.
  btn = new Button(0, 0, 100, 100);
}

function draw() {
  background(255);
  btn.show();

  // index가 바뀌면서 대화들을 넘겨주는 역할
  if (index >= 0) {
    show_man(150, 200, dialogues[index]);
  }

  // 버튼이 클릭되었을 때 행동 정의
  if (btn.click()) {
    index += 1;
  }
}

// 사람 + 말풍선을 보여주는 함수
function show_man(human_x, human_y, dialogue) {
  let length = dialogue.length;
  image(img, human_x, human_y, 100, 100); // 졸라맨

  fill(255);
  ellipse(human_x + 200, human_y - 50, length * 20, 50); // 말풍선

  fill(0);
  text(dialogue, human_x + 150, human_y - 50); // 대사
}