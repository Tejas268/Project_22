var helicopterIMG, helicopter, package, wall, z, city, h, packageIMG;
var packageBody, base, static;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG = loadImage("helicopter.png");
	packageIMG = loadImage("package.png");
	city = loadImage("city.jpg")
}

function setup() {

	engine = Engine.create();
	world = engine.world;

	h = windowHeight;

	createCanvas(h, h);
	rectMode(CENTER);

	background = createSprite(h/2,h/2,10,10);
	background.addImage(city);
	background.scale = 2.2;

	packageBody = Bodies.rectangle(-50, 80, 10, 10, {restitution : 1, isStatic : true});
	World.add(world, packageBody);

	package = createSprite(-50, 80, 10,10);
	package.addImage(packageIMG)
	package.scale = 0.2;

	helicopter = createSprite(-50, 80, 10,10);
	helicopter.addImage(helicopterIMG)
	helicopter.scale = 0.6;
	helicopter.velocityX = Math.round(random(4,7));

	wall = createSprite(h - 10, h/2, 10, h);
	wall.visible = false;
	
	//Create a Ground
	base = Bodies.rectangle(h/2, h-40, h, 20, {isStatic : true} );
 	World.add(world, base);


	Engine.run(engine);
	z = 1;
  
}


function draw() {
  rectMode(CENTER);

  helicopter.collide(wall);

  Engine.update(engine);

  rect(packageBody.position.x,packageBody.position.y, 10, 10);
  rect(base.position.x,base.position.y, h, 20);

  if (z === 1) {
	package.x = helicopter.x;
  }

    packageBody.position.x = package.x;
	package.y = packageBody.position.y;

  downKey();
  
  drawSprites();
 
}

function downKey () {

	if (keyCode === DOWN_ARROW) {
		Matter.Body.setStatic(packageBody , false);
		z = 2;
	}
}



