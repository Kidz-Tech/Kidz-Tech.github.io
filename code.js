var frame = document.getElementById("frame");
var graphics = frame.getContext("2d");

document.addEventListener("click", click);

const FPS = 60;

function update(){
	draw();
}

function draw(){
	graphics.clearRect(0, 0, frame.width, frame.height);
}

function click(){

}

setInterval(update, 1000 / FPS);