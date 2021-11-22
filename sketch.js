var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage
var c1,c2,c3,c4,c5,c6;
var cloudsGroup,cactiGroup
var PLAY = 1;
var END = 0;
var gameState=PLAY



function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudImage=loadImage("cloud.png");

 c1=loadImage("obstacle1.png");
 c2=loadImage("obstacle2.png");
 c3=loadImage("obstacle3.png");
 c4=loadImage("obstacle4.png");
 c5=loadImage("obstacle5.png");
 c6=loadImage("obstacle6.png");
}

function setup() {

  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
 
  cloudsGroup=new Group();
  cactiGroup=new Group();

}

function draw() {
  //set background color
  background("white");
  
  //console.log(Math.round(random(4,2010)))
 // console.log(frameCount)
 console.log(11%2)
  if(gameState===PLAY){
 // jump when the space key is pressed
 if(keyDown("space")&& trex.y >= 100) {
  trex.velocityY = -10;
}

trex.velocityY = trex.velocityY + 0.8
ground.velocityX = -4;
if (ground.x < 0){
  ground.x = ground.width/2;
}
spawnCactus()
  spawnClouds();
  if (trex.isTouching(cactiGroup)){
    gamestate=END
  }
  }
  if(gameState===END){
   ground.velocity=0 
  }
  
  //stop trex from falling down
  trex.collide(invisibleGround);

  drawSprites();
  
}
function spawnCactus(){
if (frameCount%100===0){
  cactus=createSprite(600,170,15,15)
  cactus.velocityX=-3
  var whatever= Math.round(random(1,6));
  switch(whatever){
    case 1:cactus.addImage(c1)
    break; 
    case 2:cactus.addImage(c2)
    break;
    case 3:cactus.addImage(c3)
    break;
    case 4:cactus.addImage(c4)
    break;
    case 5:cactus.addImage(c5)
    break;
    case 6:cactus.addImage(c6)
    break;

  }
  cactiGroup.add(cactus)
}
}
function  spawnClouds (){
if(frameCount%Math.round(random(50,120))===0){
  cloud=createSprite(590,30,10,10);
  cloud.velocityX=-3;
  cloud.addImage(cloudImage);
  cloud.lifetime=200
  cloud.y=Math.round(random(10,100))
  trex.depth=cloud.depth;
  trex.depth+=1
  cloudsGroup.add(cloud)
}
}

