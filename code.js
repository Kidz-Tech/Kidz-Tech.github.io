var frame = document.getElementById("frame");
var graphics = frame.getContext("2d");

document.addEventListener("click", click);

const FPS = 60;
var points = 0;
var scoreTime = 0;
var animationTime = 0;
var playerAnimation = ["GameSprites/player1.png", "GameSprites/player2.png", "GameSprites/player3.png", "GameSprites/player4.png", "GameSprites/player5.png"];
var dogAnimation = ["GameSprites/dog1.png", "GameSprites/dog2.png", "GameSprites/dog3.png", "GameSprites/dog4.png", "GameSprites/dog5.png"];
var playerFrame = 0;
var dogFrame = 0;

var dogs = [];
var backImage = new Image();
var replayImage = new Image();

var player = {
	size: 64,
	x: 100,
	y: 250,
	jumping: false,
	falling: true,
	maxJumpSpeed: 0,
	jumpOriginalValue: 12,
	jumpSpeed: 12,
	jumpAcceleration: 0.4,
	fallSpeed: 0,
	fallAcceleration: 0.6,
	alive: false,
	image: new Image(),
	light: new Image()
}

var building1 = {
	x: 0,
	y: 350,
	size: 2313,
	speed: 4,
	image: new Image()
}

var building2 = {
	x: 2314,
	y: 350,
	size: 1155,
	speed: 4,
	image: new Image()
}

function dog(x){
	this.x = x;
	this.y = 286;
	this.size = 64;
	this.speed = 6;
	this.image = new Image();
}

replayImage.src = "GameSprites/replay.png";
backImage.src = "GameSprites/background.png";
player.light.src = "GameSprites/light.png";
building1.image.src = "GameSprites/building1.png";
building2.image.src = "GameSprites/building2.png";

function update(){
	draw();
	if(player.alive){
		updatePlayer();
		updateBuilding();
		updateDogs();
		checkBottomCollision();
		checkPlayerCollision();
		trackTime();
	}
}

function draw(){
	graphics.clearRect(0, 0, frame.width, frame.height);
	graphics.drawImage(backImage, 0, 0);
	graphics.drawImage(building1.image, building1.x, building1.y);
	graphics.drawImage(building2.image, building2.x, building2.y);
	graphics.drawImage(player.light, player.x - 15, player.y - 15);
	graphics.drawImage(player.image, player.x, player.y);
	graphics.font = "bold 40px Helvetica";
	graphics.fillStyle = "white";
	graphics.textAlign = "center";
	graphics.fillText(points, frame.width / 2, 100);
	drawDogs();
	if(player.alive == false){
		graphics.drawImage(replayImage, 0, 0);
	}
}

function drawDogs(){
	for(i = 0; i < dogs.length; i++){
		graphics.drawImage(dogs[i].image, dogs[i].x, dogs[i].y);
	}
}

function checkBottomCollision(){
	if(player.y + player.size >= building1.y){
		player.falling = false;
		player.y = building1.y - player.size;
		player.fallSpeed = 0;
		player.jumpSpeed = player.jumpOriginalValue;
	}
}

function checkPlayerCollision(){
	var reduction = 10;
	for(i = 0; i < dogs.length; i++){
		var testDog = dogs[i];
		if(testDog.x + reduction < player.x + player.size - reduction &&
			testDog.x + testDog.size - reduction > player.x + reduction &&
			testDog.y + reduction < player.y + player.size - reduction &&
			testDog.y + testDog.size - reduction > player.y + reduction){
			player.alive = false;
		}
	}
}

function updatePlayer(){
	if(player.jumping == true){
		if(player.jumpSpeed > player.maxJumpSpeed){
			player.y = player.y - player.jumpSpeed;
			player.jumpSpeed = player.jumpSpeed - player.jumpAcceleration;
		}
		else{
			player.jumpSpeed = player.jumpOriginalValue;
			player.jumping = false;
			player.falling = true;
		}
	}
	else if(player.falling == true){
		player.y = player.y + player.fallSpeed;
		player.fallSpeed = player.fallSpeed + player.fallAcceleration;
	}
}

function updateBuilding(){
	if(building1.x + building1.size < 0){
		building1.x = building2.x + building2.size;
	}
	if(building2.x + building2.size < 0){
		building2.x = building1.x + building1.size;
	}
	building1.x = building1.x - building1.speed;
	building2.x = building2.x - building2.speed;
}

function updateDogs(){
	if(dogs.length <= 0){
		dogs.push(new dog(800));
	}
	for(i = 0; i < dogs.length; i++){
		if(dogs[i].x + dogs[i].size < 0){
			dogs[i].x = frame.width;
		}
	}
	for(i = 0; i < dogs.length; i++){
		dogs[i].x = dogs[i].x - dogs[i].speed;
	}
}

function trackTime(){
	if(animationTime == 6){
		managePlayerAnimation();
		manageDogAnimation();
		animationTime = 0;
	}
	if(scoreTime == 100){
		points = points + 1;
		scoreTime = 0;
	}
	animationTime = animationTime + 1;
	scoreTime = scoreTime + 1;
}

function managePlayerAnimation(){
	if(player.jumping == true){
		player.image.src = playerAnimation[3];
	}
	else if(player.falling == true){
		player.image.src = playerAnimation[3];
	}
	else{
		player.image.src = playerAnimation[playerFrame];
		playerFrame = playerFrame + 1;
		if(playerFrame > playerAnimation.length - 1){
			playerFrame = 0;
		}
	}
}

function manageDogAnimation(){
	for(i = 0; i < dogs.length; i++){
		dogs[i].image.src = dogAnimation[dogFrame];
	}
	dogFrame = dogFrame + 1;
	if(dogFrame > dogAnimation.length - 1){
		dogFrame = 0;
	}
}

function restartGame(){
	player.alive = true;
	points = 0;
	dogs = [];
}

function click(){
	if(player.alive){
		if(player.jumping == false && player.falling == false){
			player.jumping = true;
		}
	}
	else{
		restartGame();
	}
}

setInterval(update, 1000 / FPS);