


game = new Phaser.Game(600, 800, Phaser.CANVAS, 'Neo-pong', { preload: preload, create: create, update: update, render: render });

function preload () {
    game.load.atlas('breakout', '../assets/breakout.png', 'assets/breakout.json');
}


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
var isGameStarted = false;
var clientID = null;
var gameID;

function create(){

  var style = { font: "40px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: 500, align: "center", backgroundColor: "#000000" };
  textStatus = game.add.text(screenWidth / 2, screenHeight / 2, "Pong Battle", style);
  textStatus.anchor.set(0.5); 
  textStatus.fixedToCamera = true;
  game.physics.startSystem(Phaser.Physics.ARCADE);
  console.log('create function');
  socket = io.connect();
  
  // add background
  game.stage.backgroundColor = "#4488AA";
  cursors = game.input.keyboard.createCursorKeys();
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
  textStatus.text = "StartGame now ";
  console.log('StartGame');
}

function update(){
 
}


function render(){

}

function onHandleDisconnectState(){
  console.log('disconnect state');
}