
'use strict';
var screenWidth = 600;
var screenHeight = 800;
var playerClient = function(clientID, x, y, width, height, body){
	this.clientID = clientID;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.body = body;
	this.color = '#FFFFFF';
	this.sprite = null;
	
};

playerClient.prototype.createSprite = function(){
	this.sprite = game.add.sprite(this.x, this.y, 'breakout', 'paddle_big.png');
	this.sprite.anchor.setTo(0.5, 0,5);
	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.body.collideWorldBounds = true;
	this.sprite.body.bounce.set(1);
	this.sprite.body.immovable = true;
	this.sprite.inputEnabled = true;
	this.sprite.input.enableDrag();
	this.sprite.body.enable = true;
	this.sprite.boundsRect = new Phaser.Rectangle(0,0, 600, 800);
};

playerClient.prototype.updateLocalPosition = function(data){
	if(data.x < 50){
		this.x = 50;
	}
	else if ( data.x > screenWidth - 50){
		this.x = screenWidth - 50;
	}
	else{
		this.x = data.x;
	}

	this.y = data.y;
	this.sprite.x = this.x;
	this.sprite.y = this.y;
};

