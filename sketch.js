var trex, ground, invisibleGround;
var trex_running, ground_image, cloud_image, obstacle1_image, obstacle2_image, obstacle3_image, obstacle4_image, obstacle5_image, obstacle6_image, cloudGroup, obstacleGroup;

var gamestate = "PLAY";
var score = 0;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  ground_image = loadImage("ground2.png");

  cloud_image = loadImage("cloud.png");

  obstacle1_image = loadImage("obstacle1.png");
  obstacle2_image = loadImage("obstacle2.png");
  obstacle3_image = loadImage("obstacle3.png");
  obstacle4_image = loadImage("obstacle4.png");
  obstacle5_image = loadImage("obstacle5.png");
  obstacle6_image = loadImage("obstacle6.png");

}

function setup() {
  createCanvas(600, 200);

  //create trex sprite
  trex = createSprite(50, 175, 50, 50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;

  trex.addAnimation("collided", trex_collided);

  //create ground sprite
  ground = createSprite(300, 190, 10, 10);
  ground.addImage(ground_image);

  //invisible Ground to support Trex
  invisibleGround = createSprite(300, 195, 600, 5);
  invisibleGround.visible = false;

  cloudGroup = new Group();
  obstacleGroup = new Group();

}

function draw() {
  background(255);
  
  text("Score: " + score, 500, 40); 
  
  if (gamestate == "PLAY") {
    ground.velocityX = -5;

    score = Math.round(World.frameRate/20)+score ;

    //reset ground
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    //jump when the space key is pressed
    if (keyDown("space") && trex.y >= 169 && gamestate == "PLAY") {
      trex.velocityY = -12;
    }

    //add gravity
    trex.velocityY = trex.velocityY + 0.8;

    spawnClouds();
    spawnObstacles();

    //End the game when trex is touching the obstacle
    if (obstacleGroup.isTouching(trex)) {

      gamestate = "END";
    }
  } //end of play

  if (gamestate == "END") {
    ground.velocityX = 0;
    cloudGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    trex.changeAnimation("collided");
    //set lifetime of the game objects so that they are never         destroyed
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
  }

  trex.collide(invisibleGround);






  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600, 100, 40, 10);
    cloud.y = random(50, 150);
    cloud.addImage(cloud_image);
    cloud.scale = 0.5;
    cloud.velocityX = -3;

    //assign lifetime to the variable
    cloud.lifetime = 210;

    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    cloudGroup.add(cloud);

  }

}


function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 172, 10, 40);
    obstacle.velocityX = -6;

    //generate random obstacles
    var rand = Math.round(random(1, 6));

    switch (rand) {
      case 1:
        obstacle.addImage("obstacle1", obstacle1_image);
        break;

      case 2:
        obstacle.addImage("obstacle2", obstacle2_image);
        break;

      case 3:
        obstacle.addImage("obstacle3", obstacle3_image);
        break;

      case 4:
        obstacle.addImage("obstacle4", obstacle4_image);
        break;

      case 5:
        obstacle.addImage("obstacle5", obstacle5_image);
        break;

      case 6:
        obstacle.addImage("obstacle6", obstacle6_image);
        break;

    }

    console.log(rand);

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 210;
    //add each obstacle to the group

    obstacleGroup.add(obstacle);
  }
}