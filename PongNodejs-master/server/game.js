
var Player = require('./player.js');
var Game = function(){
	this.clients = [];
}

Game.prototype.addClient = function(client, gameID){
	console.log('Add client in Game function' + gameID);
	var body = null;
	client.player = new Player(client, body);
	client.player.gameID = gameID;
	this.clients.push(client);
};


Game.prototype.removeClient = function(client){
	client.player = null;
	var clientIndex = null;
	for (clientIndex = 0; clientIndex < this.clients.length; ++clientIndex) {
    if (this.clients[clientIndex] == client) {
      break;
    }
  }

  this.clients.splice(clientIndex, 1);
}

Game.prototype.contains = function(client) {
  for (var j = 0; j < this.clients.length; ++j) {
    var c = this.clients[j];
    if (c.id == client.id) {
      return true; 
    } 
  }
  return false;
};

Game.prototype.allClientsReady = function() {
  //Not enough players
  if (this.clients.length < 2) {
    return false;
  }
  for (var j = 0; j < this.clients.length; ++j) {
    var client = this.clients[j];
    if (!client.ready) {
      return false; 
    } 
  }
  return true;
};

Game.prototype.startGame = function() {
 for ( var i = 0; i < this.clients.length; i++){
    console.log('client start game : ' + this.clients[i].id);
    this.clients[i].startGame();
 }
};
Game.prototype.sendPoints = function(data){

  for ( var i = 0; i < this.clients.length; i++){
    this.clients[i].sendPoints(data);
  }
};

module.exports = Game;