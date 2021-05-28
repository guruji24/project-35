var hotAirBalloon,hotAirBalloonImage;
var backgroundImage;
var database,position;


function preload(){
  backgroundImage = loadImage("cityImage.png");
  hotAirBalloonImage = loadImage("hotairballoon1.png");
}


function setup(){
  createCanvas(800,600);

  database = firebase.database();

  hotAirBalloon = createSprite(100,450);
  hotAirBalloon.addImage(hotAirBalloonImage);
  hotAirBalloon.scale = 0.4;

  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value",readPosition,showError);

}


function draw(){
  background(backgroundImage);


  if(keyDown(UP_ARROW)){
      changePosition(0,-3);
  }

  if(keyDown(DOWN_ARROW)){
    changePosition(0,3);
}

if(keyDown(LEFT_ARROW)){
  changePosition(-3,0);
}

if(keyDown(RIGHT_ARROW)){
  changePosition(3,0);
}

  drawSprites();

}



function changePosition(x,y){
  database.ref('balloon/position').set({
      'x':position.x+x,
      'y':position.y+y
  });
}


function readPosition(data){
  position = data.val();
    hotAirBalloon.x = position.x;
    hotAirBalloon.y = position.y;
}


function showError(){
  console.log("disconnected, network error, please try again later");
}