// VARIABLES
// Sprites and Images
let sprWater, sprRoad, sprLand, sprMud;
let sprButton, sprSpikes, sprFinishLine, sprCar;
let allBackground, backgroundSprite;
let imgWater, imgRoad, imgLand, imgMud;
let imgSpikes, imgNoSpikes, imgFinishLine, imgCar;
// Speed and Time
let fakeSpeed = 400, realSpeed, speedPct;
let secs, mins;
let [time, stopwatchTime] = [0, "0:00.00"];
let recordTime = 3350;
let recordStopwatchTime = "0:49.87";
let recordName = "River";
// Cooldowns
let [spikeCooldown, mudCooldown, buttonCooldown] = [0, 0, 0];
// Broken Things
let brokenEngine = false, brokenTireDirection;
// Other
let i, carY, carX;

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
    imgWater = loadImage("Images/background-water.png");
    imgRoad = loadImage("Images/background-road.png");
    imgLand = loadImage("Images/background-land.png");
    imgMud = loadImage("Images/background-mud.png");
    imgButton = loadImage("Images/background-button.png");
    imgSpikes = loadImage("Images/background-spikes.png");
    imgNoSpikes = loadImage("Images/background-blank.png");
    imgFinishLine = loadImage("Images/background-finish-line.png");
    imgCar = loadImage("Images/car.png");
}

function setup(){
    createCanvas(700, 500);
    angleMode(DEGREES);
    textAlign(CENTER);

    sprWater = createSprite(1345, 754);
    sprWater.addImage(imgWater);
    sprRoad = createSprite(1345, 754);
    sprRoad.addImage(imgRoad);
    sprLand = createSprite(1345, 754);
    sprLand.addImage(imgLand);
    sprMud = createSprite(1345, 754);
    sprMud.addImage(imgMud);
    sprButton = createSprite(1345, 754);
    sprButton.addImage(imgButton);
    sprSpikes = createSprite(1345, 754);
    sprSpikes.addImage("spikes", imgSpikes);
    sprSpikes.addImage("empty", imgNoSpikes);
    sprFinishLine = createSprite(1345, 754);
    sprFinishLine.addImage(imgFinishLine);

    sprCar = createSprite(250, 250);
    sprCar.addImage(imgCar);

    allBackground = new Group();
    allBackground.push(sprWater, sprRoad, sprLand, sprMud,
                       sprButton, sprSpikes, sprFinishLine);
}

function draw(){
    // BACKGROUND
    background(21, 101, 192);

    // COOLDOWNS
    if(spikeCooldown > 0){
        spikeCooldown -= 1;
    }
    if(mudCooldown > 0){
        mudCooldown -= 1;
    }
    if(buttonCooldown > 0){
        buttonCooldown -= 1;
    }

    // WINNING
    carX = sprCar.position.x;
    carY = sprCar.position.y;
    if(sprFinishLine.overlapPixel(carX, carY)){
        gameOver("win");
    }

    // SPEED
    if(keyIsDown(38) || keyIsDown(87)){
        fakeSpeed += 6;
    }else if(keyIsDown(40) || keyIsDown(83)){
        fakeSpeed -= 8;
    }
    if(fakeSpeed >= 1000){
        fakeSpeed = 900;
        brokenEngine = true;
    }else if(fakeSpeed < 0){
        fakeSpeed = 0;
    }
    if(brokenEngine){
        fakeSpeed -= 3;
    }
    if(! sprRoad.overlapPixel(carX, carY)){
        if(sprLand.overlapPixel(carX, carY)){
            fakeSpeed -= 2;
        }else if(sprWater.overlapPixel(carX, carY)
        && ! sprMud.overlapPixel(carX, carY)){
            gameOver("lose");
        }
    }
    realSpeed = Math.round(fakeSpeed / 200);
    
    // TURNING
    if(keyIsDown(37) || keyIsDown(65)){
        sprCar.rotation -= 3;
    }else if(keyIsDown(39) || keyIsDown(68)){
        sprCar.rotation += 3;
    }
    if(spikeCooldown > 0){
        sprCar.rotation += 6 * brokenTireDirection;
    }
    if(mudCooldown > 0){
        if(Math.random() < 0.5){
            sprCar.rotation += 2;
        }else{
            sprCar.rotation -= 2;
        }
    }

    // MOVEMENT
    for(i = 0; i < allBackground.length; i++){
        backgroundSprite = allBackground[i];
        backgroundSprite.setSpeed(-realSpeed, sprCar.rotation);
    }

    // SPIKES, MUD, and BUTTON
    if(sprButton.overlapPixel(carX, carY)){
        buttonCooldown = 360;
    }else if(sprMud.overlapPixel(carX, carY)){
        mudCooldown = 60;
    }else if(sprSpikes.overlapPixel(carX, carY)){
        if(Math.random() < 0.5){
            brokenTireDirection = -1;
        }else{
            brokenTireDirection = 1;
        }
        spikeCooldown = 60;
    }
    if(buttonCooldown > 0){
        sprSpikes.changeImage("empty");
    }else{
        sprSpikes.changeImage("spikes");
    }
    

    // TIME and STOPWATCH
    time += 1;
    secs = time / 60;
    mins = Math.floor(secs / 60);
    secs -= mins * 60;
    secs = secs.toFixed(2);
    if(secs < 10){
        secs = "0" + secs;
    }
    stopwatchTime = mins + ":" + secs;

    // DRAW SPRITES
    drawSprites();
    
    // STATS BOX
    noStroke();
    fill(0);
    rect(500, 0, 200, 500);
    fill(0, 204, 0);
    textSize(25);
    // Titles
    text("Time", 600, 30);
    text("Speed", 600, 120);
    // Stopwatch
    textSize(45);
    text(stopwatchTime, 600, 75);
    // Speed Bar
    stroke(200, 50, 50);
    strokeWeight(5);
    line(510, 150, 620, 150);
    noStroke();
    speedPct = fakeSpeed / 1000;
    fill(0 + speedPct * 255, 255 - speedPct * 255, 0);
    rect(520, 350 - speedPct * 200, 90, speedPct * 200);
    // Engine Warning
    if(brokenEngine){
        textSize(20);
        fill(200, 0, 0);
        text("Engine\nFailure", 650, 175);
    }
    if(spikeCooldown > 0){
        textSize(20);
        fill(200, 0, 0);
        text("Broken\nTires", 650, 235);
    }
    if(mudCooldown > 0){
        textSize(20);
        fill(165, 42, 42);
        text("Muddy\nTires", 650, 295);
    }
}

function gameOver(result){
    textFont("Papyrus");
    if(result == "lose"){
        fill(128, 0, 0);
        rect(0, 0, 700, 500);
        fill(0);
        textSize(100);
        text("Game Over", 350, 130);
        textSize(50);
        text("You fell into the water.", 350, 200);
        text("Your time: "+stopwatchTime, 350, 270);
        text("Better luck next time.", 350, 340);
    }else{
        fill(0, 128, 0);
        rect(0, 0, 700, 500);
        fill(0);
        textSize(100);
        text("You Win!!", 350, 130);
        textSize(50);
        text("Your time: " + stopwatchTime, 350, 200);
        text("Record time: " + recordStopwatchTime, 350, 270);
        text("Set by: " + recordName, 350, 340);
        if(time < recordTime){
            text("You beat the record!!\nSend a screenshot!", 350, 410);
        }else{
            text("You didn't beat the record. :(\nBetter luck next time!",
                 350, 410);
        }
    }
    throw new Error("Error");
}
