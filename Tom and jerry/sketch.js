var cat, mouse;
var bg;
var catImage, mouseImage;
var diedCat, sadMouse;

var gameState="START";
var END;

var reset;

var score=0;

var win,winImage;

function preload() {
  catImage=loadAnimation("cat1.png","cat2.png");
  mouseImage=loadAnimation("mouseRun2.png","mouseRun3.png")
  bg=loadImage("road.png")
  obstacle1=loadImage("obstacles1.png");
  obstacle2=loadImage("obstacles2.png");
  obstacle3=loadImage("obstacles3.png");
  obstacle4=loadImage("obstacles4.png");
  //obstacle5=loadImage("obstacles5.png");
  //obstacle6=loadImage("obstacles6.png");

  diedCat=loadAnimation("tom3.png")
  sadMouse=loadAnimation("jerry sad.png")

  resetImage=loadImage("come my friend.png")

  winImage=loadImage("cat4.png")
 
}

function setup() {
  createCanvas(1500,700);
  back=createSprite(750,300,1800,600)
  back.addImage(bg)
  back.velocityX=-3
  back.scale=2
  back.x=back.width/2
  
  cat=createSprite(150, 405, 50, 50);
  cat.addAnimation("catRunning",catImage)
  cat.scale=0.5;

  mouse=createSprite(750,500,50,50)
  mouse.addAnimation("mouseRunning", mouseImage)

  ground=createSprite(750,450,1500,10)
  ground.visible=false

  obstacleGroup=new Group()
}

function draw() {
  background(0);
  if(gameState === "START"){
  score=score+Math.round(frameCount/50)
  
  mouse.scale=1
  
  if(back.x<700){
    back.x=900
  }

  if(keyIsDown( UP_ARROW)){
    cat.velocityY=-8;
  }
  cat.velocityY=cat.velocityY+0.5
  obstacles();
  cat.collide(ground)

  if (obstacleGroup.isTouching(cat)){
    gameState="END"
  }
  if(score>30000){
    cat.x=700
    gameState="END"
    win=createSprite(750,500,50,50)
    win.addImage(winImage)
    cat.destroy();
    mouse.destroy();
  }
  }
  if(gameState==="END"){
    back.velocityX=0;
    cat.x=150
    cat.y=450
    mouse.x=500
    mouse.y=450
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.destroyEach();
    cat.addAnimation("DEADTOM",diedCat)
    cat.changeAnimation("DEADTOM",diedCat)
    cat.scale=0.5;
    mouse.addAnimation("SADMOUSE",sadMouse)
    mouse.changeAnimation("SADMOUSE",sadMouse)
    mouse.scale=0.3
    cat.velocityY=0

  //  reset=createSprite(1200,200,50,50)
  //  reset.addImage(resetImage)
  }
  if(keyIsDown(DOWN_ARROW) && gameState === "END"){
    restart()
  }

  drawSprites();
  textSize(30);
  fill("black")
  text("score :"+score,1300,100)
}

function obstacles(){
  if(frameCount%350 === 0){
    var obstacle=createSprite(1500,500,50,50)
    obstacle.velocityX=-3
    obstacle.scale=0.7
    var rand=Math.round(random(1,4))
    switch(rand){
      case 1:obstacle.addImage(obstacle1)
      break
      case 2:obstacle.addImage(obstacle2)
      break
      case 3:obstacle.addImage(obstacle3)
      break
      case 4:obstacle.addImage(obstacle4)
      break
     }
    obstacleGroup.add(obstacle)
  }
}

function restart(){
  gameState="START"
  cat.changeAnimation("catRunning")
  mouse.changeAnimation("mouseRunning")
  mouse.x=750;
  back.velocityX=-3;
  score=0;

}
