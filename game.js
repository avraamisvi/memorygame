var stage;

var first;
var second;
var loader;

function load() {

  manifest = [
    {src: "fundo.png", id: "fundo"},
    {src: "angel.jpg", id: "angel"},
    {src: "david_and_goliath.jpg", id: "david_and_goliath"},
    {src: "babel.jpg", id: "babel"},
    {src: "adamandeve.jpg", id: "adamandeve"},
    {src: "noah.jpg", id: "noah"}
  ];

  loader = new createjs.LoadQueue(false);
  loader.addEventListener("complete", handleComplete);
  loader.loadManifest(manifest, true, "/");

  loader = new createjs.LoadQueue(false);
}

function handleComplete() {

}

function init() {

    stage = new createjs.Stage("demoCanvas");

    createjs.Touch.enable(stage);
  	stage.enableMouseOver(10);

    createFrame("angel.jpg", "angel");

    createjs.Ticker.addEventListener("tick", tick);
}

function select(name) {

  if(!first) {
    first=name;
  } else {

  }

}

function createFrame() {
  var spriteSheet = new createjs.SpriteSheet({
												   framerate: 30,
												   "images": [loader.getResult("fundo"), loader.getResult("angel")],
												   "frames": {["weight": 64, "height": 64, "count": 64, "imageIndex": 0]},
												   // define two animations, run (loops, 1.5x speed) and jump (returns to run):
												   "animations": {
													   "back": [0, 25, "run", 1.5],
													   "front": [26, 63, "run"]
												   }
											   });
	grant = new createjs.Sprite(spriteSheet, "run");
}

function createFrameOLD(imageName, name) {
  var image = new Image();
  image.src = imageName;

  image.onload = function (ev) {
    var image = event.target;
    var bitmap;

    var container = new createjs.Container();
    stage.addChild(container);

    bitmap = new createjs.Bitmap(image);
    container.addChild(bitmap);
    bitmap.name = name;

    bitmap.scaleX = bitmap.scaleY = bitmap.scale = 0.2;
    bitmap.cursor = "pointer";
  }
}

function tick(event) {
    // this set makes it so the stage only re-renders when an event handler indicates a change has happened.
    //if (update) {
        //update = false; // only update once
        stage.update(event);
    //}
}
