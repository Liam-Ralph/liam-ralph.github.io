let sprCar, sprBackground, sprLand, sprWater, sprFinishLine, sprWalls;
let stopwatch = 0, stopwatchTime;
let record = "0:21.37", recordHolder = "Kiona";
let speed;
let imgCar, imgBackground, imgLand, imgWater;
let imgFinishLine, imgWalls;

// CHECK RENDERING ENGINE
if(/Gecko/.test(navigator.userAgent)){
    alert(
        "It appears you are using Firefox,\n" +
        "or another browser with the Gecko rendering engine.\n" +
        "this website may run slowly properly due to problems\n" +
        "with how Gecko renders p5.js canvases. As a Firefox\n" +
        "user myself, I understand your frustration."
    )
}

function preload(){
    angleMode(DEGREES);
    imgCar = loadImage("Images/car.png");
    imgBackground = loadImage("Images/background.png");
    imgLand = loadImage("Images/background-land.png");
    imgWater = loadImage("Images/background-water.png");
    imgFinishLine = loadImage("Images/background-finish-line.png");
    imgWalls = loadImage("Images/background-walls.png");
}

function setup(){
    createCanvas(1000, 750);
    sprBackground = createSprite(2500, 1500);
    sprBackground.addImage(imgBackground);
    sprLand = createSprite(2500, 1500);
    sprLand.addImage(imgLand);
    sprWater = createSprite(2500, 1500);
    sprWater.addImage(imgWater);
    sprFinishLine = createSprite(2500, 1500);
    sprFinishLine.addImage(imgFinishLine);
    sprCar = createSprite(200, 325);
    sprCar.addImage(imgCar);
    sprWalls = createSprite(2500, 1500);
    sprWalls.addImage(imgWalls);
}

function draw(){
    // Timer
    stopwatch += 1;
    // Speed Calculation and Crash Detection
    if(sprWalls.overlapPixel(sprCar.position.x, sprCar.position.y)){
        endSetup();
        carCrashed();
    }else if(sprFinishLine.overlapPixel(sprCar.position.x, sprCar.position.y)){
        endSetup();
        win();
    }else if(sprWater.overlapPixel(sprCar.position.x, sprCar.position.y)){
        speed = -2;
    }else if(sprLand.overlapPixel(sprCar.position.x, sprCar.position.y)){
        speed = -4;
    }else{
        speed = -10;
    }
    // Turning
    if(keyIsDown(37)){
        sprCar.rotation -= 3;
    }else if(keyIsDown(39)){
        sprCar.rotation += 3;
    }
    // Movement
    direction = sprCar.rotation;
    sprBackground.setSpeed(speed, direction);
    sprLand.setSpeed(speed, direction);
    sprWater.setSpeed(speed, direction);
    sprFinishLine.setSpeed(speed, direction);
    sprWalls.setSpeed(speed, direction);
    // Draw Sprites
    background("white");
    drawSprites();
}

function endSetup(){
    // General Setup
    noStroke();
    textAlign(CENTER);
    // Stopwatch Calculation
    secondsTotal = stopwatch / 60;
    mins = Math.floor(secondsTotal / 60);
    seconds = secondsTotal - mins*60;
    seconds = seconds.toFixed(2);
    stopwatchTime = mins + ":" + seconds;
}

function carCrashed(){
    fill(128, 0, 0);
    rect(0, 0, 1000, 750);
    fill(0);
    textSize(150);
    text("Game Over", 500, 200);
    textSize(75);
    text("You ran into a wall.", 500, 350);
    text("Your time: "+stopwatchTime, 500, 450);
    throw new Error("ERROR");
}

function win(){
    fill(0, 128, 0);
    rect(0, 0, 1000, 750);
    fill(0);
    textSize(150);
    text("You WIN!!", 500, 200);
    textSize(75);
    text("Your Time: "+stopwatchTime, 500, 350);
    text("Current Record: "+record, 500, 450);
    textSize(50);
    text("Set by: "+recordHolder, 500, 520);
    text("Beat this time? Screenshot and message me!", 500, 590);
    throw new Error("ERROR");
}
