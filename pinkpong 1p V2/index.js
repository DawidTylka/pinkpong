const canvas = document.getElementById('can');
const rekord = document.getElementById("rekord");
const ctx = canvas.getContext('2d');
let colortabble = "black"


canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;

const ballSize = 20;

let ballX = cw/2-ballSize/2;
let ballY = ch/2-ballSize/2;

let ballSpeedX =1;
let ballSpeedY =1;

const paddleHeight = 100;
const paddleWidth = 20;

const playerX = 70;
const aiX = cw - playerX - paddleWidth;

let playerY = ch/2 - paddleHeight/2;
let aiY = ch/2 - paddleHeight/2;


const lineWidth = 6;
const lineHeight = 16;
const lineX = cw/2 -lineWidth/2;

let rekordwyn = 0;
rekord.innerHTML = ("Odbyca: 0");

function line() {
for(let marginline = 20;marginline < ch;marginline=lineHeight+marginline+20){
	ctx.fillStyle = "gray";
	ctx.fillRect(lineX,marginline,lineWidth,lineHeight);
}
}
function player() {
	ctx.fillStyle = "pink";
	ctx.fillRect(playerX,playerY,paddleWidth,paddleHeight);
}

function ai() {
	let ile = aiY;
	let spedai = 0;
	if(ballX > cw/2 - ballSize/2){
		spedai = ballSpeedX;
	}else{
		spedai = -ballSpeedX/3;
	}
	if (ballY + ballSize/2 != aiY + paddleHeight/2 ){
		if(ballY + ballSize/2 > aiY + paddleHeight/2){
			ile += spedai;
		}else{
			ile += -spedai;
		}
	}
	if(ile >= 0 && ile <= ch - paddleHeight){
	aiY = ile;
	}
	ctx.fillStyle = "white";
	ctx.fillRect(aiX,aiY,paddleWidth,paddleHeight);
	
}

function tablecolor() {
if(ballSpeedX > 10 )
		{
			switch (colortabble)
			{
				case "black":
				colortabble = "pink";
				break;
				
				case "red":
				colortabble = "pink";
				break;
				
				case "pink":
				colortabble = "orange";
				break;
				
				case "orange":
				colortabble = "black";
				break;
				
			}
		}
		else
		{
			colortabble = "black";
		}
}

function table() {
			ctx.fillStyle = colortabble;
			ctx.fillRect(0,0,cw,ch);
}

function ball(){
	ctx.fillStyle = "#fff";
	ctx.fillRect(ballX,ballY,ballSize,ballSize);
	
	ballX+=ballSpeedX;
	ballY+=ballSpeedY;
	
		if(ballY <= 0 || ballY >= ch - ballSize)
			{
				ballSpeedY = -ballSpeedY;
				i=0
			}
		if(ballX < playerX + paddleWidth && ballX > playerX - paddleWidth && ballY > playerY - ballSize && ballY < playerY + paddleHeight && i == 0
			|| ballX > aiX - ballSize && ballX < aiX + paddleWidth && ballY > aiY - ballSize && ballY < aiY + paddleHeight && i == 0)
			{
				ballSpeedX = -ballSpeedX;
				i=1;
				rekordwyn++;
				rekord.innerHTML = ("Odbyca: "+rekordwyn);
			}	
		else
		{
			if(ballX <= 0 || ballX >= cw - ballSize )
			{
				ballX = cw/2-ballSize/2;
				ballY = ch/2-ballSize/2;
				ballSpeedY=0;
				ballSpeedX=0;
				rekordwyn=0;
				i=0;
			}
		}
}



function playerPosition(event){
	let topCanvas = canvas.offsetTop;
	let ile = event.clientY - topCanvas - paddleHeight/2;
	if(ile >= 0 && ile <= ch - paddleHeight){
		playerY=ile;
	}
}


function game(){
	table()
	line()
	ball()
	player()
	ai()
}






function speed(){
	if (ballSpeedX > -20 && ballSpeedX < 20){
		
		if(ballSpeedX > 0){
			ballSpeedX++;
			console.log(ballSpeedX);
		}else{
			ballSpeedX--;
			console.log(ballSpeedX);
		}
		
		if(ballSpeedY > 0 ){
			ballSpeedY++;
		}else{
			ballSpeedY--;
		}
		
	}
}

canvas.addEventListener("mousemove",playerPosition)
setInterval(game,1000/100)
setInterval(tablecolor,1000/2)
setInterval(speed,1000 * 4)












