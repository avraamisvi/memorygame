var stage;

var loader;

var contador = 0;
var selected = {name:null, frame:null};

var items = {};

/*var grid_game = [
        ["noah","david_and_goliath","babel"],
        ["david_and_goliath","noah","angel"],
        ["adamandeve","noah","adamandeve"],
        ["angel","babel","noah"]
      ];*/

var grid_game = [];

function generateGrid() {
  var pos = Math.floor((Math.random() * 6));

  var imgs = [{name:"noah", times:0},{name:"david_and_goliath", times:0},
  {name:"babel", times:0},{name:"angel", times:0},{name:"adamandeve", times:0},{name:"babel", times:0}]
  var arrtemp = [];
  var im;
  var ix = 0;

  while(ix < 12) {
    pos = Math.floor((Math.random() * 6));
    im = imgs[pos];

    if(im.times >= 2){
      continue;
    }

    im.times++;
    arrtemp[ix] = im.name;
    ix++;
  }

  console.log("grid");
  var x = 0;
  var y = 0;
  var ip = 0;
  for(x = 0; x < 4; x++) {
    for(y = 0; y < 3; y++) {

      if(!grid_game[x])
        grid_game[x] = [];

        grid_game[x][y] = arrtemp[ip];
      ip++;
    }
  }

  console.log("exited");
}

function load() {

  var manifest = [
    {src: "fundo.png", id: "fundo"},//
    {src: "angel.jpg", id: "angel"},//0
    {src: "david_and_goliath.jpg", id: "david_and_goliath"},//1
    {src: "babel.jpg", id: "babel"},//2
    {src: "adamandeve.jpg", id: "adamandeve"},//3
    {src: "noah.jpg", id: "noah"}//4
  ];

  loader = new createjs.LoadQueue(false);
  loader.addEventListener("complete", handleComplete);
  loader.addEventListener("fileload", fileload);
  loader.loadManifest(manifest, true);

  loader = new createjs.LoadQueue(false);
}

function fileload(event) {
  //console.log(event);
  items[event.item.id] = event.result;
}

function handleComplete(event) {
  init();
  //console.log(loader.getResult("fundo"));
}

function init() {

    generateGrid();

    stage = new createjs.Stage("demoCanvas");

    createjs.Touch.enable(stage);
  	stage.enableMouseOver(10);

    //createFrame("angel.jpg", "angel");

    var container = new createjs.Container();
    stage.addChild(container);

    var x = 0;
    var y = 0;

    for(var lin =0; lin<grid_game.length; lin++) {
      for(var col =0; col<grid_game[lin].length; col++) {
        x = lin * 85;
        y = col * 85;

        frm = createFrame(container, grid_game[lin][col]);
        frm.x = x;
        frm.y = y;
      }
    }



    createjs.Ticker.addEventListener("tick", tick);
}

function select(name, frame) {

  if(frame.opened) {
    console.log(frame);
    return;
  }

  if(!selected.name) {
    selected.name  = name;
    selected.frame = frame;

    frame.gotoAndPlay("front");
    frame.opened = true;
  } else {
    if(selected.name != name) {
      selected.frame.gotoAndPlay("back");
      frame.gotoAndPlay("back");

      selected.frame.opened = false;
      selected.name  = null;
      selected.frame = null;
      frame.opened = false;

    } else {
      frame.opened = true;
      frame.gotoAndPlay("front");

      selected.name  = null;
      selected.frame = null;
      contador++;
    }
  }

}

function createFrame(container, imageid) {
  var spriteSheet = new createjs.SpriteSheet({
												   framerate: 30,
												   "images": [items["fundo"], items[imageid]],
												   "frames": [[0, 0, 84, 84, 0],[0, 0, 84, 84, 1]],
												   "animations": {
													   "back": 0,
													   "front": 1
												   }
											   });

	frame = new createjs.Sprite(spriteSheet, "back");

  container.addChild(frame);

  frame.on("mousedown", function (evt) {
    select(imageid, this);

    if(contador >= 6) {
      setTimeout(function() {
        alert("Você Ganhou!");
      }, 100);
    }

  });

  return frame;
}

/*function createFrameOLD(imageName, name) {
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
}*/

function tick(event) {
    // this set makes it so the stage only re-renders when an event handler indicates a change has happened.
    //if (update) {
        //update = false; // only update once
        stage.update(event);
    //}
}
