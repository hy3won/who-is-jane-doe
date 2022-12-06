let playerScore = 0;
let stage = 0;
let paddle;
let ball;
let bricks;
let gameState;

function setup() {
  var canvas = createCanvas(400, 600);
  canvas.parent("sketch-holder");
  let colors = createColors();
  gameState = "playing";
  paddle = new Paddle();
  ball = new Ball(paddle);
  img = loadImage('../img/stage5_ball.png')
  bricks = createBricks(colors);
}

function createColors() {
  const colors = [];
  colors.push(color(265, 165, 0));
  colors.push(color(135, 206, 250));
  colors.push(color(147, 112, 219));
  for (let i = 0; i < 10; i++) {
    colors.push(color(random(0, 255), random(0, 255), random(0, 255)));
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
        text("1st Attempt", width - 85, height - 40);
        text(`Score:${playerScore}`, width - 70, height - 20);

        fill(255, 255, 255);
        text("GOAL!3:0", 20, 580);

        textSize(50);
        text("↓", 35, 550);

        if (ball.belowBottom()) {
          gameState = "Lose";
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
      }
}