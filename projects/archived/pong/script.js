// VARIABLES
// Highscore
let highscore = 10;
let highscoreName = "Pigeon Pigeon";
// Sprites and Images
let sprLeftPaddle, sprRightPaddle, sprBall,
    imgLeftPaddle, imgRightPaddle, imgBall;
// Variables
let score = 0, randomNum;
let [gameStart, gameOver] = [false, false];

// Send Highscore Values
document.getElementById("highscore").innerHTML = "Highscore: " + highscore;
document.getElementById("highscore-name").innerHTML =
    "Set by: " + highscoreName;

function preload(){
    imgLeftPaddle = loadImage("Images/left-paddle.png");
    imgRightPaddle = loadImage("Images/right-paddle.png");
    imgBall = loadImage("Images/ball.png");
}

function setup(){
    textAlign(CENTER);
    
    let gameCanvas = createCanvas(820, 450);
    gameCanvas.parent("main-section");

    sprLeftPaddle = createSprite(25, 225);
    sprLeftPaddle.addImage(imgLeftPaddle);
    sprRightPaddle = createSprite(795, 225);
    sprRightPaddle.addImage(imgRightPaddle);
    sprBall = createSprite(410, 225);
    sprBall.addImage(imgBall);

    sprBall.velocity.x = 5;
    if(random() > 0.5){
        randomNum = -3;
    }else{
        randomNum = 3;
    }
    sprBall.velocity.y = randomNum;
    sprBall.setCollider("circle", 0, 0, 15);
    sprBall.maxSpeed = 10;
}

function draw(){
    // BACKGROUND
    background(32);
    if(gameStart){
        // SCORE
        textSize(100);
        textStyle(BOLD);
        fill(64);
        text(score, 375, 100);
    
        // PADDLE MOVEMENT
        // Left Paddle
        if(sprBall.position.y < sprLeftPaddle.position.y){
            sprLeftPaddle.position.y -= 3;
        }else if(sprBall.position.y > sprLeftPaddle.position.y){
            sprLeftPaddle.position.y += 3;
        }
        // Right Paddle
        if(keyIsDown(87)){
            sprRightPaddle.position.y -= 4;
        }else if(keyIsDown(83)){
            sprRightPaddle.position.y += 4;
        }

        // BALL COLLISIONS
        // Paddles
        if(sprBall.collide(sprLeftPaddle) || sprBall.collide(sprRightPaddle)){
            sprBall.velocity.x = sprBall.velocity.x * -1.1
        }
        // Top and Bottom
        if(sprBall.position.y >= 435 || sprBall.position.y <= 15){
            sprBall.velocity.y = sprBall.velocity.y * -1.1
        }
        // Sides
        if(sprBall.position.x <= 15){
            sprBall.velocity.x = sprBall.velocity.x * -1.1
            score += 1;
        }else if(sprBall.position.x >= 805){
            displayScore();
            document.getElementById("your-score").innerHTML =
                "Your Score: " + score;
            if(score > highscore){
                document.getElementById("beat-highscore").innerHTML =
                    "You beat the highscore! Send a screenshot!";
            }else{
                document.getElementById("beat-highscore").innerHTML =
                    "You didn't beat the highscore. :(";
            }
            document.getElementById("play-again").innerHTML =
                    "Reload the page to play again.";
            throw new Error("Error");
        }
        if(sprBall.position.y < 0 || sprBall.position.y > 450){
            displayScore();
            document.getElementById("your-score").innerHTML =
                    "Sorry! The game didn't finish!";
            document.getElementById("beat-highscore").innerHTML =
                    "There was a problem.";
            document.getElementById("play-again").innerHTML =
                    "Reload the page to play again.";
            throw new Error("Error");
        }
    
        // DRAW SPRITES
        drawSprites();
    }else{
        sprBall.position.x = 410;
        sprBall.position.y = 225;

        textSize(75);
        fill(64);
        text("Press ENTER to begin.", 410, 225);

        if(keyIsDown(13)){
            gameStart = true;
        }
    }
}

function displayScore(){
    fill(32);
    rect(0, 0, 820, 450);
    fill(33, 209, 33);
    textSize(75);
    text("Your Score: " + score, 410, 225);
}
