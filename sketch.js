var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database,Position;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {

  database = firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonPosition = database.ref("balloon/Position");
    balloonPosition.on("value",readPosition,showError);

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(Position !== undefined){

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
     changePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
     changePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
    changePosition(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
    changePosition(0,1);
  }
  }

  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);

  drawSprites();
}  

function changePosition(x,y){
   
    database.ref("balloon/Position").set({
        x:position.x + x , 
        y:position.y + y
    })
}

function readPosition(data){

    Position = data.val();
    balloon.x = Position.x;
    balloon.y = Position.y;
}

function showError(){

console.log("error reading the database");

}