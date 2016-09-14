


var socket;
var background;
var players;
var ball;
var currentSpeed = 0;
var cursors;
var gameReady = false;

var fristPlayer;
var secondPlayer;
var _pw = 100;
var _ph = 10;
var screenWidth = 600;
var screenHeight = 800;
var worldSizeWidth = 1600;
var worldSizeHeight = 1600;
var isGameStarted = false;
var clientID = null;
var gameID;
var phaser = null;
var game = null;
var bmd = null;

window.onload = function(){
  var width = screenWidth;
  var height = screenHeight;
  var gameRatio = width / height;
  var windowRatio = window.innerWidth / window.innerHeight;

  if (gameRatio > windowRatio) {
    width = window.innerWidth;
    height = width / gameRatio;
  }
  else {
    height = window.innerHeight;
    width = height * gameRatio;
  }
  console.log('width: ' + width);


  phaser = new Phaser.Game(width, height, Phaser.CANVAS, 'Neo-pong', { preload: preload, create: create, update: update, render: render });
  
}

function preload () {
   phaser.load.atlas('breakout', '../assets/breakout.png', 'assets/breakout.json');
}

function create(){

  var style = { font: "40px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: 500, align: "center", backgroundColor: "#000000" };
  textStatus = phaser.add.text(screenWidth / 2, screenHeight / 2, "Pong Battle", style);
  textStatus.anchor.set(0.5); 
  textStatus.fixedToCamera = true;
  phaser.physics.startSystem(Phaser.Physics.ARCADE);
  console.log('create function');
  socket = io.connect();
  phaser.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  phaser.scale.pageAlignVertically = true;
  phaser.scale.pageAlignHorizontally = true;
  phaser.time.advancedTiming = true;
  phaser.stage.backgroundColor = "#4488AA";
  console.log('phaser.scale.width: ' + phaser.scale.width);
  bmd = phaser.add.bitmapData(phaser.scale.width, phaser.scale.height);
  bmd.addToWorld();
  Pointer.init(phaser, phaser.scale.width, phaser.scale.height, bmd);
 
  initGame();

}

function initGame(){
  socket.on('connect', onSocketConnected);
}

function onSocketConnected(data){
      textStatus.text = 'Connecting...';
      socket.on('hi', onHandleHiState);
      socket.emit('hello');
      socket.on('disconnect', onHandleDisconnectState);
      socket.on('drawPlayer', onDrawPlayer);
}

function onHandleHiState(data){
  console.log('clientID: ' + data.clientID);
  textStatus.text = "Waiting for other player...";
  console.log('Waitting for other player')
  clientID = data.clientID;
  socket.emit('join');
  socket.on('joined', onHandleJoinedState);

}
function onHandleJoinedState(data){

    gameID = data.gameID;
    console.log('gameID' + gameID);
    socket.emit('ready');
    socket.on('start', onHandleStartState);
}

function onHandleStartState(data){
  //textStatus.text = "StartGame now ";
  textStatus.text = "";
  console.log('StartGame');
  

}

function update(){

  if(Pointer.points.length > 0 && Pointer.needSendData){
    console.log('send points: '+ Pointer.points.length);
    socket.emit('gesturesPoint', {clientID: clientID, points: Pointer.points});
    Pointer.needSendData = false;
  }

}
function onDrawPlayer(data){
  console.log('recieve onDrawPlayer');
  bmd.ctx.beginPath();
  bmd.ctx.strokeStyle = "#bae1ff";
  bmd.ctx.lineCap = "round";
  bmd.ctx.lineJoin = "round";
  bmd.ctx.lineWidth = 6;
  bmd.ctx.shadowColor = 'rgba(169,236,255,0.1)';
  bmd.ctx.shadowOffsetX = 0;
  bmd.ctx.shadowOffsetY = 0;
  bmd.ctx.shadowBlur = 10;
  for(var i = 1;  i <  data.points.length; i++){
    bmd.ctx.moveTo(data.points[i -1 ].x, data.points[i -1].y);
    bmd.ctx.lineTo(data.points[i].x, data.points[i].y);
    bmd.ctx.stroke();
  }
 
}


function render(){

}

function onHandleDisconnectState(){
  console.log('disconnect state');
}