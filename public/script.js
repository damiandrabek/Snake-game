// listeners
document.addEventListener('keydown', keyPush);
// canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const scoreTitle = document.querySelector('h1');
const yourScoreTitle = document.getElementById('yourScore')

// game
let gameIsRunning = true;
const fps = 15;
const tileSize = 50;
let score = 0;

// grid tiles
const tileColor = 'white';
const tileCountX = canvas.width / tileSize;
const tileCountY = canvas.height / tileSize;

// player
const snakeColor = 'black';
let snakePosX = 0;
let snakePosY = canvas.height / 2 ;

let snakeSpeed = tileSize;
let snakeSpeedDirectionX = 0;
let snakeSpeedDirectionY = 0;

const tailColor = '#4a4a4a';
let tail = [];
let snakeLength = 4;

// food
let foodPosX = 0;
let foodPosY = 0;
const foodColor = 'orange';

// MAIN GAME LOOP
function gameLoop(){
    if(gameIsRunning){
        moveStuff();
        drawStuff();
        setTimeout(gameLoop, 1000 / fps);
    }
}
resetFood();
gameLoop();

/* DRAWING */
function drawStuff(){
    //canvas
    drawRectangle("#0066ff", 0, 0, canvas.width, canvas.height);
    //grid
    drawGrid();
    //food
    drawRectangle(foodColor, foodPosX, foodPosY, tileSize, tileSize);
    //tail
    tail.forEach(snakePart =>
        drawRectangle(tailColor, snakePart.x, snakePart.y, tileSize, tileSize)
    )
    //player
    drawRectangle(snakeColor, snakePosX, snakePosY, tileSize, tileSize);    
}
function drawRectangle(color, x, y, width, height,){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}
function drawGrid(){
    for (let i = 0; i < tileCountX; i++) {
        for (let j = 0; j < tileCountY; j++) {
            drawRectangle(tileColor, tileSize * i, tileSize * j, tileSize - 1, tileSize - 1);
        }
    }
}

/* MOVING */
function moveStuff(){
    // player movement
    snakePosX += snakeSpeed * snakeSpeedDirectionX;
    snakePosY += snakeSpeed * snakeSpeedDirectionY;

    // wall collision
    if(snakePosX > canvas.width-tileSize) {
        snakePosX = 0;
    }
    if(snakePosX < 0){
        snakePosX = canvas.width;
    }
    if (snakePosY > canvas.height-tileSize) {
        snakePosY = 0;
    }
    if(snakePosY < 0){
        snakePosY = canvas.height;
    }
    // game over
    tail.forEach(snakePart => {
        if (snakePosX === snakePart.x && snakePosY === snakePart.y) {
            gameOver();
        }
    });
    // tail
    if(snakePosX != 0){
        tail.push({
            x: snakePosX,
            y: snakePosY,
        });
    }
    tail = tail.slice(-1 * snakeLength);
    // food collision
    if(snakePosX === foodPosX && snakePosY === foodPosY){
        scoreTitle.textContent = ++score;
        snakeLength++;
        resetFood();
    }
}
function resetFood(){
    // nowhere to go -> game over
    if(snakeLength === tileCountX * tileCountY){
        gameOver();
    }
    foodPosX = Math.floor(Math.random() * tileCountX) * tileSize;
    foodPosY = Math.floor(Math.random() * tileCountY) * tileSize;
    // don't spawn food on the snake's head
    if(foodPosX === snakePosX && foodPosY === snakePosY){
        resetFood();
    }
    // dont' spawn food on any snake's part
    if(tail.some(snakePart => snakePart.x === foodPosX && snakePart.y === foodPosY)){
        resetFood();
    }
}
// KEYBOARD
function keyPush(event){
    switch(event.key){
        case 'ArrowUp':
            if(snakeSpeedDirectionY != 1){
                snakeSpeedDirectionX = 0;
                snakeSpeedDirectionY = -1;
            }
            break;
        case 'ArrowDown':
            if(snakeSpeedDirectionY != -1){
                snakeSpeedDirectionX = 0;
                snakeSpeedDirectionY = 1;
            }
            break;
        case 'ArrowLeft':
            if(snakeSpeedDirectionX != 1){
                snakeSpeedDirectionX = -1;
                snakeSpeedDirectionY = 0;
            }
            break;
        case 'ArrowRight':
            if(snakeSpeedDirectionX != -1){
                snakeSpeedDirectionX = 1;
                snakeSpeedDirectionY = 0;
            }
            break;
        default:
            // restart game
            if(!gameIsRunning) location.reload();
            break
    }
}
// keyboard restarts game
function gameOver(){
    scoreTitle.innerHTML = `💀 <strong> ${score} </strong> 💀`;
    yourScoreTitle.textContent = '';
    gameIsRunning = false;
}