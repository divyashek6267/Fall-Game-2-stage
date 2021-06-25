var leftWall,rightWall;
var leftWallGroup,rightWallGroup;
var topWall,bottomWall;
var ball,ball_img;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var wallSpeed = -5;
var invisibleLeftEdge,invisibleRightEdge;

function preload(){
  ball_img = loadImage("redBall.png");
}

function setup(){
  createCanvas(400,600);

  ball = createSprite(250,200,20,20);
  ball.addImage("ball",ball_img)
  ball.scale = 0.14;

  leftWallGroup = new Group();
  rightWallGroup = new Group();

  topWall = createSprite(200,0,450,5);
  topWall.visible = false;

  bottomWall = createSprite(200,600,450,5);
  bottomWall.visible = false;

  invisibleLeftEdge = createSprite(0,300,5,800);
  invisibleRightEdge = createSprite(398,300,5,800);

  invisibleLeftEdge.visible = false;
  invisibleRightEdge.visible = false;

  ball.setCollider("circle",0,0,75);
  ball.debug = false
}

function draw(){
  background(255);

  ball.collide(invisibleLeftEdge);
  ball.collide(invisibleRightEdge);

  if(gameState === PLAY){
    
    ball.velocityY = 4;
    
    if(keyDown(LEFT_ARROW)){
      ball.x -= 8;
    }

    if(keyDown(RIGHT_ARROW)){
      ball.x += 8;
    }
      spawnWalls();
      scoring();

      if(ball.isTouching(leftWallGroup)){
      ball.collide(leftWallGroup);
      ball.setVelocity(0,0);
      }

      if(ball.isTouching(rightWallGroup)){
      ball.collide(rightWallGroup);
      ball.setVelocity(0,0);
      }

      if(ball.isTouching(topWall)){
        gameState = END;
        alert("Score : "+score);
      }
      drawSprites();
  }

  if(gameState === END){
      leftWallGroup.setVelocityYEach(0);
      rightWallGroup.setVelocityYEach(0);

      leftWallGroup.setLifetimeEach(-1);
      rightWallGroup.setLifetimeEach(-1);

       drawSprites();
  }
}

function spawnWalls(){

    if(frameCount%17===0){
      var randomWidth = random(50,300);
      leftWall = createSprite(randomWidth/2,600,randomWidth,20);
      leftWall.shapeColor = "black";
      leftWall.velocityY = wallSpeed;

      rightWall = createSprite(randomWidth+40+(400-40-randomWidth)/2,leftWall.y,400-40-randomWidth,20);
      rightWall.shapeColor = "black";
      rightWall.velocityY = leftWall.velocityY;

      leftWall.lifetime = 350;
      rightWall.lifetime = 350;

     leftWall.depth = rightWall.depth;
     ball.depth = rightWall.depth;
     
      leftWallGroup.add(leftWall);
      rightWallGroup.add(rightWall);

    }
}

function scoring(){
  for (var i=0;i<leftWallGroup.length;i++){
    if(ball.y-leftWallGroup[i].y<=4 && ball.y-leftWallGroup[i].y>4+wallSpeed){
      score = score+1;
    }
  }
}