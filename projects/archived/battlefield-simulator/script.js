// ENVIRONMENT SPRITES
let sprBackground, sprWater, sprWallShort1, sprWallShort2;
let sprWallLong1, sprWallLong2, sprWallLong3, sprWallLong4;
let sprLeftBarrier, sprRightBarrier, sprBottomBarrier, sprTopBarrier;
// GAME SPRITES
// Red Bullets
let sprRBullet1, sprRBullet2, sprRBullet3, sprRBullet4, sprRBullet5;
let sprRBullet6, sprRBullet7, sprRBullet8, sprRBullet9, sprRBullet10;
let sprRBullet11, sprRBullet12, sprRBullet13, sprRBullet14, sprRBullet15;
let sprRBullet16, sprRBullet17, sprRBullet18, sprRBullet19, sprRBullet20;
let sprRBullet21, sprRBullet22, sprRBullet23, sprRBullet24, sprRBullet25;
let sprRBullet26, sprRBullet27, sprRBullet28, sprRBullet29, sprRBullet30;
let sprRBullet31, sprRBullet32, sprRBullet33, sprRBullet34, sprRBullet35;
let sprRBullet36, sprRBullet37, sprRBullet38, sprRBullet39, sprRBullet40;
let sprRBullet41, sprRBullet42, sprRBullet43, sprRBullet44, sprRBullet45;
let sprRBullet46, sprRBullet47, sprRBullet48, sprRBullet49, sprRBullet50;
// Red Soldiers
let sprRSoldier1, sprRSoldier2, sprRSoldier3, sprRSoldier4, sprRSoldier5;
let sprRSoldier6, sprRSoldier7, sprRSoldier8, sprRSoldier9, sprRSoldier10;
let sprRSoldier11, sprRSoldier12, sprRSoldier13, sprRSoldier14, sprRSoldier15;
let sprRSoldier16, sprRSoldier17, sprRSoldier18, sprRSoldier19, sprRSoldier20;
// Red Tower Bullets
let sprRTBullet1, sprRTBullet2, sprRTBullet3, sprRTBullet4, sprRTBullet5;
let sprRTBullet6, sprRTBullet7, sprRTBullet8, sprRTBullet9, sprRTBullet10;
// Red Towers
let sprRTower1, sprRTower2;
// Blue Bullets
let sprBBullet1, sprBBullet2, sprBBullet3, sprBBullet4, sprBBullet5;
let sprBBullet6, sprBBullet7, sprBBullet8, sprBBullet9, sprBBullet10;
let sprBBullet11, sprBBullet12, sprBBullet13, sprBBullet14, sprBBullet15;
let sprBBullet16, sprBBullet17, sprBBullet18, sprBBullet19, sprBBullet20;
let sprBBullet21, sprBBullet22, sprBBullet23, sprBBullet24, sprBBullet25;
let sprBBullet26, sprBBullet27, sprBBullet28, sprBBullet29, sprBBullet30;
let sprBBullet31, sprBBullet32, sprBBullet33, sprBBullet34, sprBBullet35;
let sprBBullet36, sprBBullet37, sprBBullet38, sprBBullet39, sprBBullet40;
let sprBBullet41, sprBBullet42, sprBBullet43, sprBBullet44, sprBBullet45;
let sprBBullet46, sprBBullet47, sprBBullet48, sprBBullet49, sprBBullet50;
// Blue Soldiers
let sprBSoldier1, sprBSoldier2, sprBSoldier3, sprBSoldier4, sprBSoldier5;
let sprBSoldier6, sprBSoldier7, sprBSoldier8, sprBSoldier9, sprBSoldier10;
let sprBSoldier11, sprBSoldier12, sprBSoldier13, sprBSoldier14, sprBSoldier15;
let sprBSoldier16, sprBSoldier17, sprBSoldier18, sprBSoldier19, sprBSoldier20;
// Blue Tower Bullets
let sprBTBullet1, sprBTBullet2, sprBTBullet3, sprBTBullet4, sprBTBullet5;
let sprBTBullet6, sprBTBullet7, sprBTBullet8, sprBTBullet9, sprBTBullet10;
// Blue Towers
let sprBTower1, sprBTower2;
// IMAGES
let imgSideBarrier, imgTopBarrier, imgBackground1, imgBackground2;
let imgWater1, imgWater2, imgWallShort, imgWallLong;
let imgRedSoldier, imgRedTower, imgBlueSoldier, imgBlueTower;
let imgBullet, imgTowerBullet;
// VARIABLES
// Command and Availability Variables
let shortWalls = false, longWalls = false;
let sideBridges = false, blockBullets = false;
let shortWallsState = " (OFF)", longWallsState = " (OFF)";
let sideBridgesState = " (OFF)", blockBulletsState = " (OFF)";
let availabilityStats = false;
let commandCooldown = 0;
// Stat Variables
let aRedBullets, aRedSoldiers, aRedTowerBullets, aRedTowers;
let aBlueBullets, aBlueSoldiers, aBlueTowerBullets, aBlueTowers;
let redPoints = 0, redSolKills = 0, redTowKills = 0, redDmg = 0;
let redSolMiss = 0, redSolHit = 0, redTowMiss = 0, redTowHit = 0;
let redSolAccuracy, redTowAccuracy;
let bluePoints = 0, blueSolKills = 0;
let blueTowKills = 0, blueDmg = 0;
let blueSolMiss = 0, blueSolHit = 0, blueTowMiss = 0, blueTowHit = 0;
let blueSolAccuracy, blueTowAccuracy;
// Lists
let redTargetList = [];
let blueTargetList = [];
// Groups
let allBarriers, allWalls, allArmy, allNonBullet;
let allRed, allRedBullets, allRedSoldiers, allRedTowerBullets, allRedTowers;
let allBlue, allBlueBullets, allBlueSoldiers;
let allBlueTowerBullets, allBlueTowers;
// Loop Variables
let i, x;
let target, possibleTarget, bullet, possibleBullet, wall, barrier;
let armySprite, nonBulletSprite;
let redBullet, redSoldier, redTowerBullet, redTower;
let blueBullet, blueSoldier, blueTowerBullet, blueTower;

function preload(){
    // Barriers
    imgSideBarrier = loadImage("Images/side-barrier.png");
    imgTopBarrier = loadImage("Images/top-barrier.png");
    // Background
    imgBackground1 = loadImage("Images/background-1.png");
    imgBackground2 = loadImage("Images/background-2.png");
    // Water
    imgWater1 = loadImage("Images/water-1.png");
    imgWater2 = loadImage("Images/water-2.png");
    // Walls
    imgWallShort = loadImage("Images/wall-short.png");
    imgWallLong = loadImage("Images/wall-long.png");
    // Red
    imgRedSoldier = loadImage("Images/red-soldier.png");
    imgRedTower = loadImage("Images/red-tower.png");
    // Blue
    imgBlueSoldier = loadImage("Images/blue-soldier.png");
    imgBlueTower = loadImage("Images/blue-tower.png");
    // Bullets
    imgBullet = loadImage("Images/bullet.png");
    imgTowerBullet = loadImage("Images/tower-bullet.png");
}

function setup(){
    createCanvas(900, 650);
    angleMode(DEGREES);
    rectMode(CENTER);
    // Background
    sprBackground = createSprite(450, 250);
    sprBackground.addImage("1", imgBackground1);
    sprBackground.addImage("2", imgBackground2);
    // Water
    sprWater = createSprite(450, 250);
    sprWater.addImage("1", imgWater1);
    sprWater.addImage("2", imgWater2);
    // Red Towers
    sprRTower1 = createSprite(-1000, 1000);
    sprRTower2 = createSprite(-1000, 1000);
    // Blue Towers
    sprBTower1 = createSprite(1500, 1500);
    sprBTower2 = createSprite(1500, 1500);
    // Red Soldiers
    sprRSoldier1 = createSprite(-1000, 1000);
    sprRSoldier2 = createSprite(-1000, 1000);
    sprRSoldier3 = createSprite(-1000, 1000);
    sprRSoldier4 = createSprite(-1000, 1000);
    sprRSoldier5 = createSprite(-1000, 1000);
    sprRSoldier6 = createSprite(-1000, 1000);
    sprRSoldier7 = createSprite(-1000, 1000);
    sprRSoldier8 = createSprite(-1000, 1000);
    sprRSoldier9 = createSprite(-1000, 1000);
    sprRSoldier10 = createSprite(-1000, 1000);
    sprRSoldier11 = createSprite(-1000, 1000);
    sprRSoldier12 = createSprite(-1000, 1000);
    sprRSoldier13 = createSprite(-1000, 1000);
    sprRSoldier14 = createSprite(-1000, 1000);
    sprRSoldier15 = createSprite(-1000, 1000);
    sprRSoldier16 = createSprite(-1000, 1000);
    sprRSoldier17 = createSprite(-1000, 1000);
    sprRSoldier18 = createSprite(-1000, 1000);
    sprRSoldier19 = createSprite(-1000, 1000);
    sprRSoldier20 = createSprite(-1000, 1000);
    // Blue Soldiers
    sprBSoldier1 = createSprite(1500, 1500);
    sprBSoldier2 = createSprite(1500, 1500);
    sprBSoldier3 = createSprite(1500, 1500);
    sprBSoldier4 = createSprite(1500, 1500);
    sprBSoldier5 = createSprite(1500, 1500);
    sprBSoldier6 = createSprite(1500, 1500);
    sprBSoldier7 = createSprite(1500, 1500);
    sprBSoldier8 = createSprite(1500, 1500);
    sprBSoldier9 = createSprite(1500, 1500);
    sprBSoldier10 = createSprite(1500, 1500);
    sprBSoldier11 = createSprite(1500, 1500);
    sprBSoldier12 = createSprite(1500, 1500);
    sprBSoldier13 = createSprite(1500, 1500);
    sprBSoldier14 = createSprite(1500, 1500);
    sprBSoldier15 = createSprite(1500, 1500);
    sprBSoldier16 = createSprite(1500, 1500);
    sprBSoldier17 = createSprite(1500, 1500);
    sprBSoldier18 = createSprite(1500, 1500);
    sprBSoldier19 = createSprite(1500, 1500);
    sprBSoldier20 = createSprite(1500, 1500);
    // Red Bullets
    sprRBullet1 = createSprite(-1000, 1000);
    sprRBullet2 = createSprite(-1000, 1000);
    sprRBullet3 = createSprite(-1000, 1000);
    sprRBullet4 = createSprite(-1000, 1000);
    sprRBullet5 = createSprite(-1000, 1000);
    sprRBullet6 = createSprite(-1000, 1000);
    sprRBullet7 = createSprite(-1000, 1000);
    sprRBullet8 = createSprite(-1000, 1000);
    sprRBullet9 = createSprite(-1000, 1000);
    sprRBullet10 = createSprite(-1000, 1000);
    sprRBullet11 = createSprite(-1000, 1000);
    sprRBullet12 = createSprite(-1000, 1000);
    sprRBullet13 = createSprite(-1000, 1000);
    sprRBullet14 = createSprite(-1000, 1000);
    sprRBullet15 = createSprite(-1000, 1000);
    sprRBullet16 = createSprite(-1000, 1000);
    sprRBullet17 = createSprite(-1000, 1000);
    sprRBullet18 = createSprite(-1000, 1000);
    sprRBullet19 = createSprite(-1000, 1000);
    sprRBullet20 = createSprite(-1000, 1000);
    sprRBullet21 = createSprite(-1000, 1000);
    sprRBullet22 = createSprite(-1000, 1000);
    sprRBullet23 = createSprite(-1000, 1000);
    sprRBullet24 = createSprite(-1000, 1000);
    sprRBullet25 = createSprite(-1000, 1000);
    sprRBullet26 = createSprite(-1000, 1000);
    sprRBullet27 = createSprite(-1000, 1000);
    sprRBullet28 = createSprite(-1000, 1000);
    sprRBullet29 = createSprite(-1000, 1000);
    sprRBullet30 = createSprite(-1000, 1000);
    sprRBullet31 = createSprite(-1000, 1000);
    sprRBullet32 = createSprite(-1000, 1000);
    sprRBullet33 = createSprite(-1000, 1000);
    sprRBullet34 = createSprite(-1000, 1000);
    sprRBullet35 = createSprite(-1000, 1000);
    sprRBullet36 = createSprite(-1000, 1000);
    sprRBullet37 = createSprite(-1000, 1000);
    sprRBullet38 = createSprite(-1000, 1000);
    sprRBullet39 = createSprite(-1000, 1000);
    sprRBullet40 = createSprite(-1000, 1000);
    sprRBullet41 = createSprite(-1000, 1000);
    sprRBullet42 = createSprite(-1000, 1000);
    sprRBullet43 = createSprite(-1000, 1000);
    sprRBullet44 = createSprite(-1000, 1000);
    sprRBullet45 = createSprite(-1000, 1000);
    sprRBullet46 = createSprite(-1000, 1000);
    sprRBullet47 = createSprite(-1000, 1000);
    sprRBullet48 = createSprite(-1000, 1000);
    sprRBullet49 = createSprite(-1000, 1000);
    sprRBullet50 = createSprite(-1000, 1000);
    // Blue Bullets
    sprBBullet1 = createSprite(1500, 1500);
    sprBBullet2 = createSprite(1500, 1500);
    sprBBullet3 = createSprite(1500, 1500);
    sprBBullet4 = createSprite(1500, 1500);
    sprBBullet5 = createSprite(1500, 1500);
    sprBBullet6 = createSprite(1500, 1500);
    sprBBullet7 = createSprite(1500, 1500);
    sprBBullet8 = createSprite(1500, 1500);
    sprBBullet9 = createSprite(1500, 1500);
    sprBBullet10 = createSprite(1500, 1500);
    sprBBullet11 = createSprite(1500, 1500);
    sprBBullet12 = createSprite(1500, 1500);
    sprBBullet13 = createSprite(1500, 1500);
    sprBBullet14 = createSprite(1500, 1500);
    sprBBullet15 = createSprite(1500, 1500);
    sprBBullet16 = createSprite(1500, 1500);
    sprBBullet17 = createSprite(1500, 1500);
    sprBBullet18 = createSprite(1500, 1500);
    sprBBullet19 = createSprite(1500, 1500);
    sprBBullet20 = createSprite(1500, 1500);
    sprBBullet21 = createSprite(1500, 1500);
    sprBBullet22 = createSprite(1500, 1500);
    sprBBullet23 = createSprite(1500, 1500);
    sprBBullet24 = createSprite(1500, 1500);
    sprBBullet25 = createSprite(1500, 1500);
    sprBBullet26 = createSprite(1500, 1500);
    sprBBullet27 = createSprite(1500, 1500);
    sprBBullet28 = createSprite(1500, 1500);
    sprBBullet29 = createSprite(1500, 1500);
    sprBBullet30 = createSprite(1500, 1500);
    sprBBullet31 = createSprite(1500, 1500);
    sprBBullet32 = createSprite(1500, 1500);
    sprBBullet33 = createSprite(1500, 1500);
    sprBBullet34 = createSprite(1500, 1500);
    sprBBullet35 = createSprite(1500, 1500);
    sprBBullet36 = createSprite(1500, 1500);
    sprBBullet37 = createSprite(1500, 1500);
    sprBBullet38 = createSprite(1500, 1500);
    sprBBullet39 = createSprite(1500, 1500);
    sprBBullet40 = createSprite(1500, 1500);
    sprBBullet41 = createSprite(1500, 1500);
    sprBBullet42 = createSprite(1500, 1500);
    sprBBullet43 = createSprite(1500, 1500);
    sprBBullet44 = createSprite(1500, 1500);
    sprBBullet45 = createSprite(1500, 1500);
    sprBBullet46 = createSprite(1500, 1500);
    sprBBullet47 = createSprite(1500, 1500);
    sprBBullet48 = createSprite(1500, 1500);
    sprBBullet49 = createSprite(1500, 1500);
    sprBBullet50 = createSprite(1500, 1500);
    // Red Tower Bullets
    sprRTBullet1 = createSprite(-1000, 1000);
    sprRTBullet2 = createSprite(-1000, 1000);
    sprRTBullet3 = createSprite(-1000, 1000);
    sprRTBullet4 = createSprite(-1000, 1000);
    sprRTBullet5 = createSprite(-1000, 1000);
    sprRTBullet6 = createSprite(-1000, 1000);
    sprRTBullet7 = createSprite(-1000, 1000);
    sprRTBullet8 = createSprite(-1000, 1000);
    sprRTBullet9 = createSprite(-1000, 1000);
    sprRTBullet10 = createSprite(-1000, 1000);
    // Blue Tower Bullets
    sprBTBullet1 = createSprite(1500, 1500);
    sprBTBullet2 = createSprite(1500, 1500);
    sprBTBullet3 = createSprite(1500, 1500);
    sprBTBullet4 = createSprite(1500, 1500);
    sprBTBullet5 = createSprite(1500, 1500);
    sprBTBullet6 = createSprite(1500, 1500);
    sprBTBullet7 = createSprite(1500, 1500);
    sprBTBullet8 = createSprite(1500, 1500);
    sprBTBullet9 = createSprite(1500, 1500);
    sprBTBullet10 = createSprite(1500, 1500);
    // Walls
    sprWallShort1 = createSprite(450, 138);
    sprWallShort1.addImage(imgWallShort);
    sprWallShort2 = createSprite(450, 362);
    sprWallShort2.addImage(imgWallShort);
    sprWallLong1 = createSprite(302.5, 62.5);
    sprWallLong1.addImage(imgWallLong);
    sprWallLong2 = createSprite(597.5, 62.5);
    sprWallLong2.addImage(imgWallLong);
    sprWallLong3 = createSprite(302.5, 437.5);
    sprWallLong3.addImage(imgWallLong);
    sprWallLong4 = createSprite(597.5, 437.5);
    sprWallLong4.addImage(imgWallLong);
    // Barriers
    sprLeftBarrier = createSprite(100, 250);
    sprLeftBarrier.addImage(imgSideBarrier);
    sprRightBarrier = createSprite(800, 250);
    sprRightBarrier.addImage(imgSideBarrier);
    sprTopBarrier = createSprite(450, -75);
    sprTopBarrier.addImage(imgTopBarrier);
    sprBottomBarrier = createSprite(450, 575);
    sprBottomBarrier.addImage(imgTopBarrier);

    // Groups
    allWalls = new Group();
    allBarriers = new Group();
    
    allArmy = new Group();
    allNonBullet = new Group();
    
    allRed = new Group();
    allRedBullets = new Group();
    allRedSoldiers = new Group();
    allRedTowerBullets = new Group();
    allRedTowers = new Group();
    
    allBlue = new Group();
    allBlueBullets = new Group();
    allBlueSoldiers = new Group();
    allBlueTowerBullets = new Group();
    allBlueTowers = new Group();
    
    // Adding Sprites
    // General
    allWalls.push(sprWallShort1, sprWallShort2, sprWallLong1, sprWallLong2,
                  sprWallLong3, sprWallLong4);
    allBarriers.push(sprLeftBarrier, sprRightBarrier, sprBottomBarrier,
                     sprTopBarrier);
    // Red
    allRedBullets.push(sprRBullet1, sprRBullet2, sprRBullet3, sprRBullet4,
                      sprRBullet5, sprRBullet6, sprRBullet7, sprRBullet8,
                      sprRBullet9, sprRBullet10, sprRBullet11, sprRBullet12,
                      sprRBullet13, sprRBullet14, sprRBullet15, sprRBullet16,
                      sprRBullet17, sprRBullet18, sprRBullet19, sprRBullet20,
                      sprRBullet21, sprRBullet22, sprRBullet23, sprRBullet24,
                      sprRBullet25, sprRBullet26, sprRBullet27, sprRBullet28,
                      sprRBullet29, sprRBullet30, sprRBullet31, sprRBullet32,
                      sprRBullet33, sprRBullet34, sprRBullet35, sprRBullet36,
                      sprRBullet37, sprRBullet38, sprRBullet39, sprRBullet40,
                      sprRBullet41, sprRBullet42, sprRBullet43, sprRBullet44,
                      sprRBullet45, sprRBullet46, sprRBullet47, sprRBullet48,
                      sprRBullet49, sprRBullet50);
    allRedSoldiers.push(sprRSoldier1, sprRSoldier2, sprRSoldier3,
                        sprRSoldier4, sprRSoldier5, sprRSoldier6,
                        sprRSoldier7, sprRSoldier8, sprRSoldier9,
                        sprRSoldier10, sprRSoldier11, sprRSoldier12,
                        sprRSoldier13, sprRSoldier14, sprRSoldier15,
                        sprRSoldier16, sprRSoldier17, sprRSoldier18,
                        sprRSoldier19, sprRSoldier20);
    allRedTowerBullets.push(sprRTBullet1, sprRTBullet2, sprRTBullet3,
                           sprRTBullet4, sprRTBullet5, sprRTBullet6,
                           sprRTBullet7, sprRTBullet8, sprRTBullet9,
                           sprRTBullet10);
    allRedTowers.push(sprRTower1, sprRTower2);
    // Blue
    allBlueBullets.push(sprBBullet1, sprBBullet2, sprBBullet3, sprBBullet4,
                      sprBBullet5, sprBBullet6, sprBBullet7, sprBBullet8,
                      sprBBullet9, sprBBullet10, sprBBullet11, sprBBullet12,
                      sprBBullet13, sprBBullet14, sprBBullet15, sprBBullet16,
                      sprBBullet17, sprBBullet18, sprBBullet19, sprBBullet20,
                      sprBBullet21, sprBBullet22, sprBBullet23, sprBBullet24,
                      sprBBullet25, sprBBullet26, sprBBullet27, sprBBullet28,
                      sprBBullet29, sprBBullet30, sprBBullet31, sprBBullet32,
                      sprBBullet33, sprBBullet34, sprBBullet35, sprBBullet36,
                      sprBBullet37, sprBBullet38, sprBBullet39, sprBBullet40,
                      sprBBullet41, sprBBullet42, sprBBullet43, sprBBullet44,
                      sprBBullet45, sprBBullet46, sprBBullet47, sprBBullet48,
                      sprBBullet49, sprBBullet50);
    allBlueSoldiers.push(sprBSoldier1, sprBSoldier2, sprBSoldier3,
                        sprBSoldier4, sprBSoldier5, sprBSoldier6,
                        sprBSoldier7, sprBSoldier8, sprBSoldier9,
                        sprBSoldier10, sprBSoldier11, sprBSoldier12,
                        sprBSoldier13, sprBSoldier14, sprBSoldier15,
                        sprBSoldier16, sprBSoldier17, sprBSoldier18,
                        sprBSoldier19, sprBSoldier20);
    allBlueTowerBullets.push(sprBTBullet1, sprBTBullet2, sprBTBullet3,
                           sprBTBullet4, sprBTBullet5, sprBTBullet6,
                           sprBTBullet7, sprBTBullet8, sprBTBullet9,
                           sprBTBullet10);
    allBlueTowers.push(sprBTower1, sprBTower2);
    
    // Looping through certain groups
    // Red
    for(i = 0; i < allRedBullets.length; i++){
        redBullet = allRedBullets[i];
        redBullet.addImage(imgBullet);
        allRed.push(redBullet);
        allArmy.push(redBullet);
    }
    for(i = 0; i < allRedSoldiers.length; i++){
        redSoldier = allRedSoldiers[i];
        redSoldier.addImage(imgRedSoldier);
        redSoldier.rotation = 0;
        redSoldier.setCollider("circle", 0, 0, 25);
        allRed.push(redSoldier);
        allArmy.push(redSoldier);
        blueTargetList.push(redSoldier);
        allNonBullet.push(redSoldier);
    }
    for(i = 0; i < allRedTowerBullets.length; i++){
        redTowerBullet = allRedTowerBullets[i];
        redTowerBullet.addImage(imgTowerBullet);
        allRed.push(redTowerBullet);
        allArmy.push(redTowerBullet);
    }
    for(i = 0; i < allRedTowers.length; i++){
        redTower = allRedTowers[i];
        redTower.addImage(imgRedTower);
        redTower.setCollider("circle", 0, 0, 33);
        allRed.push(redTower);
        allArmy.push(redTower);
        allNonBullet.push(redTower);
    }
    // Blue
    for(i = 0; i < allBlueBullets.length; i++){
        blueBullet = allBlueBullets[i];
        blueBullet.addImage(imgBullet);
        allBlue.push(blueBullet);
        allArmy.push(blueBullet);
    }
    for(i = 0; i < allBlueSoldiers.length; i++){
        blueSoldier = allBlueSoldiers[i];
        blueSoldier.addImage(imgBlueSoldier);
        blueSoldier.rotation = 0;
        blueSoldier.setCollider("circle", 0, 0, 25);
        allBlue.push(blueSoldier);
        allArmy.push(blueSoldier);
        redTargetList.push(blueSoldier);
        allNonBullet.push(blueSoldier);
    }
    for(i = 0; i < allBlueTowerBullets.length; i++){
        blueTowerBullet = allBlueTowerBullets[i];
        blueTowerBullet.addImage(imgTowerBullet);
        allBlue.push(blueTowerBullet);
        allArmy.push(blueTowerBullet);
    }
    for(i = 0; i < allBlueTowers.length; i++){
        blueTower = allBlueTowers[i];
        blueTower.addImage(imgBlueTower);
        blueTower.setCollider("circle", 0, 0, 33);
        allBlue.push(blueTower);
        allArmy.push(blueTower);
        allNonBullet.push(blueTower);
    }
    // General
    for(i = 0; i < allArmy.length; i++){
        armySprite = allArmy[i];
        armySprite.active = false;
    }
    // Extra Variables for Soldiers and Towers
    for(i = 0; i < allNonBullet.length; i++){
        nonBulletSprite = allNonBullet[i];
        nonBulletSprite.cooldown = 0;
        nonBulletSprite.targetX = -1;
        nonBulletSprite.targetY = -1;
        nonBulletSprite.health = 0;
        nonBulletSprite.mouseActive = true;
        if(allRed.contains(nonBulletSprite)){
            nonBulletSprite.targetList = shuffle(redTargetList);
            if(Math.random() < 0.5){
                nonBulletSprite.targetList.unshift(sprBTower1, sprBTower2);
            }else{
                nonBulletSprite.targetList.unshift(sprBTower2, sprBTower1);
            }
        }else{
            nonBulletSprite.targetList = shuffle(blueTargetList);
            if(Math.random() < 0.5){
                nonBulletSprite.targetList.unshift(sprRTower1, sprRTower2);
            }else{
                nonBulletSprite.targetList.unshift(sprRTower2, sprRTower1);
            }
        }
    }
}

function draw(){
    background(255, 255, 0);
    
    // COOLDOWNS
    if(commandCooldown > 0){
        commandCooldown -= 1;
    }
    for(i = 0; i < allNonBullet.length; i++){
        nonBulletSprite = allNonBullet[i];
        if(nonBulletSprite.cooldown > 0){
            nonBulletSprite.cooldown -= 1;
        }
    }
    
    // BACKGROUND EFFECTS
    if(sideBridges){
        sprBackground.changeImage("2");
        sprWater.changeImage("2");
    }else{
        sprBackground.changeImage("1");
        sprWater.changeImage("1");
    }
    if(shortWalls){
        sprWallShort1.position.x = 450;
        sprWallShort1.position.y = 138;
        sprWallShort2.position.x = 450;
        sprWallShort2.position.y = 362;
    }else{
        sprWallShort1.position.x = sprWallShort1.position.y = -1000;
        sprWallShort2.position.x = sprWallShort2.position.y = -1000;
    }
    if(longWalls){
        sprWallLong1.position.x = 302.5;
        sprWallLong1.position.y = 62.5;
        sprWallLong2.position.x = 597.5;
        sprWallLong2.position.y = 62.5;
        sprWallLong3.position.x = 302.5;
        sprWallLong3.position.y = 437.5;
        sprWallLong4.position.x = 597.5;
        sprWallLong4.position.y = 437.5;
    }else{
        sprWallLong1.position.x = sprWallLong1.position.y = -1000;
        sprWallLong2.position.x = sprWallLong2.position.y = -1000;
        sprWallLong3.position.x = sprWallLong3.position.y = -1000;
        sprWallLong4.position.x = sprWallLong4.position.y = -1000;
    }

    // SPRITES - MOVEMENT and ATTACKING
    // Soldier Movement and Attacking
    for(i = 0; i < allRedSoldiers.length; i++){
        redSoldier = allRedSoldiers[i];
        redSoldier.velocity.x = redSoldier.velocity.y = 0;
        if(redSoldier.active){
            target = "not found";
            for(x = 0; x < redSoldier.targetList.length; x++){
                possibleTarget = redSoldier.targetList[x];
                if(possibleTarget.active){
                    target = possibleTarget;
                    break;
                }
            }
            if(target != "not found"){
                redSoldier.attractionPoint(2, target.position.x,
                                        target.position.y);
                direction = redSoldier.getDirection();
                redSoldier.rotation = direction + 90;
                if(redSoldier.cooldown == 0){
                    redSoldier.cooldown = 30;
                    shootBullet("red", redSoldier.position.x,
                                redSoldier.position.y, direction);
                }
            }
        }
    }
    for(i = 0; i < allBlueSoldiers.length; i++){
        blueSoldier = allBlueSoldiers[i];
        blueSoldier.velocity.x = blueSoldier.velocity.y = 0;
        if(blueSoldier.active){
            target = "not found";
            for(x = 0; x < blueSoldier.targetList.length; x++){
                possibleTarget = blueSoldier.targetList[x];
                if(possibleTarget.active){
                    target = possibleTarget;
                    break;
                }
            }
            if(target != "not found"){
                blueSoldier.attractionPoint(2, target.position.x,
                                        target.position.y);
                direction = blueSoldier.getDirection();
                blueSoldier.rotation = direction + 90;
                if(blueSoldier.cooldown == 0){
                    blueSoldier.cooldown = 30;
                    shootBullet("blue", blueSoldier.position.x,
                                blueSoldier.position.y, direction);
                }
            }
        }
    }
    // Tower Attacking
    for(i = 0; i < allRedTowers.length; i++){
        redTower = allRedTowers[i];
        if(redTower.active){
            target = "not found";
            for(x = 0; x < redTower.targetList.length; x++){
                possibleTarget = redTower.targetList[x];
                if(possibleTarget.active){
                    target = possibleTarget;
                    break;
                }
            }
            if(target != "not found"){
                if(redTower.cooldown == 0){
                    redTower.cooldown = 30;
                    shootTowerBullet("red", redTower.position.x,
                                     redTower.position.y, target.position.x,
                                     target.position.y);
                }
            }
        }
    }
    for(i = 0; i < allBlueTowers.length; i++){
        blueTower = allBlueTowers[i];
        if(blueTower.active){
            target = "not found";
            for(x = 0; x < blueTower.targetList.length; x++){
                possibleTarget = blueTower.targetList[x];
                if(possibleTarget.active){
                    target = possibleTarget;
                    break;
                }
            }
            if(target != "not found"){
                if(blueTower.cooldown == 0){
                    blueTower.cooldown = 30;
                    shootTowerBullet("blue", blueTower.position.x,
                                     blueTower.position.y, target.position.x,
                                     target.position.y);
                }
            }
        }
    }

    // SPRITES - DEATH
    // Death by Health
    for(i = 0; i < allNonBullet.length; i++){
        nonBulletSprite = allNonBullet[i];
        if(nonBulletSprite.health <= 0 && nonBulletSprite.active){
            nonBulletSprite.active = false;
            nonBulletSprite.health = 0;
            if(allRed.contains(nonBulletSprite) &&
               allRedTowers.contains(nonBulletSprite)){
                blueTowKills += 1;
            }else if(allRed.contains(nonBulletSprite)){
                blueSolKills += 1;
            }else if(allBlue.contains(nonBulletSprite) &&
                     allBlueTowers.contains(nonBulletSprite)){
                redTowKills += 1;
            }else{
                redSolKills += 1;
            }
        }
    }
    // Death by Click
    if(mouseIsPressed){
        for(i = 0; i < allNonBullet.length; i++){
            nonBulletSprite = allNonBullet[i];
            if(nonBulletSprite.mouseIsPressed){
                nonBulletSprite.health = 0;
                nonBulletSprite.active = false;
            }
        }
    }
    // Death Movement
    for(i = 0; i < allArmy.length; i++){
        armySprite = allArmy[i];
        if(! armySprite.active){
            if(allRed.contains(armySprite)){
                armySprite.position.x = -1000;
                armySprite.position.y = 1000;
            }else{
                armySprite.position.x = armySprite.position.y = 1500;
            }
        }
    }

    // SPRITES - COLLISIONS
    // Soldier Collisions
    for(i = 0; i < allRedSoldiers.length; i++){
        redSoldier = allRedSoldiers[i];
        blueSoldier = allBlueSoldiers[i];
        redSoldier.bounce(allRedSoldiers);
        blueSoldier.bounce(allBlueSoldiers);
        if(Math.random() < 0.5){
            redSoldier.bounce(allBlueSoldiers);
            blueSoldier.bounce(allRedSoldiers);
        }else{
            blueSoldier.bounce(allRedSoldiers);
            redSoldier.bounce(allBlueSoldiers);
        }
    }
    // Tower Collisions
    for(i = 0; i < allRedTowers.length; i++){
        redTower = allRedTowers[i];
        blueTower = allBlueTowers[i];
        redTower.displace(allRedSoldiers);
        blueTower.displace(allBlueSoldiers);
        blueTower.displace(allRedSoldiers);
        redTower.displace(allBlueSoldiers);
        redTower.displace(allRedTowers);
        blueTower.displace(allBlueTowers);
        blueTower.displace(allRedTowers);
        redTower.displace(allBlueTowers);
    }
    // Water Collisions
    for(i = 0; i < allNonBullet.length; i++){
        nonBulletSprite = allNonBullet[i];
        if(sprWater.overlapPixel(nonBulletSprite.position.x,
                                 nonBulletSprite.position.y)){
            sprWater.displace(nonBulletSprite);
        }
    }
    // Wall Collisions
    for(i = 0; i < allWalls.length; i++){
        wall = allWalls[i];
        wall.displace(allNonBullet);
        if(blockBullets){
            for(x = 0; x < allRedBullets.length; x++){
                redBullet = allRedBullets[x];
                blueBullet = allBlueBullets[x];
                if(wall.collide(redBullet)){
                    redSolMiss += 1;
                    redBullet.active = false;
                }
                if(wall.collide(blueBullet)){
                    blueSolMiss += 1;
                    blueBullet.active = false;
                }
            }
        }
    }
    // Barrier Collisions
    for(i = 0; i < allBarriers.length; i++){
        barrier = allBarriers[i];
        barrier.displace(allNonBullet);
    }

    // BULLET DAMAGE
    for(i = 0; i < allNonBullet.length; i++){
        nonBulletSprite = allNonBullet[i];
        if(allRed.contains(nonBulletSprite)){
            for(x = 0; x < allBlueBullets.length; x++){
                bullet = allBlueBullets[x];
                if(nonBulletSprite.collide(bullet)){
                    nonBulletSprite.health -= 10;
                    blueDmg += 10;
                    blueSolHit += 1;
                    bullet.active = false;
                }
            }
            for(x = 0; x < allBlueTowerBullets.length; x++){
                bullet = allBlueTowerBullets[x];
                if(nonBulletSprite.collide(bullet)){
                    nonBulletSprite.health -= 20;
                    blueDmg += 20;
                    blueTowHit += 1;
                    bullet.active = false;
                }
            }
        }else{
            for(x = 0; x < allRedBullets.length; x++){
                bullet = allRedBullets[x];
                if(nonBulletSprite.collide(bullet)){
                    nonBulletSprite.health -= 10;
                    redDmg += 10;
                    redSolHit += 1;
                    bullet.active = false;
                }
            }
            for(x = 0; x < allRedTowerBullets.length; x++){
                bullet = allRedTowerBullets[x];
                if(nonBulletSprite.collide(bullet)){
                    nonBulletSprite.health -= 20;
                    redDmg += 20;
                    redTowHit += 1;
                    bullet.active = false;
                }
            }
        }
    }

    // BULLET OFFSCREEN
    for(i = 0; i < allRedBullets.length; i++){
        redBullet = allRedBullets[i];
        blueBullet = allBlueBullets[i];
        if(! onScreen(redBullet) && redBullet.active){
            redSolMiss += 1;
            redBullet.active = false;
        }
        if(! onScreen(blueBullet) && blueBullet.active){
            blueSolMiss += 1;
            blueBullet.active = false;
        }
    }
    for(i = 0; i < allRedTowerBullets.length; i++){
        redTowerBullet = allRedTowerBullets[i];
        blueTowerBullet = allBlueTowerBullets[i];
        if(! onScreen(redTowerBullet) && redTowerBullet.active){
            redTowMiss += 1;
            redTowerBullet.active = false;
        }
        if(! onScreen(blueTowerBullet) && blueTowerBullet.active){
            blueTowMiss += 1;
            blueTowerBullet.active = false;
        }
    }

    // SOLDIER/TOWER OFFSCREEN
    for(i = 0; i < allNonBullet.length; i++){
        nonBulletSprite = allNonBullet[i];
        if((! onScreen(nonBulletSprite)) && nonBulletSprite.active){
            nonBulletSprite.position.x = 450;
            nonBulletSprite.position.y = 250;
        }
    }
    
    // DRAW SPRITES
    drawSprites();
    
    // COMMANDS
    textStyle(NORMAL);
    textAlign(CENTER);
    textFont("Courier New");
    fill(0, 204, 0);
    textSize(13);
    text("Welcome to\nBattlefield Simulator!", 100, 20);
    text("Use the commands below\nto change the scene.", 100, 50);
    textSize(25);
    text("Commands", 100, 100);
    textSize(13);
    textAlign(LEFT);
    text("Cooldown: ", 40, 120);
    if(commandCooldown === 0){
        text("READY", 120, 120);
    }else{
        fill(204, 0, 0);
        text("WAIT", 120, 120);
        fill(0, 204, 0);
    }
    textAlign(CENTER);
    textSize(16);
    text("Background Settings", 100, 160);
    textSize(13);
    text("A: Toggle short\nwalls"+shortWallsState, 100, 180);
    text("S: Toggle long\nwalls"+longWallsState, 100, 220);
    text("D: Toggle side\nbridges"+sideBridgesState, 100, 260);
    text("F: Toggle walls\nblock bullets"+blockBulletsState, 100, 300);
    textSize(16);
    text("Spawning", 100, 360);
    textSize(13);
    text("H: Spawn Red Tower", 100, 380);
    text("J: Spawn Blue Tower", 100, 400);
    text("K: Spawn Red Soldier", 100, 420);
    text("L: Spawn Blue Soldier", 100, 440);
    textSize(16);
    text("Special", 100, 485);
    textSize(13);
    text("Z: Clear Field", 100, 505);
    text("X: Clear Field,\nSpawn armies in\nNormal Position.", 100, 525);
    textAlign(LEFT);
    text("X+C: Column Pos.", 60, 575);
    text("X+V: Arrow Pos.", 60, 595);
    text("X+B: Random Pos.", 60, 615);
    // Command Execution
    if(commandCooldown === 0){
        if(keyIsDown(32)){
            commandCooldown = 30;
            if(availabilityStats){
                availabilityStats = false;
            }else{
                availabilityStats = true;
            }
        }else if(keyIsDown(65)){
            commandCooldown = 30;
            if(shortWalls){
                shortWalls = false;
                shortWallsState = " (OFF)";
            }else{
                shortWalls = true;
                shortWallsState = " (ON)";
            }
        }else if(keyIsDown(83)){
            commandCooldown = 30;
            if(longWalls){
                longWalls = false;
                longWallsState = " (OFF)";
            }else{
                longWalls = true;
                longWallsState = " (ON)";
            }
        }else if(keyIsDown(68)){
            commandCooldown = 30;
            if(sideBridges){
                sideBridges = false;
                sideBridgesState = " (OFF)";
            }else{
                sideBridges = true;
                sideBridgesState = " (ON)";
            }
        }else if(keyIsDown(70)){
            commandCooldown = 30;
            if(blockBullets){
                blockBullets = false;
                blockBulletsState = " (OFF)";
            }else{
                blockBullets = true;
                blockBulletsState = " (ON)";
            }
        }else if(keyIsDown(72)){
            commandCooldown = 30;
            spawnSprite("tower", "red", mouseX, mouseY);
        }else if(keyIsDown(74)){
            commandCooldown = 30;
            spawnSprite("tower", "blue", mouseX, mouseY);
        }else if(keyIsDown(75)){
            commandCooldown = 30;
            spawnSprite("soldier", "red", mouseX, mouseY);
        }else if(keyIsDown(76)){
            commandCooldown = 30;
            spawnSprite("soldier", "blue", mouseX, mouseY);
        }else if(keyIsDown(90)){
            commandCooldown = 30;
            clearField();
        }else if(keyIsDown(88)){
            commandCooldown = 30;
            clearField();
            spawnSprite("tower", "red", 250, 50);
            spawnSprite("tower", "red", 650, 50);
            spawnSprite("tower", "blue", 250, 450);
            spawnSprite("tower", "blue", 650, 450);
            if(keyIsDown(67)){
                // Red
                spawnSprite("soldier", "red", 310, 25);
                spawnSprite("soldier", "red", 310, 75);
                spawnSprite("soldier", "red", 310, 125);
                spawnSprite("soldier", "red", 310, 175);
                spawnSprite("soldier", "red", 380, 25);
                spawnSprite("soldier", "red", 380, 75);
                spawnSprite("soldier", "red", 380, 125);
                spawnSprite("soldier", "red", 380, 175);
                spawnSprite("soldier", "red", 450, 25);
                spawnSprite("soldier", "red", 450, 75);
                spawnSprite("soldier", "red", 450, 125);
                spawnSprite("soldier", "red", 450, 175);
                spawnSprite("soldier", "red", 520, 25);
                spawnSprite("soldier", "red", 520, 75);
                spawnSprite("soldier", "red", 520, 125);
                spawnSprite("soldier", "red", 520, 175);
                spawnSprite("soldier", "red", 590, 25);
                spawnSprite("soldier", "red", 590, 75);
                spawnSprite("soldier", "red", 590, 125);
                spawnSprite("soldier", "red", 590, 175);
                // Blue
                spawnSprite("soldier", "blue", 310, 325);
                spawnSprite("soldier", "blue", 310, 375);
                spawnSprite("soldier", "blue", 310, 425);
                spawnSprite("soldier", "blue", 310, 475);
                spawnSprite("soldier", "blue", 380, 325);
                spawnSprite("soldier", "blue", 380, 375);
                spawnSprite("soldier", "blue", 380, 425);
                spawnSprite("soldier", "blue", 380, 475);
                spawnSprite("soldier", "blue", 450, 325);
                spawnSprite("soldier", "blue", 450, 375);
                spawnSprite("soldier", "blue", 450, 425);
                spawnSprite("soldier", "blue", 450, 475);
                spawnSprite("soldier", "blue", 520, 325);
                spawnSprite("soldier", "blue", 520, 375);
                spawnSprite("soldier", "blue", 520, 425);
                spawnSprite("soldier", "blue", 520, 475);
                spawnSprite("soldier", "blue", 590, 325);
                spawnSprite("soldier", "blue", 590, 375);
                spawnSprite("soldier", "blue", 590, 425);
                spawnSprite("soldier", "blue", 590, 475);
            }else if(keyIsDown(86)){
                // Red
                spawnSprite("soldier", "red", 450, 175);
                spawnSprite("soldier", "red", 400, 125);
                spawnSprite("soldier", "red", 500, 125);
                spawnSprite("soldier", "red", 350, 75);
                spawnSprite("soldier", "red", 450, 75);
                spawnSprite("soldier", "red", 550, 75);
                spawnSprite("soldier", "red", 300, 25);
                spawnSprite("soldier", "red", 400, 25);
                spawnSprite("soldier", "red", 500, 25);
                spawnSprite("soldier", "red", 600, 25);
                // Blue
                spawnSprite("soldier", "blue", 450, 325);
                spawnSprite("soldier", "blue", 400, 375);
                spawnSprite("soldier", "blue", 500, 375);
                spawnSprite("soldier", "blue", 350, 425);
                spawnSprite("soldier", "blue", 450, 425);
                spawnSprite("soldier", "blue", 550, 425);
                spawnSprite("soldier", "blue", 300, 475);
                spawnSprite("soldier", "blue", 400, 475);
                spawnSprite("soldier", "blue", 500, 475);
                spawnSprite("soldier", "blue", 600, 475);
            }else if(keyIsDown(66)){
                for(i = 0; i < Math.floor(Math.random() * 21); i++){
                    randomX = Math.floor(Math.random() * 451);
                    randomX += 225;
                    randomY = Math.floor(Math.random() * 151);
                    spawnSprite("soldier", "red", randomX, randomY + 25);
                    spawnSprite("soldier", "blue", randomX, randomY + 325);
                }
            }else{
                // Red
                spawnSprite("soldier", "red", 300, 25);
                spawnSprite("soldier", "red", 350, 25);
                spawnSprite("soldier", "red", 400, 25);
                spawnSprite("soldier", "red", 450, 25);
                spawnSprite("soldier", "red", 500, 25);
                spawnSprite("soldier", "red", 550, 25);
                spawnSprite("soldier", "red", 600, 25);
                spawnSprite("soldier", "red", 300, 75);
                spawnSprite("soldier", "red", 350, 75);
                spawnSprite("soldier", "red", 400, 75);
                spawnSprite("soldier", "red", 450, 75);
                spawnSprite("soldier", "red", 500, 75);
                spawnSprite("soldier", "red", 550, 75);
                spawnSprite("soldier", "red", 600, 75);
                spawnSprite("soldier", "red", 325, 125);
                spawnSprite("soldier", "red", 375, 125);
                spawnSprite("soldier", "red", 425, 125);
                spawnSprite("soldier", "red", 475, 125);
                spawnSprite("soldier", "red", 525, 125);
                spawnSprite("soldier", "red", 575, 125);
                // Blue
                spawnSprite("soldier", "blue", 300, 475);
                spawnSprite("soldier", "blue", 350, 475);
                spawnSprite("soldier", "blue", 400, 475);
                spawnSprite("soldier", "blue", 450, 475);
                spawnSprite("soldier", "blue", 500, 475);
                spawnSprite("soldier", "blue", 550, 475);
                spawnSprite("soldier", "blue", 600, 475);
                spawnSprite("soldier", "blue", 300, 425);
                spawnSprite("soldier", "blue", 350, 425);
                spawnSprite("soldier", "blue", 400, 425);
                spawnSprite("soldier", "blue", 450, 425);
                spawnSprite("soldier", "blue", 500, 425);
                spawnSprite("soldier", "blue", 550, 425);
                spawnSprite("soldier", "blue", 600, 425);
                spawnSprite("soldier", "blue", 325, 375);
                spawnSprite("soldier", "blue", 375, 375);
                spawnSprite("soldier", "blue", 425, 375);
                spawnSprite("soldier", "blue", 475, 375);
                spawnSprite("soldier", "blue", 525, 375);
                spawnSprite("soldier", "blue", 575, 375);
            }
        }
    }
    
    // AVAILABILITY STATS
    textAlign(LEFT);
    textSize(16);
    text("SPACE: Toggle\nAvailability Stats", 220, 525);
    if(availabilityStats){
        textSize(16);
        text("Numbers show available\nobjects of each type.", 220, 570);
        // Generate Stats
        aRedBullets = aRedSoldiers = aRedTowerBullets = aRedTowers = 0;
        aBlueBullets = aBlueSoldiers = aBlueTowerBullets = aBlueTowers = 0;
        for(i = 0; i < allRedBullets.length; i++){
            redBullet = allRedBullets[i];
            if(! redBullet.active){
                aRedBullets += 1;
            }
        }
        for(i = 0; i < allRedSoldiers.length; i++){
            redSoldier = allRedSoldiers[i];
            if(! redSoldier.active){
                aRedSoldiers += 1;
            }
        }
        for(i = 0; i < allRedTowerBullets.length; i++){
            redTowerBullet = allRedTowerBullets[i];
            if(! redTowerBullet.active){
                aRedTowerBullets += 1;
            }
        }
        for(i = 0; i < allRedTowers.length; i++){
            redTower = allRedTowers[i];
            if(! redTower.active){
                aRedTowers += 1;
            }
        }
        for(i = 0; i < allBlueBullets.length; i++){
            blueBullet = allBlueBullets[i];
            if(! blueBullet.active){
                aBlueBullets += 1;
            }
        }
        for(i = 0; i < allBlueSoldiers.length; i++){
            blueSoldier = allBlueSoldiers[i];
            if(! blueSoldier.active){
                aBlueSoldiers += 1;
            }
        }
        for(i = 0; i < allBlueTowerBullets.length; i++){
            blueTowerBullet = allBlueTowerBullets[i];
            if(! blueTowerBullet.active){
                aBlueTowerBullets += 1;
            }
        }
        for(i = 0; i < allBlueTowers.length; i++){
            blueTower = allBlueTowers[i];
            if(! blueTower.active){
                aBlueTowers += 1;
            }
        }
        textStyle(BOLD);
        fill(204, 0, 0);
        text("Red Bullets: "+aRedBullets+"/"+allRedBullets.length,
             460, 525);
        text("Red Soldiers: "+aRedSoldiers+"/"+allRedSoldiers.length,
             460, 540);
        text(("Red Tower Bullets: "+aRedTowerBullets+"/"+
             allRedTowerBullets.length), 460, 555);
        text("Red Towers: "+aRedTowers+"/"+allRedTowers.length,
             460, 570);
        fill(0, 0, 204);
        text("Blue Bullets: "+aBlueBullets+"/"+allBlueBullets.length,
             460, 590);
        text("Blue Soldiers: "+aBlueSoldiers+"/"+allBlueSoldiers.length,
             460, 605);
        text(("Blue Tower Bullets: "+aBlueTowerBullets+"/"+
             allBlueTowerBullets.length), 460, 620);
        text("Blue Towers: "+aBlueTowers+"/"+allBlueTowers.length,
             460, 635);
    }
    
    // ARMY COMPARISON STATS
    // Calculations
    if(redSolMiss + redSolHit > 0){
        redSolAccuracy = (Math.round(100 *
                          (redSolHit / (redSolMiss+redSolHit))));
    }else{
        redSolAccuracy = 0;
    }
    if(redTowMiss + redTowHit > 0){
        redTowAccuracy = (Math.round(100 *
                          (redTowHit / (redTowMiss+redTowHit))));
    }else{
        redTowAccuracy = 0;
    }
    if(blueSolMiss + blueSolHit > 0){
        blueSolAccuracy = (Math.round(100 *
                           (blueSolHit / (blueSolMiss+blueSolHit))));
    }else{
        blueSolAccuracy = 0;
    }
    if(blueTowMiss + blueTowHit > 0){
        blueTowAccuracy = (Math.round(100 *
                           (blueTowHit / (blueTowMiss+blueTowHit))));
    }else{
        blueTowAccuracy = 0;
    }
    redPoints = redSolKills + (redTowKills * 5);
    bluePoints = blueSolKills + (blueTowKills * 5);
    textStyle(NORMAL);
    textAlign(CENTER);
    // Green text
    fill(0, 204, 0);
    textSize(30);
    text("Points", 800, 60);
    textSize(25);
    text("Kills", 800, 130);
    text("Total\nDamage", 800, 275);
    text("Accuracy", 800, 380);
    textSize(20);
    text("Soldiers", 800, 155);
    text("Towers", 800, 205);
    text("Soldiers", 800, 405);
    text("Towers", 800, 455);
    // Red Text
    fill(204, 0, 0);
    textSize(30);
    text("Red", 750, 30);
    textSize(40);
    text(redPoints, 750, 95);
    textSize(30);
    text(redSolKills, 750, 185);
    text(redTowKills, 750, 235);
    text(redDmg, 750, 335);
    text(redSolAccuracy+"%", 750, 435);
    text(redTowAccuracy+"%", 750, 485);
    // Blue Text
    textSize(30);
    fill(0, 0, 204);
    text("Blue", 850, 30);
    textSize(40);
    text(bluePoints, 850, 95);
    textSize(30);
    text(blueSolKills, 850, 185);
    text(blueTowKills, 850, 235);
    text(blueDmg, 850, 335);
    text(blueSolAccuracy+"%", 850, 435);
    text(blueTowAccuracy+"%", 850, 485);
}

// FUNCTIONS
function shuffle(array){ // From stackoverflow
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
  return array;
}

function onScreen(spriteToCheck){
    if(spriteToCheck == "mouse"){
        if(200 < mouseX && mouseX < 700 && 0 < mouseY && mouseY < 500){
            return true;
        }else{
            return false;
        }
    }else{
        if(200 < spriteToCheck.position.x && spriteToCheck.position.x < 700 &&
           0 < spriteToCheck.position.y && spriteToCheck.position.y < 500){
            return true;
        }else{
            return false;
        }
    }
}

function spawnSprite(type, side, posX, posY){
    if(onScreen("mouse")){
        if(type == "soldier"){
            if(side == "red"){
                for(i = 0; i < allRedSoldiers.length; i++){
                    redSoldier = allRedSoldiers[i];
                    if(! redSoldier.active){
                        redSoldier.active = true;
                        redSoldier.health = 20;
                        redSoldier.position.x = posX;
                        redSoldier.position.y = posY;
                        break;
                    }
                }
            }else{
                for(i = 0; i < allBlueSoldiers.length; i++){
                    blueSoldier = allBlueSoldiers[i];
                    if(! blueSoldier.active){
                        blueSoldier.active = true;
                        blueSoldier.health = 20;
                        blueSoldier.position.x = posX;
                        blueSoldier.position.y = posY;
                        break;
                    }
                }
            }
        }else{
            if(side == "red"){
                for(i = 0; i < allRedTowers.length; i++){
                    redTower = allRedTowers[i];
                    if(! redTower.active){
                        redTower.active = true;
                        redTower.health = 100;
                        redTower.position.x = posX;
                        redTower.position.y = posY;
                        break;
                    }
                }
            }else{
                for(i = 0; i < allBlueTowers.length; i++){
                    blueTower = allBlueTowers[i];
                    if(! blueTower.active){
                        blueTower.active = true;
                        blueTower.health = 100;
                        blueTower.position.x = posX;
                        blueTower.position.y = posY;
                        break;
                    }
                }
            }
        }
    }
}

function clearField(){
    for(i = 0; i < allArmy.length; i++){
        armySprite = allArmy[i];
        armySprite.active = false;
        if(allNonBullet.contains(armySprite)){
            armySprite.health = 0;
            armySprite.targetX = -1;
            armySprite.targetY = -1;
        }
    }
}

function shootBullet(side, startX, startY, direction){
    bullet = "not found";
    if(side == "red"){
        for(i = 0; i < allRedBullets.length; i++){
            possibleBullet = allRedBullets[i];
            if(! possibleBullet.active){
                bullet = possibleBullet;
                break;
            }
        }
        if(bullet != "not found"){
            bullet.active = true;
            bullet.position.x = startX;
            bullet.position.y = startY;
            bullet.rotation = direction + 90;
            bullet.setSpeed(5, direction);
        }
    }else{
        for(i = 0; i < allBlueBullets.length; i++){
            possibleBullet = allBlueBullets[i];
            if(! possibleBullet.active){
                bullet = possibleBullet;
                break;
            }
        }
        if(bullet != "not found"){
            bullet.active = true;
            bullet.position.x = startX;
            bullet.position.y = startY;
            bullet.rotation = direction + 90;
            bullet.setSpeed(5, direction);
        }
    }
}

function shootTowerBullet(side, startX, startY, targetX, targetY){
    bullet = "not found";
    if(side == "red"){
        for(i = 0; i < allRedTowerBullets.length; i++){
            possibleBullet = allRedTowerBullets[i];
            if(! possibleBullet.active){
                bullet = possibleBullet;
                break;
            }
        }
        if(bullet != "not found"){
            bullet.active = true;
            bullet.position.x = startX;
            bullet.position.y = startY;
            bullet.attractionPoint(7, targetX, targetY);
            direction = bullet.getDirection();
            bullet.rotation = direction + 90;
            bullet.setSpeed(7, direction);
        }
    }else{
        for(i = 0; i < allBlueTowerBullets.length; i++){
            possibleBullet = allBlueTowerBullets[i];
            if(! possibleBullet.active){
                bullet = possibleBullet;
                break;
            }
        }
        if(bullet != "not found"){
            bullet.active = true;
            bullet.position.x = startX;
            bullet.position.y = startY;
            bullet.attractionPoint(7, targetX, targetY);
            direction = bullet.getDirection();
            bullet.rotation = direction + 90;
            bullet.setSpeed(7, direction);
        }
    }
}
