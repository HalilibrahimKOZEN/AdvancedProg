window.onload = function() {


    
    sampleTwoAnimation(1000)
	
	canvas = document.getElementById("test");
    ctx = canvas.getContext("2d");
    setInterval(draw,1000/60);

};
var canvas;
var ctx;
ballX = 90;
ballY = 90;
xVelocity = 2;
yVelocity = 2;
color = "#ccff99";
ballWidth = 15;

function sampleTwoAnimation (value) {
    value = Number(value)
    document.getElementsByClassName("div")[0].animate([
        {transform: 'translateY(0)'},
        {transform: 'translateY(270px)'}
        ], {
        duration: value,
        iterations: Infinity,
        direction: "alternate"
    });

    document.getElementsByClassName("resim")[0].animate([
        {transform: 'rotate(0)'},
        {transform: 'rotate(360deg)'}
        ], {
        duration: value,
        iterations: Infinity
        //direction: "alternate"
    });
}

function checkTime(i) {
    if (i < 10) {i = "0" + i}
    return i
}

function draw() {


ctx.fillStyle = "grey";
ctx.fillRect(0,0,canvas.width,canvas.height);

//Draw The Ball
ctx.beginPath();
ctx.fillStyle = color;
ctx.strokeStyle = "black";
ctx.lineWidth = 3;
ctx.arc(ballX,ballY,ballWidth,0,Math.PI*2, true);
ctx.fill();
ctx.stroke();
ctx.closePath();

//Change Ball Position
ballX += xVelocity;
ballY += yVelocity;

//Bounce Ball Off Left + Choose Color
if(ballX - ballWidth <= 0) {
  xVelocity = -xVelocity;
  changeColor();
}

//Bounce Ball Off Right + Choose Color
if(ballX + ballWidth >= canvas.width) {
  xVelocity = -xVelocity;
  changeColor();
}

//Bounce Ball Off Top + Choose Color
if(ballY - ballWidth <= 0) {
  yVelocity = -yVelocity;
  changeColor();
}

//Bounce Ball Off Bottom + Choose Color
if(ballY + ballWidth >= canvas.height) {
  yVelocity = -yVelocity;
  changeColor();
}

//Randomly Choose Ball Color
function changeColor() {

var x = Math.random()*10;
var nu = Math.ceil(x);

  if(nu == 1) {
    color = "darkred";}
  
  if(nu == 2) {
    color = "orange";}

  if(nu == 3) {
    color = "darkblue";}

  if(nu == 4) {
    color = "turquoise";}

  if(nu == 5) {
    color = "purple";}

  if(nu == 6) {
    color = "lightgreen";}

  if(nu == 7) {
    color = "green";}
  
  if(nu == 8) {
    color = "darkgrey";}

  if(nu == 9) {
    color = "yellow";}
  
  if(nu == 10) {
    color = "pink";}
}

}
