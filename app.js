let canvas = document.querySelector('canvas')

let ctx = canvas.getContext('2d')


let cellSize = 50;
let widthCnvs = 1000;
let heightCnvs = 600;

let score = 0;

let foodCells = foodGenerate();

// considering snake is moving towards right in starting 
let direction  = "right"
let snakeCell = [[0,0] , [50,0] , [100,0] ];


//variable to move the snake
let newHeadX ;
let newHeadY;

function draw(){

  // erase poori board
  ctx.clearRect(0 , 0 , widthCnvs , heightCnvs);
  
  // creating score inside cnavas
  ctx.fillStyle = 'black';
  ctx.font = "20px impact"
  ctx.fillText( "Score : " + score, 50 ,50 )
  
  
  

  // draw
  for(let cell of snakeCell){
    
      ctx.fillStyle = 'red';
      ctx.fillRect(cell[0] , cell[1] , cellSize , cellSize);
  }

 //draw food
 
//  console.log(foodCells[0])
//  console.log(foodCells[1])

  // draw the food
  ctx.fillStyle = "yellow";
  ctx.fillRect(foodCells[0], foodCells[1], cellSize, cellSize);
}

function foodGenerate(){
  
  const x = Math.floor(Math.random() * (widthCnvs / cellSize)) * cellSize;
  const y = Math.floor(Math.random() * (heightCnvs / cellSize)) * cellSize;

  return [x, y];
}

//updating snake after  every 200 ms 
function update(){
 
  let headX = snakeCell[snakeCell.length - 1][0]
  let headY = snakeCell[snakeCell.length - 1][1]

  if (direction == "right") {
    newHeadX = headX + cellSize;
    newHeadY = headY;
  } else if (direction == "down") {
    newHeadX = headX;
    newHeadY = headY + cellSize;
  } else if (direction == "up" && direction != "down") {
    newHeadX = headX;
    newHeadY = headY - cellSize;
  } else if (direction == "left" && direction != "right") {
    newHeadX = headX - cellSize;
    newHeadY = headY;
  }

  //if snake bites itself
  for (let i = 0; i < snakeCell.length - 1; i++) {
    if (snakeCell[i][0] === newHeadX && snakeCell[i][1] === newHeadY) {
      
      alert("<-- GameOver -->")

      resetGame();
      
    }
  }


  snakeCell.push([newHeadX,newHeadY]);
   
  //for regerating of food
  if(foodCells[0]===newHeadX && foodCells[1]===newHeadY){
    foodCells=foodGenerate();
    
    score += 10;
  }
  else{

    snakeCell.shift();
  }


  // for game over
  if(newHeadX < 0 || newHeadX > widthCnvs || newHeadY < 0 || newHeadY > heightCnvs){
    alert("<-- GameOver -->")

    resetGame();
  }


}

// to resart game again fromm starting after game over 
function resetGame(){
   
  snakeCell = [[0,0] , [50,0]];

  foodCells = foodGenerate();

  direction = "right";
  


}

addEventListener('keydown' , function(e){
   
  // console.log(e)  
  if (e.key === "ArrowDown" && direction != "up") {
    direction = "down";
  } else if (e.key === "ArrowUp" && direction != "down") {
    direction = "up";
  } else if (e.key === "ArrowLeft" && direction != "right") {
    direction = "left";
  } else if (e.key === "ArrowRight" && direction != "left") {
    direction = "right";
  }

  
})





setInterval(function(){
    update();

    draw();
    
},200)