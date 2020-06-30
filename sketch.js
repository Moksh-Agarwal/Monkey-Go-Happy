
var monkey, monkey_run, stone, stone_img, banana, banana_img,jungle, jungleimg;
var ground, invisibleGround,obstacles_group, banana_group;
var gameOver, img, restart, restartImg;
var score;
var PLAY=1;
var END=0;
var gameState= PLAY;
function preload()
{
  jungleimg= loadImage("jungle.jpg");
  banana_img= loadImage("Banana.png");
  stone_img= loadImage("stone.png");
  ground_img= loadImage("ground.jpg");
   monkey_run= loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  restartImg= loadImage("restart.png");
  img= loadImage("gameOver.png");
}


function setup()
{
  createCanvas(800,400);
  jungle= createSprite(150,150,800,400);
  jungle.addImage(jungleimg);
  jungle.scale=2;
  jungle.x= jungle.width/2;
  monkey= createSprite(50,315,20,50);
  monkey.addAnimation("run", monkey_run);
  monkey.scale=0.15;
  fill("black");
  
  invisibleGround= createSprite(50,325,800,5);
  invisibleGround.visible= false;

  ground= createSprite(400,361,800,75);
   fill(0);
  obstacles_group= new Group();
  banana_group= new Group();
  gameOver= createSprite(350, 200)
  gameOver.addImage(img);
  gameOver.scale=0.5;
  gameOver.visible= true;
  restart= createSprite(350,240);
  restart. addImage(restartImg);
  restart.scale=0.5;
  restart.visible= true;
  score=0;
}


function draw()
{
 background("white");
 if(gameState===PLAY)
 {
    if(keyDown("space")&& monkey.y>275)
  {
    monkey.velocityY= -12;
  }
  monkey.velocityY= monkey.velocityY+0.6;
 monkey.collide(invisibleGround);
  if(jungle.x<0)
  {
    jungle.x= jungle.width/2;
  }
  jungle.velocityX=-3;
  spawnObstacles();
  spawnBanana();
  if(monkey.isTouching(banana_group))
     {
     score++;
     monkey.scale= monkey.scale+0.00001;  
       banana_group.destroyEach();
     }
  if(monkey.isTouching(obstacles_group))
     {
     monkey.scale= monkey.scale-0.00001;
       gameState=END;
     }
 }
  else if(gameState===END)
  {
    jungle.velocityX=0;
    obstacles_group.setVelocityXEach(0);
    obstacles_group.setLifetimeEach(-2);
    banana_group.setLifetimeEach(-2);
    banana_group.setVelocityXEach(0);
    monkey.velocityY=0;
    monkey.scale=0.15;
  }
 if(mousePressedOver(restart)&& gameState===END)
 {
   reset();
 }
drawSprites();
}
function spawnObstacles()
{
  if(frameCount%60==0)
  {
     stone = createSprite(800, 315,10,40 );
   stone.addImage(stone_img);
    stone.scale=0.2;
    stone.velocityX= -(10+ score/100);
    
    stone.lifetime=400;
     obstacles_group.add(stone);
    
  }
}
function spawnBanana()
{
  if(frameCount%60==0)
  {
    
     banana = createSprite(800, 140,10,40 );
   banana.y= random(130,155);
    banana.scale=0.05;
    banana.velocityX= -(10+ score/100);
    banana.addImage(banana_img);
    banana.lifetime=400;
     banana_group.add(banana);
    
  }
}
function reset()
{
  
 gameState=PLAY;
gameOver.visible= true;
  restart.visible= true;
 obstacles_group.destroyEach();
 banana_group.destroyEach();
 
 score=0;
}