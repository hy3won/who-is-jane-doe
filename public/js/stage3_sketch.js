let enemys = [];
let score = 0;

let hammer_img;

let choi;
let choi_clicked = 0;

function preload() {
  hammer_img = loadImage('../img/stage3_hammer.png');
}

function setup() {
  var canvas = createCanvas(400, 400);
  canvas.parent("sketch-holder")
  
  choi = new Me(0, 250, 100, 100);

  // 3초마다 적을 추가하는 코드
  setInterval(plus_enemy, 3000);
}

function draw() {
  // 최민식을 두번 클릭했을 때 정의
  if (choi_clicked >= 2) {
    background(150);
  } else {
    background(220);
  }

  // 최민식을 보여줌
  choi.show();

  // 최민식을 클릭했을 때
  if (choi.click()) {
    choi_clicked += 1;
  }

  // 상단 점수 보여주는 텍스트
  text('죽인 횟수 : ' + score, 300, 50);

  // 적을 보여주는 루프
  for (let i = 0; i < enemys.length; i++) {
    enemys[i].show();
  }

  for (let i = 0; i < enemys.length; i++) {
    enemys[i].move(-1.5, 0);
  }

  // 적을 클릭했을 때 적을 지우고 점수를 올림
  for (let i = 0; i < enemys.length; i++) {
    if (enemys[i].click()) {
      score += 1;
      enemys[i].cought();
    }
  }

  // 마우스에 따라다니는 망치
  image(hammer_img, mouseX - 20, mouseY, 50, 50);
}

// 적을 하나씩 추가 함
function plus_enemy() {
  enemys.push(new Enemy(400, 300, 100, 100));
}