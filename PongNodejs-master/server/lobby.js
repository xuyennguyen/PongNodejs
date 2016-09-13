

var Game = require('./game.js');

var Lobby = {};

Lobby.init = function(){
	Lobby.games = [];
}

Lobby.addClient = function(client){
	var hasAddedClient = false;
	var selectGameID = 0;
	for ( var i = 0; i <Lobby.games.length; i++){
		var game = Lobby.games[i];
		if(game.contains(client)){
			hasAddedClient = true;
			return;
		}
	}

	for( var i = 0; i < Lobby.games.length; i++){
		var totalPlayer = Lobby.games[i].clients.length;
		console.log('totalPlayer : ' + totalPlayer);
		if(Lobby.games[i].clients.length < 2){
			selectGameID = totalPlayer;
			Lobby.games[i].addClient(client, selectGameID);
			client.game = Lobby.games[i];
			hasAddedClient = true;
			break;
		}
	}

	if(!hasAddedClient){
		var game = new Game();

		game.addClient(client, selectGameID);
		client.game = game;
		Lobby.games.push(game);
	}
	return selectGameID;
}

Lobby.removeClient = function(client){
	var game = client.game;
	if(game != null){
		console.log('Removed client');
		game.removeClient(client);
		if(game.clients == 0){
			var index = Lobby.games.indexOf(game);
			Lobby.games.splice(index,1);
		}
	}
	else{
		console.log(' not found game for client' + client.id);
		return null;
	}
}

Lobby.getGame = function(client){

	for ( var i = 0; i <Lobby.games.length; i++){
		var game = Lobby.games[i];
		if(game.contains(client)){
			return game;
		}
	}
	console.log('game not contain for client' + client.id);
	return null;
}

Lobby.toString = function() {
  var s = `Lobby: ${Lobby.games.length} game${Lobby.games.length == 1 ? '' : 's'}`;

  for (var i = 0; i < Lobby.games.length; ++i) {
    s += '\n';

    var game = Lobby.games[i];
    s += `Game ${i}: ${game.clients.length} player${game.clients.length == 1 ? '' : 's'}`;
  
  }

  return s;
};
module.exports = Lobby;