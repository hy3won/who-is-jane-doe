let human_img;
let btn;

let dialogues = [
  '짠! 안녕! 나는 혜영이야!',
  '나 좀 귀엽다! 키키',
  '그럼 안녕!',
  '솔직히 너무 짜증나.',
  '내가 왜 이런걸 해야해?',
  '나도 잘난 사람이고 싶어.',
  '다음은 0516을 입력해',
];
let index = -1;

function preload() {
  // TODO: 여기에 이미지 링크를 넣습니다.
  human_img = loadImage('../img/stage1_졸라맨_1.png');
}

function setup() {
  // TODO: 여기에 화면 크기를 지정합니다.
  var canvas = createCanvas(700, 500);
  canvas.parent("sketch-holder");

  // TODO: 여기에 버튼 위치, 크기를 지정합니다.
  btn = new Button(50, 50, 140, 50);
}

function draw() {
  // 일정 횟수 이상 버튼을 눌렸을 때 배경 바뀌고 버튼 색 바뀜
  if (index >= 2) {
    background(70);
    fill(0);
    rect(50, 50, 140, 50);
    textSize(18);
    fill(255, 0, 0);
    text('누르지마', 190 / 2 - 5, 100 / 2 + 30);
  } else {
    background(235);
    btn.show();
  }

  // index가 바뀌면서 대화들을 넘겨주는 역할
  if (index >= 0) {
    show_man(300, 200, dialogues[index]);
  }

  // 버튼이 클릭되었을 때 행동 정의
  if (btn.click()) {
    index += 1;
  }
}

// 사람 + 말풍선을 보여주는 함수
function show_man(human_x, human_y, dialogue) {
  let length = dialogue.length;
  image(human_img, human_x, human_y, 100, 100); // 졸라맨

  fill(255);
  ellipse(human_x + 180, human_y - 10, 200, 50); // 말풍선

  if (index >= 3) {
    fill(255, 0, 0);
    textSize(15);
    text(dialogue, human_x + 145 - length * 2, human_y - 7);
  } else {
    fill(0);
    textSize(15);
    text(dialogue, human_x + 145 - length * 2, human_y - 7);
  } // 대사
}