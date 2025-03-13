//Highscore: 330

//GLOBAL VARIABLES
//Background
let sprBg;
//Background Walls
let sprBgWalls;
//Player
let sprPlayer;
let playerMode="normal";
let playerHp=100;
let playerSpeed=2;
let score=0;
//Zombies
let sprZomb1;
let sprZomb2;
let zomb1Hp=zomb2Hp=zomb1HpPlaceholder=zomb2HpPlaceholder=2;
let zomb1Dmg=zomb2Dmg=1;
let zomb1Speed=zomb2Speed=1;
//Towers
let sprTower1;
let sprTower2;
let tower1Hp=tower2Hp=tower1HpPlaceholder=tower2HpPlaceholder=5;
let tower1Dmg=tower2Dmg=2;
//Ghost
let sprGhost;
let ghostReady=false;
let ghostOn=false;
let ghostDmg=5;
let ghostsPointsCollected=false;
//Potion
let sprPotion;
//Devil X's
let sprDevilSlashPlayer;
let sprDevilSlashEnemy;
//Cover
let sprCover;
let win=0;
let lose=0;
//Bullets
let sprPlayerBullet;
let sprPlayerSpecial;
let sprTower1Bullet;
let sprTower2Bullet;
//Tower Defenders
let sprTower1Defender;
let sprTower2Defender;
//Stats
let dmgDealt=dmgTaken=totHealed=potionsUsed=0;
let zombsKilled=towersKilled=ghostsAvoided=0;
//Cooldowns
let boostCooldown=0;
let playerModeCooldown=0;
let devilAttackCooldown=0;
let tower1Cooldown=0;
let tower2Cooldown=0;
let playerSpecialCooldown=0;
let ghostLifespan=0;
let ghostCooldown=0;
let slashCooldown=0;
//Devil Mode Shading
let sprShader1;
let sprShader2;
//Directions
let directionPlayer;
let directionTower1Bullet;
let directionTower2Bullet;
// All Images
let imgBackground, imgBackgroundWalls;
let imgGhost, imgTower, imgTowerBullet, imgTowerBullet2;
let imgPlayer, imgDevil, imgPlayerBullet;
let imgPlayerBulletLarge, imgDevilBulletLarge;
let imgZombie, imgSlash, imgPlayerSlash;
let imgSlashBlank, imgPlayerSlashBlank;
let imgShader1, imgShader2, imgPotion, imgPotionBlank;

function preload(){
	//Background
	imgBackground=loadImage("Images/Background.png");
	imgBackgroundWalls=loadImage("Images/Background Walls.png");
	//Ghost
	imgGhost=loadImage("Images/Ghost.gif");
	//Tower
	imgTower=loadImage("Images/Tower.png");
	//Tower Bullets
	imgTowerBullet=loadImage("Images/Tower Bullet.png");
	imgTowerBullet2=loadImage("Images/Tower Bullet Transparent.png");
	//Player
	imgPlayer=loadImage("Images/Player.png");
	imgDevil=loadImage("Images/Devil.png");
	//Player Bullets
	imgPlayerBullet=loadImage("Images/Player Bullet.png");
	imgPlayerBulletLarge=loadImage("Images/Player Bullet Large.png");
	imgDevilBulletLarge=loadImage("Images/Devil Bullet Large.png");
	//Zombie
	imgZombie=loadImage("Images/Zombie.png");
	//Devil Slashes
	imgSlash=loadImage("Images/Slash.gif");
	imgPlayerSlash=loadImage("Images/Small Slash.gif");
	imgSlashBlank=loadImage("Images/Slash Blank.png");
	imgPlayerSlashBlank=loadImage("Images/Small Slash Blank.png")
	//Devil Mode Shading
	imgShader1=loadImage("Images/Shader 1.png");
	imgShader2=loadImage("Images/Shader 2.png");
	//Potion
	imgPotion=loadImage("Images/Potion.gif");
	imgPotionBlank=loadImage("Images/Potion Blank.png");
}

function setup(){
	createCanvas(960, 840);
	noStroke();

	//Background
	sprBg=createSprite(480, 420);
	sprBg.addImage(imgBackground);

	//Tower and Player Bullets
	sprTower1Bullet=createSprite(-100, 0);
	sprTower1Bullet.addImage(imgTowerBullet);
	sprTower2Bullet=createSprite(-100, 0);
	sprTower2Bullet.addImage(imgTowerBullet);
	sprPlayerBullet=createSprite(-100, 0);
	sprPlayerBullet.addImage(imgPlayerBullet);
	sprPlayerSpecial=createSprite(-500, 0);
	sprPlayerSpecial.addImage("devil", imgDevilBulletLarge);
	sprPlayerSpecial.addImage("player", imgPlayerBulletLarge);

	//Player
	sprPlayer=createSprite(480, 420);
	sprPlayer.addImage("devil", imgDevil);
	sprPlayer.addImage("player", imgPlayer);

	//Potion
	sprPotion=createSprite(480, 420);
	sprPotion.addImage("potion", imgPotion);
	sprPotion.addImage("blank", imgPotionBlank);

	//Zombs
	sprZomb1=createSprite(880, 420);
	sprZomb1.addImage(imgZombie);
	sprZomb2=createSprite(80, 420);
	sprZomb2.addImage(imgZombie);

	//Towers
	sprTower1=createSprite(815, 630);
	sprTower1.addImage(imgTower);
	sprTower2=createSprite(145, 200);
	sprTower2.addImage(imgTower);

	//Tower Defenders
	sprTower1Defender=createSprite(815, 630);
	sprTower1Defender.addImage(imgTowerBullet2);
	sprTower2Defender=createSprite(145, 200);
	sprTower2Defender.addImage(imgTowerBullet2);
	
	//Devil Slashes
	sprDevilSlashEnemy=createSprite(-100, 0);
	sprDevilSlashEnemy.addImage("reg", imgSlash);
	sprDevilSlashEnemy.addImage("blank", imgSlashBlank);
	sprDevilSlashPlayer=createSprite(-100, 0);
	sprDevilSlashPlayer.addImage("reg", imgPlayerSlash);
	sprDevilSlashPlayer.addImage("blank", imgPlayerSlashBlank);

	//Background Walls
	sprBgWalls=createSprite(480, 420);
	sprBgWalls.addImage(imgBackgroundWalls);
	
	//Ghost
	sprGhost=createSprite(-100, 0);
	sprGhost.addImage(imgGhost);
	
	//Devil Mode Shaders
	sprShader1=createSprite(-1000, 0);
	sprShader1.addImage(imgShader1);
	sprShader2=createSprite(-1000, 0);
	sprShader2.addImage(imgShader2);

	sprZomb1.mouseActive=true;
	sprZomb2.mouseActive=true;
	sprTower1.mouseActive=true;
	sprTower2.mouseActive=true;
	//COLLIDERS
	//Tower and Ghost Colliders
	sprTower1.setCollider("rectangle", 0, 5, 50, 50);
	sprTower2.setCollider("rectangle", 0, 5, 50, 50);
	sprGhost.setCollider("rectangle", 0, -5, 70, 70);
	//Bullet Colliders
	sprTower1Bullet.setCollider("circle", 0, 0, 20);
	sprTower2Bullet.setCollider("circle", 0, 0, 20);
	sprTower1Defender.setCollider("circle", 0, 0, 20);
	sprTower2Defender.setCollider("circle", 0, 0, 20);
	sprPlayerBullet.setCollider("circle", 0, 0, 25);
	sprPlayerSpecial.setCollider("circle", 0, 0, 50);
}

function draw(){
	//PLAYER KEYS - BOOST AND PLAYERMODE
	//Player Boosts Health
	if(keyIsDown(87) && score>=10 && boostCooldown===0 && playerHp<100){
		boostCooldown=60;
		score-=10;
		playerHp+=30;
		potionsUsed+=1;
		if(playerHp>100){
			totHealed-=(playerHp-100);
		}
		totHealed+=30;
		imgPotion=loadImage("Potion.gif");
		sprPotion.addImage("potion", imgPotion);
		sprPotion.changeImage("potion");
		if(playerHp>100){
			playerHp=100;
		}
	}
	if(boostCooldown>0){
		boostCooldown-=1;
	}
	if(boostCooldown===0){
		sprPotion.changeImage("blank");
	}
	sprPotion.position.x=sprPlayer.position.x;
	sprPotion.position.y=sprPlayer.position.y;
	//Player Mode (Normal/Devil)
	if(playerMode==="normal"){
		sprPlayer.changeImage("player");
		playerSpeed=2;
	}else{
		sprPlayer.changeImage("devil");
		playerSpeed=4;
	}
	if(keyIsDown(32) && playerModeCooldown===0){
		playerModeCooldown=60;
		if(playerMode==="normal"){
			playerMode="devil";
			sprShader1.position.x=480;
			sprShader1.position.y=410;
			sprShader2.position.x=-480;
			sprShader2.position.y=410;
		}else{
			playerMode="normal";
			sprShader1.position.x=-1000;
			sprShader2.position.y=-1000;
		}
	}
	if(playerModeCooldown>0){
		playerModeCooldown-=1;
	}

	//ZOMBIES
	//Zombie Movement
	sprZomb1.velocity.x=sprZomb1.velocity.y=0;
	sprZomb1.attractionPoint(zomb1Speed, sprPlayer.position.x, sprPlayer.position.y);
	sprZomb2.velocity.x=sprZomb2.velocity.y=0;
	sprZomb2.attractionPoint(zomb2Speed, sprPlayer.position.x, sprPlayer.position.y);
	//Zombie Collisions
	if(sprZomb1.overlap(sprPlayer)){
		playerHp-=zomb1Dmg;
		dmgTaken+=zomb1Dmg;
		zomb1Respawn();
	}
	if(sprZomb2.overlap(sprPlayer)){
		playerHp-=zomb2Dmg;
		dmgTaken+=zomb1Dmg;
		zomb2Respawn();
	}
	if(sprZomb1.overlap(sprPlayerBullet)){
		sprPlayerBullet.position.x=-100;
		sprPlayerBullet.position.y=0;
		sprPlayerBullet.velocity.x=0;
		zomb1Hp-=5;
		dmgDealt+=5;
	}
	if(sprZomb2.overlap(sprPlayerBullet)){
		sprPlayerBullet.position.x=-100;
		sprPlayerBullet.position.y=0;
		sprPlayerBullet.velocity.x=0;
		zomb2Hp-=5;
		dmgDealt+=5;
	}
	//Zombie Respawn
	if(zomb1Hp<=0){
		zombsKilled+=1;
		score+=5;
		zomb1Respawn();
		zomb1Hp=zomb1HpPlaceholder;
		zomb1Hp+=1;
		zomb1HpPlaceholder+=2;
		zomb1Dmg+=1;
		if(zomb1Speed<3){
			zomb1Speed+=1;
		}
	}
	if(zomb2Hp<=0){
		zombsKilled+=1;
		score+=5;
		zomb2Respawn();
		zomb2Hp=zomb2HpPlaceholder;
		zomb2Hp+=1;
		zomb2HpPlaceholder+=2;
		zomb2Dmg+=1;
		if(zomb2Speed<3){
			zomb2Speed+=1;
		}
	}

	//TOWERS - TOWERS, BULLETS, and DEFENDERS
	//Tower Bullets - Movement and Collisions
	if(sprTower1Bullet.position.x===-100 && tower1Cooldown===0){
		tower1Cooldown=60;
		sprTower1Bullet.position.y=sprTower1.position.y+10;
		sprTower1Bullet.position.x=sprTower1.position.x;
		tower1TargetY=sprPlayer.position.y;
		tower1TargetX=sprPlayer.position.x;
		sprTower1Bullet.attractionPoint(3, tower1TargetX, tower1TargetY);
		directionTower1Bullet=sprTower1Bullet.getDirection();
	}
	if(tower1Cooldown>0){
		tower1Cooldown-=1;
	}
	sprTower1Bullet.velocity.x=0;
	sprTower1Bullet.velocity.y=0;
	if(sprTower1Bullet.position.x!=-100){
		sprTower1Bullet.setSpeed(3, directionTower1Bullet);
	}
	if(sprTower1Bullet.position.x<=55 || sprTower1Bullet.position.x>=905){
		sprTower1Bullet.position.x=-100;
		sprTower1Bullet.position.y=0;
		sprTower1Bullet.velocity.x=0;
	}
	if(sprTower1Bullet.position.y<=125 || sprTower1Bullet.position.y>=695){
		sprTower1Bullet.position.x=-100;
		sprTower1Bullet.position.y=0;
		sprTower1Bullet.velocity.x=0;
	}
	if(sprTower2Bullet.position.x===-100 && tower2Cooldown===0){
		tower2Cooldown=60;
		sprTower2Bullet.position.y=sprTower2.position.y+10;
		sprTower2Bullet.position.x=sprTower2.position.x;
		tower2TargetY=sprPlayer.position.y;
		tower2TargetX=sprPlayer.position.x;
		sprTower2Bullet.attractionPoint(3, tower2TargetX, tower2TargetY);
		directionTower2Bullet=sprTower2Bullet.getDirection();
	}
	if(tower2Cooldown>0){
		tower2Cooldown-=1;
	}
	sprTower2Bullet.velocity.x=0;
	sprTower2Bullet.velocity.y=0;
	if(sprTower2Bullet.position.x!=-100){
		sprTower2Bullet.setSpeed(3, directionTower2Bullet);
	}
	if(sprTower2Bullet.position.x<=55 || sprTower2Bullet.position.x>=905){
		sprTower2Bullet.position.x=-100;
		sprTower2Bullet.position.y=0;
		sprTower2Bullet.velocity.x=0;
	}
	if(sprTower2Bullet.position.y<=125 || sprTower2Bullet.position.y>=695){
		sprTower2Bullet.position.x=-100;
		sprTower2Bullet.position.y=0;
		sprTower2Bullet.velocity.x=0;
	}
	if(sprTower1Bullet.overlap(sprPlayer)){
		sprTower1Bullet.position.x=-100;
		sprTower1Bullet.position.y=0;
		sprTower1Bullet.velocity.x=0;
		playerHp-=tower1Dmg;
		dmgTaken+=tower1Dmg;
	}
	if(sprTower2Bullet.overlap(sprPlayer)){
		sprTower2Bullet.position.x=-100;
		sprTower2Bullet.position.y=0;
		sprTower2Bullet.velocity.x=0;
		playerHp-=tower2Dmg;
		dmgTaken+=tower2Dmg;
	}
	//Tower Collisions
	if(sprTower1.overlap(sprPlayerBullet)){
		sprPlayerBullet.position.x=-100;
		sprPlayerBullet.position.y=0;
		sprPlayerBullet.velocity.x=0;
		tower1Hp-=5;
		dmgDealt+=5;
	}
	if(sprTower2.overlap(sprPlayerBullet)){
		sprPlayerBullet.position.x=-100;
		sprPlayerBullet.position.y=0;
		sprPlayerBullet.velocity.x=0;
		tower2Hp-=5;
		dmgDealt+=5;
	}
	//Tower Respawn
	if(tower1Hp<=0){
		towersKilled+=1;
		tower1Dmg+=1;
		tower1Hp=tower1HpPlaceholder;
		tower1Hp+=1;
		tower1HpPlaceholder+=1;
		score+=7;
		if(sprPlayer.position.x>480){
			sprTower1.position.x=random(60, 465);
		}else{
			sprTower1.position.x=random(495, 900)
		}
		sprTower1.position.y=random(130, 620);
	}
	if(tower2Hp<=0){
		towersKilled+=1;
		tower2Dmg+=1;
		tower2Hp=tower2HpPlaceholder;
		tower2HpPlaceholder+=1;
		tower2Hp+=1;
		score+=7;
		if(sprPlayer.position.x>480){
			sprTower2.position.x=random(60, 465);
		}else{
			sprTower2.position.x=random(495, 900)
		}
		sprTower2.position.y=random(130, 620);
	}
	//Tower Defender Movement
	sprTower1Defender.attractionPoint(1, sprTower1.position.x+random(-30, 31), sprTower1.position.y+random(-30, 31));
	if(sprTower1Defender.velocity.x>10 || sprTower1Defender.velocity.x<-10){
		sprTower1Defender.velocity.x=0;
	}
	if(sprTower1Defender.velocity.y>10 || sprTower1Defender.velocity.y<-10){
		sprTower1Defender.velocity.y=0;
	}
	sprTower2Defender.attractionPoint(1, sprTower2.position.x+random(-30, 31), sprTower2.position.y+random(-30, 31));
	if(sprTower2Defender.velocity.x>10 || sprTower2Defender.velocity.x<-10){
		sprTower2Defender.velocity.x=0;
	}
	if(sprTower2Defender.velocity.y>10 || sprTower2Defender.velocity.y<-10){
		sprTower2Defender.velocity.y=0;
	}
	if(sprTower1Defender.overlap(sprPlayer)){
		sprTower1Defender.position.x=sprTower1.position.x;
		sprTower1Defender.position.y=sprTower1.position.y;
		playerHp-=Math.round(tower1Dmg/2);
		dmgTaken+=Math.round(tower1Dmg/2);
	}
	if(sprTower2Defender.overlap(sprPlayer)){
		sprTower2Defender.position.x=sprTower2.position.x;
		sprTower2Defender.position.y=sprTower2.position.y;
		playerHp-=Math.round(tower2Dmg/2);
		dmgTaken+=Math.round(tower2Dmg/2);
	}

	//GHOST
	if(score>=100 && ghostReady===false){
		ghostReady=true;
	}
	if(ghostLifespan>0){
		ghostLifespan-=1;
	}
	if(ghostCooldown>0){
		ghostCooldown-=1;
	}
	//Ghost Spawning
	if(ghostCooldown===0 && ghostReady===true){
		ghostPointsCollected=false;
		ghostCooldown=1200;
		ghostLifespan=500;
		sprGhost.position.y=420;
		sprGhost.position.x=480;
	}
	//Ghost Movement
	if(ghostLifespan>0 && ghostReady===true){
		sprGhost.velocity.x=0;
		sprGhost.velocity.y=0;
		sprGhost.attractionPoint(1, sprPlayer.position.x, sprPlayer.position.y);
	}
	//Ghost Death
	if(ghostLifespan===0 && ghostReady===true && ghostPointsCollected==false){
		ghostPointsCollected=true;
		score+=7;
		ghostsAvoided+=1;
	}
	//Ghost Collides Player
	if(sprGhost.overlap(sprPlayer) && ghostLifespan>0){
		ghostLifespan=0;
		playerHp-=ghostDmg;
		dmgTaken+=ghostDmg;
		sprGhost.position.x=-100;
		sprGhost.position.y=-100;
		sprGhost.velocity.x=0;
		sprGhost.velocity.y=0;
	}
	//PLAYER
	//Player Movement
	if(keyIsDown(38) && sprPlayer.position.y>80){
		sprPlayer.position.y-=playerSpeed;
		if(sprPlayer.position.y<80){
			sprPlayer.position.y=80;
		}
	}
	if(keyIsDown(40) && sprPlayer.position.y<670){
		sprPlayer.position.y+=playerSpeed;
		if(sprPlayer.position.y>670){
			sprPlayer.position.y=670;
		}
	}
	if(keyIsDown(37) && sprPlayer.position.x>60){
		sprPlayer.position.x-=playerSpeed;
		if(sprPlayer.position.x<60){
			sprPlayer.position.x=60;
		}
	}
	if(keyIsDown(39) && sprPlayer.position.x<900){
		sprPlayer.position.x+=playerSpeed;
		if(sprPlayer.position.y>900){
			sprPlayer.position.y=900;
		}
	}
	//Player Attack
	if(mouseIsPressed){
		if(playerMode==="normal" && sprPlayerBullet.position.x===-100){
			sprPlayerBullet.position.x=sprPlayer.position.x;
			sprPlayerBullet.position.y=sprPlayer.position.y;
			targetX=mouseX;
			targetY=mouseY;
			sprPlayerBullet.attractionPoint(7, targetX, targetY);
			directionPlayer=sprPlayerBullet.getDirection();
		}else if(playerMode==="devil" && devilAttackCooldown===0){
			devilAttackCooldown=15;
			slashCooldown=12;
			if(sprZomb1.mouseIsPressed){
				sprDevilSlashEnemy.position.x=sprZomb1.position.x;
				sprDevilSlashEnemy.position.y=sprZomb1.position.y;
				zomb1Hp-=20;
				dmgDealt+=20;
				playerHp-=3;
				dmgTaken+=3;
			}else if(sprZomb2.mouseIsPressed){
				sprDevilSlashEnemy.position.x=sprZomb2.position.x;
				sprDevilSlashEnemy.position.y=sprZomb2.position.y;
				zomb2Hp-=20;
				dmgDealt+=20;
				playerHp-=3;
				dmgTaken+=3;
			}else if(sprTower1.mouseIsPressed){
				sprDevilSlashEnemy.position.x=sprTower1.position.x;
				sprDevilSlashEnemy.position.y=sprTower1.position.y;
				tower1Hp-=20;
				dmgDealt+=20;
				playerHp-=3;
				dmgTaken+=3;
			}else if(sprTower2.mouseIsPressed){
				sprDevilSlashEnemy.position.x=sprTower2.position.x;
				sprDevilSlashEnemy.position.y=sprTower2.position.y;
				tower2Hp-=20;
				dmgDealt+=20;
				playerHp-=3;
				dmgTaken+=3;
			}else{
				devilAttackCooldown=0;
				slashCooldown=0;
			}
			
		}
	}
	sprPlayerBullet.velocity.x=0;
	sprPlayerBullet.velocity.y=0;
	if(sprPlayerBullet.position.x!=-100){
		sprPlayerBullet.setSpeed(7, directionPlayer);
	}
	if(sprPlayerBullet.position.x<=55 || sprPlayerBullet.position.x>=905){
		sprPlayerBullet.position.x=-100;
		sprPlayerBullet.velocity.x=0;
	}
	if(sprPlayerBullet.position.y<=125 || sprPlayerBullet.position.y>=695){
		sprPlayerBullet.position.x=-100;
		sprPlayerBullet.velocity.x=0;
	}
	sprPlayerBullet.bounce(sprTower1Bullet);
	directionTower1Bullet=sprTower1Bullet.getDirection();
	sprPlayerBullet.bounce(sprTower2Bullet);
	directionTower2Bullet=sprTower2Bullet.getDirection();
	//Devil Mode Slashes
	sprDevilSlashPlayer.position.x=sprPlayer.position.x+5;
	sprDevilSlashPlayer.position.y=sprPlayer.position.y+15;
	if(slashCooldown===0){
		sprDevilSlashPlayer.changeImage("blank");
		sprDevilSlashEnemy.changeImage("blank");
	}
	if(slashCooldown===12){
		sprDevilSlashPlayer.addImage("reg", imgPlayerSlash);
		sprDevilSlashPlayer.changeImage("reg");
		sprDevilSlashEnemy.addImage("reg", imgSlash);
		sprDevilSlashEnemy.changeImage("reg");
	}
	//Devil Mode Attack Cooldown
	if(devilAttackCooldown>0){
		devilAttackCooldown-=1;
	}
	if(slashCooldown>0){
		slashCooldown-=1;
	}
	//Player Special Usage
	if(keyIsDown(83) && playerSpecialCooldown===0){
		playerSpecialCooldown=600;
		sprPlayerSpecial.position.x=sprPlayer.position.x;
		sprPlayerSpecial.position.y=sprPlayer.position.y;
		if(playerMode==="normal"){
			sprPlayerSpecial.changeImage("player");
		}else{
			sprPlayerSpecial.changeImage("devil");
		}
		specialTargetX=mouseX;
		specialTargetY=mouseY;
		sprPlayerSpecial.attractionPoint(5, specialTargetX, specialTargetY);
		directionSpecial=sprPlayerSpecial.getDirection();
	}
	sprPlayerSpecial.velocity.x=0;
	sprPlayerSpecial.velocity.y=0;
	if(sprPlayerSpecial.position.x!=-500){
		sprPlayerSpecial.setSpeed(5, directionSpecial);
	}
	if(sprPlayerSpecial.position.x<-200 || sprPlayerSpecial.position.y>920){
		sprPlayerSpecial.position.x=-500
		sprPlayerSpecial.position.y=0
		sprPlayerSpecial.velocity.x=0;
	}
	if(playerSpecialCooldown>0){
		playerSpecialCooldown-=1;
	}
	//Player Special Collisions
	//bounces bullets
	sprPlayerSpecial.bounce(sprTower1Bullet);
	directionTower1Bullet=sprTower1Bullet.getDirection();
	sprPlayerSpecial.bounce(sprTower2Bullet);
	directionTower2Bullet=sprTower2Bullet.getDirection();
	//bounces enemies
	if(sprPlayerSpecial.overlap(sprZomb1)){
		sprPlayerSpecial.displace(sprZomb1);
		zomb1Hp-=1;
		dmgDealt+=1;
	}
	if(sprPlayerSpecial.overlap(sprZomb2)){
		sprPlayerSpecial.displace(sprZomb2);
		zomb1Hp-=1;
		dmgDealt+=1;
	}
	if(sprPlayerSpecial.overlap(sprTower1)){
		sprPlayerSpecial.displace(sprTower1);
		tower1Hp-=1;
		dmgDealt+=1;
	}
	if(sprPlayerSpecial.overlap(sprTower2)){
		sprPlayerSpecial.displace(sprTower2);
		tower2Hp-=1;
		dmgDealt+=1;
	}

	//ON-SCREEN EFFECTS AND LETTERING
	//Devil Mode Shader Movement
	if(playerMode==="devil"){
		sprShader1.velocity.x=3;
		sprShader2.velocity.x=3;
	}else{
		sprShader1.velocity.x=0;
		sprShader2.velocity.x=0;
	}
	if(sprShader1.position.x>=1440){
		sprShader1.position.x=-480;
	}
	if(sprShader2.position.x>=1440){
		sprShader2.position.x=-480;
	}
	//Draw Sprites
	drawSprites();
	//Cover-Up
	fill(0);
	rect(0, 760, 960, 60);
	//Health Bars
	noStroke();
	zomb1HpPercentage=zomb1Hp/zomb1HpPlaceholder;
	fill(255-(255*zomb1HpPercentage), 0+(255*zomb1HpPercentage), 0);
	rect(15, 765, 215*zomb1HpPercentage, 25);
	zomb2HpPercentage=zomb2Hp/zomb2HpPlaceholder;
	fill(255-(255*zomb2HpPercentage), 0+(255*zomb2HpPercentage), 0);
	rect(15, 805, 215*zomb2HpPercentage, 25);
	tower1HpPercentage=tower1Hp/tower1HpPlaceholder;
	fill(255-(255*tower1HpPercentage), 0+(255*tower1HpPercentage), 0);
	rect(245, 765, 215*tower1HpPercentage, 25);
	tower2HpPercentage=tower2Hp/tower2HpPlaceholder;
	fill(255-(255*tower2HpPercentage), 0+(255*tower2HpPercentage), 0);
	rect(245, 805, 215*tower2HpPercentage, 25);
	textAlign(LEFT);
	textSize(25);
	textFont("Impact");
	fill(255);
	text("Zombie", 20, 788);
	text("Zombie", 20, 828);
	text("Tower", 250, 788);
	text("Tower", 250, 828);
	playerHpPercentage=playerHp/100;
	fill(255-(255*playerHpPercentage), 0+(255*playerHpPercentage), 0);
	if(playerHp>=0){
		rect(475, 765, 180*playerHpPercentage, 65);
	}
	fill(255);
	textSize(65);
	text("Player", 480, 820);
	textSize(35);
	text("Score: "+score, 670, 820);
	//Title + Instructions
	textSize(45);
	textFont("Arial Black");
	fill(64);
	text("The Devil in Me", 12, 47);
	fill(100, 0, 0);
	text("The Devil in Me", 10, 45);
	fill(150);
	textSize(15);
	text("Arrows to Move | Click to Shoot (Click enemy in Devil Mode)", 410, 20);
	text("Space to toggle Devil Mode | W to trade 10 points for 30 health", 410, 40);
	text("S for special, cooldown is the lightning symbol in bottom-right", 410, 60);
	//Player Special Cooldown
	fill(50, 50, 100);
	rect(850, 765, 100, 65);
	fill(0+(255*(playerSpecialCooldown/600)), 0, 255-(255*(playerSpecialCooldown/600)));
	rect(850, 765, 100-(100*(playerSpecialCooldown/600)), 65);
	fill(0);
	beginShape();
	vertex(850, 765);
	vertex(850, 780);
	vertex(905, 790);
	vertex(900, 770);
	vertex(950, 783);
	vertex(950, 765);
	endShape(CLOSE);

	beginShape();
	vertex(850, 830);
	vertex(850, 780);
	vertex(930, 820);
	vertex(925, 800);
	vertex(950, 805);
	vertex(950, 830);
	endShape(CLOSE);

	if(playerHp<=0){
		gameOver();
		asdfl;kskflas;dlfk
	}
}

//OTHER FUNCTIONS
function zomb1Respawn(){
	if(sprPlayer.position.x>480){
		sprZomb1.position.x=random(60, 440);
	}else{
		sprZomb1.position.x=random(520, 900);
	}
	if(sprPlayer.position.y>420){
		sprZomb1.position.y=random(80, 400);
	}else{
		sprZomb1.position.y=random(440, 670);
	}
}

function zomb2Respawn(){
	if(sprPlayer.position.x>480){
		sprZomb2.position.x=random(60, 440);
	}else{
		sprZomb2.position.x=random(520, 900);
	}
	if(sprPlayer.position.y>420){
		sprZomb2.position.y=random(80, 400);
	}else{
		sprZomb2.position.y=random(440, 670);
	}
}

function gameOver(){
	fill(67, 20, 20);
	rect(0, 0, 960, 840);
	fill(35, 5, 5);
	textSize(100);
	textAlign(CENTER);
	text("Game Over", 480, 150);
	textSize(50);
	text("Score: "+score, 480, 220);
	text("Total Damage Dealt: "+dmgDealt, 480, 290);
	text("Total Damage Taken: "+dmgTaken, 480, 360);
	text("Total Healed: "+totHealed, 480, 430);
	text("Potions Used: "+potionsUsed, 480, 500);
	text("Zombies Killed: "+zombsKilled, 480, 570);
	text("Towers Killed: "+towersKilled, 480, 640);
	text("Ghosts Avoided: "+ghostsAvoided, 480, 710);
}
