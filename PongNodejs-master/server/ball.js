

var Player = function(client, body){
	this.client = client;
	this.body = body;
	this.gameID = null;
	this.x = 0;
	this.y = 0;
	this.width = 100;
	this.height = 50;
	this.score = 0;
}

module.exports = Player;