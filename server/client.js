var Client = function(id, socket){
	this.id = id;
	this.socket = socket;
	this.ready = false;
	this.game = null;
}

Client.prototype.startGame = function(){
}
module.exports = Client;