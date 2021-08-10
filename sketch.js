
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var h, helicopter, package, MatterPackage, ground, wall;
var city, packageIMG, hImage;

var gameState = "onHelicopter";


function preload() {
	city = loadImage("city.jpg");
	hImage = loadImage("helicopter.png");
	packageIMG = loadImage("package.png");
}


function setup() {
	h = windowHeight;
	createCanvas(h, h);

	engine = Engine.create();
	world = engine.world;
	console.log(h)

	ground = Bodies.rectangle(h/2, h - 20, h, 20, {'isStatic' : true, 'restitution' : 1});
	World.add(world, ground);

	MatterPackage = Bodies.rectangle(-50, 50, 20, 20);
	World.add(world, MatterPackage);

	wall = createSprite(h - 20, h/2, 20, h);

	package = createSprite(50, 50, 20, 20);
	package.addImage(packageIMG);
	package.scale = 0.9;

	helicopter = createSprite(-50, 50, 20, 20);
	helicopter.addImage(hImage);
	helicopter.scale = 0.8;
	helicopter.velocityX = 10;
}


function draw() {
	background(city);
	Engine.update(engine);

	if(gameState === "onHelicopter") {
		MatterPackage.position.x = helicopter.x;
	}

	package.x = MatterPackage.position.x;
	package.y = MatterPackage.position.y;
}

function keyPressed() {
	if(keyCode === DOWN_ARROW) {
		Body.setStatic(MatterPackage, false);
		gameState = "leftFromHelicopter";
	}
}
