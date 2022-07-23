const canvas=document.getElementById('game');
const snakegame=canvas.getContext('2d');
let points = 0;
let snakeSpeed = 7;
let tileCount = 20; 
let tileSize = canvas.clientWidth/tileCount - 2;
let headX = 10;
let headY = 10;
let aangX = 5;
let aangY = 5;
let tail = 2;
let xvel = 0;
let yvel = 0;
const snakeParts = [];
class snakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    }

document.body.addEventListener('keydown', event => {
    // up
    if(event.keyCode==38){
        if(yvel==1)
        return;
        yvel=-1;
        xvel=0;   
    }
    // down
    if(event.keyCode==40){
        if(yvel==-1)
        return;
        yvel=1;
        xvel=0;
    }
    //left
    if(event.keyCode==37){
        if(xvel==1)
        return;
        yvel=0;
        xvel=-1;
    }
    //right
    if(event.keyCode==39){
        if(xvel==-1)
        return;
        yvel=0;
        xvel=1;
    }
 });

    function drawGame() {
    changeSnakePosition();
    let result=isGameOver();
    if (result) {
        return;
    }
    clearScreen();
    drawSnake();
    drawApple();
    checkCollision()
    drawpoints();
    setTimeout(drawGame, 1000/snakeSpeed)
}

function isGameOver() {
    let gameOver = false; 
    if (yvel === 0 && xvel === 0) {
        return false;
    }
    // left wall
    if (headX < 0) {
        gameOver = true;
    }
    //  right wall
    else if (headX === tileCount + 4) {
        gameOver = true;
    }
    // top wall
    else if (headY < 0) {
        gameOver = true;
    }
    // bottom wall
    else if (headY === tileCount + 4) {
        gameOver = true;
    }

    // collision into self
    for (let i = 0; i < snakeParts.length; i++) {
         let part = snakeParts[i];
         if (part.x === headX && part.y === headY) {
             gameOver = true;
             break;
         }
     }
    
    if (gameOver) {
     snakegame.fillStyle = "white";
     snakegame.font = "50px verdana";
     snakegame.fillText("Game Over! ", canvas.clientWidth/6.5, canvas.clientHeight/2);//position our text in center
     let newbut = snakegame.createElement("button")
     newbut.fillStyle = "white"
     snakegame.appendChild(newbut)
    }

    return gameOver
}

function drawpoints() {
snakegame.fillStyle = "white"
snakegame.font = "25px Questrial"
snakegame.fillText("Points: " + points, canvas.clientWidth-110, 35)
}

function clearScreen() {
snakegame.fillStyle = 'black'
snakegame.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
}

function drawSnake() {
    
    snakegame.fillStyle = "darkred";
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i]
         snakegame.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }
    snakeParts.push(new snakePart(headX, headY))
    if (snakeParts.length > tail) {
        snakeParts.shift()

    }
    snakegame.fillStyle = "orange";
    snakegame.fillRect(headX * tileCount,headY * tileCount, tileSize, tileSize)
 }

function changeSnakePosition() {
     headX = headX + xvel;
     headY = headY + yvel;
 }

function drawApple() {
     var img = new Image();
     img.src = 'static/aang.png' 
    //  img.onload = function() {
        var pattern = snakegame.createPattern(img, "no-repeat")
        snakegame.fillStyle = "lightblue"
        snakegame.fill()
    //  }
    //  snakegame.drawImage(img, 10, 10, 30, 30)
    //  snakegame.fillStyle="red";
     snakegame.fillRect(aangX * tileCount, aangY * tileCount, tileSize, tileSize)
 }
function checkCollision() {
     if (aangX == headX && aangY == headY) {
         aangX = Math.floor(Math.random() * tileCount);
         aangY = Math.floor(Math.random() * tileCount);
         tail++;
         points++;
     }
 }

 drawGame(); 
 