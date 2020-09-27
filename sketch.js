var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var invisibleGround, ground, score, bScore;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,200);
  
//creating monkey
  monkey = createSprite(30,160,30,30);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1
  
//creating ground
  ground = createSprite(0,190, 1200,10);
  ground.x=ground.width/2;
  monkey.setCollider("circle",0,-20,80);
  
  invisibleGround = createSprite(0,172,200,20);
  invisibleGround.visible = false;
  
  score=0
  bScore=0;
  foodGroup=new Group();
  obstacleGroup=new Group();
}


function draw() {
background(240);
drawSprites();
text("Survival Time:"+score,500,20)
text("Banana Eaten:"+bScore,500,35)
  
if(gameState==PLAY){
  createBanana();
  createObstacle();
  monkey.velocityY = monkey.velocityY + 0.5
  ground.velocityX=-3;

if(keyDown("space")&&monkey.y>150){
  monkey.velocityY=-10
}
  
if (ground.x < 0){
  ground.x = ground.width/2;}
  
if(frameCount%10==0){
  score=score+1; 
}

if(foodGroup.isTouching(monkey)){
 bScore=bScore+1 
  foodGroup.destroyEach();
}
  
if(obstacleGroup.isTouching(monkey)){
  gameState=END; 
   
 }
  
  
}
else if(gameState==END){
  foodGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);
  ground.velocityX=0
  monkey.velocityY=0
  text("press 'R' to restart",250,100);
  if(keyDown("r")){
     reset();
     }
}  


monkey.collide(invisibleGround);
  
  }

function createBanana(){
 
   if(frameCount%200==0){
  banana = createSprite(600,50,30,20);
  banana.addImage(bananaImage);
  banana.scale=0.1
  banana.Y=Math.round(random(120,180));
  banana.velocityX=-(4+1*score/100);
  banana.lifeTime=300
  foodGroup.add(banana);
  
   }
}

function createObstacle(){
 if(frameCount%100==0){
  obstacle = createSprite(600,175,30,20);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.1
  obstacle.velocityX=-(4+1*score/100);
  obstacle.lifeTime=300
  obstacleGroup.add(obstacle);
   }//console.log(1);
}

function reset(){
foodGroup.destroyEach();
obstacleGroup.destroyEach();
gameState=PLAY;
bScore=0
score=0
  
  
  
  
  }
