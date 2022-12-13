let enemys = [];
let score = 0;

let hammer_img;

let blood_img;
let blood_List = [];

let choi;
let choi_clicked = 0;

// 적 나오는거 컨트롤
let timer = undefined;
// 최승아, 교수님 나오는 적 컨트롤
let new_timer = undefined;

let sound1;
let sound2;
let sound3;

let isStart = false;
let startButton;

const choi_dialogs = [
  '',
  '',
  '교수님은 날 싫어하는게 분명해',
  '솔직히 없어졌으면 좋겠어',
  '왜 승아한테만 잘 해주시지?',
  '승아는 왜 날 불쌍하게 여겨? 내가 불쌍해?',
  '그들도 날 죽이려고 하고 있는게 분명해',
  '내가 먼저 움직여서 나쁠 건 없잖아',
  '그건 정당방위 아니야?',
];

function preload() {
  hammer_img = loadImage('../img/stage3_hammer.png');
  blood_img = loadImage('../img/stage3_blood.png');

  sound1 = loadSound('../assets/망치 1.mp3');
  sound2 = loadSound('../assets/망치 2.mp3');
  sound3 = loadSound('../assets/망치 3.mp3');

  startButton = new Button(150, 150, 100, 50, 'Start');
}

function setup() {
  var canvas = createCanvas(400, 400);
  canvas.parent("sketch-holder");
  choi = new Me(0, 250, 150, 150);
}

function draw() {
  // 게임 시작 전 처리
  if (!isStart) {
    background(220);
    startButton.show();

    if (startButton.click()) {
      isStart = true;

      // 2초마다 적을 추가
      timer = setInterval(plus_enemy, 2000);
    }
    return;
  }

  textSize(14);
  noCursor();

  // 최민식을 두번 클릭했을 때 정의
  if (choi_clicked >= 2) {
    // 적 나오는거 일시 중지
    if (timer) {
      clearInterval(timer);
      timer = null;
    }

    // 최승아, 교수님 적이 나옴
    if (!new_timer) {
      new_timer = setInterval(plus_hidden_enemy, 2000);
      choi.changeImage();
    }

    background(150);
    fill(255, 0, 0);
    text(choi_dialogs[choi_clicked], 30, 200);
    fill(0);
  } else {
    background(220);
  }

  // 클리어 했을 때 처리
  if (score >= 10) {
    // 적 나오는거 일시 중지
    if (timer) {
      clearInterval(timer);
      timer = null;
    }

    text('충분히 죽였어. 다음은 1010을 입력해.', 30, 100);
  }

  // 최민식을 보여줌
  choi.show();

  // 최민식을 클릭했을 때
  if (choi.click()) {
    blood_plus(mouseX, mouseY, true);
    choi_clicked += 1;
  }

  // 상단 점수 보여주는 텍스트
  text('죽인 인간 : ' + score, 300, 50);

  // 적을 보여주는 루프
  for (let i = 0; i < enemys.length; i++) {
    enemys[i].show();
  }

  // 적을 매 프레임마다 이동 시킴
  for (let i = 0; i < enemys.length; i++) {
    enemys[i].move(-3, 0);
  }

  // 적을 클릭했을 때 적을 지우고 점수를 올림
  for (let i = 0; i < enemys.length; i++) {
    if (enemys[i].click()) {
      blood_plus(mouseX, mouseY, false);
      setTimeout(() => blood_List.shift(), 3000);

      score += 1;
      enemys[i].cought();
    }
  }

  // 마우스에 따라다니는 망치
  image(hammer_img, mouseX - 20, mouseY, 50, 50);

  // 핏자국
  for (let i = 0; i < blood_List.length; i++) {
    if (blood_List[i].isChoi) {
      image(blood_img, blood_List[i].x, blood_List[i].y, 200, 200);
    } else {
      image(blood_img, blood_List[i].x, blood_List[i].y, 100, 100);
    }
  }
}

// 적을 하나씩 추가 함
function plus_enemy() {
  enemys.push(new Enemy(400, 260, 130, 150, false));
}

// 교수님과 최유정을 추가함
function plus_hidden_enemy() {
  enemys.push(new Enemy(400, 300, 130, 150, true));
}

// 피를 추가함
function blood_plus(mouseX, mouseY, isChoi) {
  let random = Math.random();
  let sound = random < 0.33 ? sound1 : random < 0.66 ? sound2 : sound3;
  sound.play();

  blood_List.push({ x: mouseX, y: mouseY, isChoi });
}