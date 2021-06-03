const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(displayWidth,700);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(displayWidth/2,height,displayWidth,20);
    platform = new Ground(150, 680, 300, 870);

   box1 = new Box(600,680,100,100)
   box2 = new Box(800,680,100,100)
   box3 = new Box(1000,680,100,100)
   box4 = new Box(1200,680,100,100)

   pig1 = new Pig(700,680)
   pig3 = new Pig(900,680)
   pig2 = new Pig(1100,680)

   box5 = new Box(700,560,100,100)
   box6 = new Box(900,560,100,100)
   box7 = new Box(1100,560,100,100)

   ice1 = new Iceblock(600,560,100,100)
   ice2 = new Iceblock(1200,560,100,100)
   ice3 = new Iceblock(700,440,100,100)
   ice4 = new Iceblock(1100,440,100,100)
   ice5 = new Iceblock(900,340,100,100)


   pig4 = new Pig(800,560)
   pig5 = new Pig(1000,560)
   pig6 = new Pig(900,440)


   box8 = new Box(800,440,100,100)
   box9 = new Box(1000,440,100,100)

   log1 = new Log(900,630,700,PI/2)
   log2 = new Log(900,530,500,PI/2)
   log3 = new Log(900,340,300,PI/2)

   bird = new Bird(200,190);

    slingshot = new SlingShot(bird.body,{x:200, y:80});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
   pig1.score();
    log1.display();
log3.display();
   box3.display();
    box4.display();
   pig3.display();
   pig2.display();
    pig3.score();
    pig2.score();
    pig4.score();
    pig5.score();
    pig6.score();
   log2.display();
   ice1.display();
   ice4.display();
   ice2.display();

   box7.display();
    box5.display();
    box6.display();
pig6.display();
    bird.display();
    platform.display();
    pig4.display();
    pig5.display();
    box8.display();
    box9.display();
    ice5.display();
    ice3.display();

    slingshot.display();
    console.log(bird.body.speed);    
}

function mouseDragged(){
    //if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    //}
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && bird.body.speed < 1){
       bird.trajectory = [];
       Matter.Body.setPosition(bird.body,{x:200, y:50});
       slingshot.attach(bird.body);
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}