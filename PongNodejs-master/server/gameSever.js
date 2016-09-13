var util = require('util');
var http = require('http');
var path = require('path');
var ecstatic = require('ecstatic');
var io = require('socket.io');

var Client = require('./client.js');
var Lobby = require('./lobby.js');


var port = process.env.PORT || 4040


var socket;
var players;
var clientID = 0;
var isCreatedRoom = false;
// Create and start the http server
var server = http.createServer(
  ecstatic({ root: path.resolve(__dirname, '../public') })
).listen(port, function (err) {
  console.log('Server started port ' + port);
  if (err) {
    throw err;
}
  init();
})
function init(){
  Lobby.init();
  players = [];
  SIO = io.listen(server);
  initServer();
}

function initServer(){
  SIO.sockets.on('connection', onSocketConnection);
}

function onSocketConnection(socket){

    var socketID = socket.id.substring(2);
    console.log(' server socketID: ' + socketID);
    var client = new Client(clientID, socket);
    var game = null;
    clientID += 1;
    socket.on('hello', function(msg){
      SIO.emit('hi', {clientID: client.id});
    });
    
    socket.on('join', function(){
      var gameID = Lobby.addClient(client);
      console.log('send flag id to client: ' + gameID);
      SIO.emit('joined', {gameID: gameID});
      console.log(Lobby.toString());

    });

    socket.on('ready', function(){
      client.ready = true;
      game = Lobby.getGame(client);
      if(game.allClientsReady()){
        game.startGame();
      }
    });

    // disconnect
    socket.on('disconnect', function(){
      console.log('socket id :' + socketID + ' disconnect');
      Lobby.removeClient(client);
      console.log(Lobby.toString());
    });

}
