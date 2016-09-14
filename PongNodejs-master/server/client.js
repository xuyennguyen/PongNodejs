var Client = function(id, socket){
	this.id = id;
	this.socket = socket;
	this.ready = false;
	this.game = null;
}

Client.prototype.startGame = function(){
	this.socket.emit('start');
}

Client.prototype.endGame = function(){
	this.socket.emit('end');
}
Client.prototype.winGame = function(){
	this.socket.emit('win');
}
Client.prototype.loseGame = function(){
	this.socket.emit('lose');
}
Client.prototype.sendPoints = function(data){
	 this.socket.emit('drawPlayer', {clientID: data.clientID, points: data.points});
};
module.exports = Client;