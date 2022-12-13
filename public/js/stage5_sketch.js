let playerScore = 0;
let stage = 0;
let paddle;
let ball;
let bricks;
let gameState;
let index = -1;
let fridge;
let attempt = ["1st", "2nd", "Last"];
let p = 0;
let dialogues = ["휴...",
  "아 소름돋아",
  "지금까지 날 따라다녔다니", "이 변태같은 남자!",
  "유정이를 보낸 것은", "완전범죄라고 생각했는데…",
  "그래도 멋진 남자야 선우는",
  "날 위해서 죽었잖아?",
  "날 위해 뭐든지 할 수 있다고 했으니", "죽는것 정도야 괜찮겠지?",
  "그리고 민아는.. 진짜 좋은 애였는데",
  "그러니까 왜 바보처럼 아는 척을 해?",
  "이래서 충분히 똑똑할거 아니면", "아는척을 하면 안된다니까..!",
  "아, 게임 깨서 비번 알아내려면", "새로고침 하든가 ㅋㅋ",
];

function setup() {
  var canvas = createCanvas(400, 600);
  canvas.parent("sketch-holder");
  let colors = createColors();
  gameState = "playing";
  paddle = new Paddle();
  ball = new Ball(paddle);
  img = loadImage("../img/stage5_ball.png");
  bricks = createBricks(colors);
  fridge = loadImage("../img/staget5_fridge.jpeg");

}

function keyPressed() {
  switch (stage) {
    case 0:
      if (keyCode == ENTER) {
        stage = 1;
      }
      break;

    case 1:
      if (keyCode == ENTER) {
        gameState = "playing";
        let colors = createColors();
        paddle = new Paddle();
        ball = new Ball(paddle);
        img = loadImage("stage5.png");
        bricks = createBricks(colors);
        playerScore = 0;
        p = p + 1;
      }
      break;
    default:
  }
}

function createColors() {
  const colors = [];
  colors.push(color(265, 165, 0));
  colors.push(color(135, 206, 250));
  colors.push(color(147, 112, 219));
  for (let i = 0; i < 10; i++) {
    colors.push(color(random(50, 255), random(50, 255), random(50, 255)));
  }
  return colors;
}

function createBricks(colors) {
  const bricks = [];
  const rows = 4;
  const bricksPerRow = 8;
  const brickWidth = width / bricksPerRow;
  for (let row = 0; row < rows; row++) {
    for (let i = 0; i < bricksPerRow; i++) {
      brick = new Brick(
        createVector(brickWidth * i, 25 * row),
        brickWidth,
        25,
        colors[floor(random(0, colors.length))]
      );
      bricks.push(brick);
    }
  }
  return bricks;
}

function draw() {
  switch (stage) {
    case 0:
      background(50);
      fill(255);
      textSize(30);
      textAlign(CENTER);
      text("Press ENTER to Start!", width / 2, height / 2);
      textSize(20);
      text("Use arrows to move :D", width / 2, height / 2 + 70);
      break;

    case 1:
      if (gameState === "playing") {
        background(0);
        ball.bounceEdge();
        ball.bouncePaddle();
        ball.update();

        if (keyIsDown(LEFT_ARROW)) {
          paddle.move("left");
        } else if (keyIsDown(RIGHT_ARROW)) {
          paddle.move("right");
        }

        for (let i = bricks.length - 1; i >= 0; i--) {
          const brick = bricks[i];
          if (brick.isColliding(ball)) {
            ball.reverse("y");
            bricks.splice(i, 1);
            playerScore += brick.points;
          } else {
            brick.display();
          }
        }

        paddle.display();
        ball.display();

        textSize(15);
        fill(255, 255, 0);
        textAlign(LEFT);

        text(attempt[p] + " Attempt", width - 85, height - 40);
        text(`Score:${playerScore}`, width - 70, height - 20);

        fill(255, 255, 255);
        text("GOAL!", 30, 580);

        textSize(50);
        text("↓", 35, 550);

        if (ball.belowBottom()) {
          gameState = "Lose";
        }

        if (ball.easterEgg()) {
          gameState = "EasterEgg";
        }

        if (bricks.length == 0) {
          gameState = "Win";
        }
      } else {
        textSize(40);
        fill(255, 0, 255);
        fill(255);
        textAlign(CENTER);
        text(`You ${gameState}!!!`, width / 2, height / 2);
        textSize(20);
        if (gameState == "Win") {
            text("다음 글 비밀번호는 9999!",width / 2, height / 2 + 50)
            text("그런데 여기 너무 밝지 않아?",width / 2, height / 2 + 100)
            
          }
        
        if (gameState == "Lose") {
          if (p < 2) {
            text("Press ENTER to Retry", width / 2, height / 2 + 50);
            text(
              "남은 기회는 " + (2 - p) + " 번!",
              width / 2,
              height / 2 + 100
            );
          }

          if (p == 2) {
            textSize(50);
            fill(255, 0, 0);
            text("FOREVER!!", width / 2, height / 2 + 50);
          }
        }
        if (gameState == "EasterEgg") {
          background(0);
          image(fridge, 0,0,400,400);
          fill(255);
          if (index >= -1) {
              read(dialogues[index]);
            }
          textSize(10);
          textAlign(LEFT);
          text("Keep clicking mouse", 30,570)
          }
        }
      }
}

function read(dialogue) {
  fill(255);
  textAlign(CENTER);
  textSize(20);
  text(dialogue, width / 2, height / 2 + 200); // 대사
}

function mouseClicked () {
  index += 1
}