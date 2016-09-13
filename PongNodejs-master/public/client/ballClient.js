
'use strict';

var ballClient = function(x, y, radius, vx, vy){

	this.x = x;
	this.y = y;
	this.radius = radius;
	this.vx = vx;
	this.vy = vy;
	this.color = '0x0000FF';
	this.sprite  = null;
};

ballClient.prototype.createSprite = function(){

	this.sprite = game.add.sprite(this.x, this.y, 'breakout', 'ball_1'.png);
	this.sprite.anchor.set(0.5);
	this.sprite.checkWorldBounds = true;
   	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.body.collideWorldBounds = true;
	this.sprite.body.bounce.set(1);
	this.sprite.body.velocity.x = this.vx;
	this.sprite.body.velocity.y = this.vy;
	this.sprite.body.immovable = true;
	this.sprite.body.enable = true;
    this.sprite.animations.add('spin', [ 'ball_1.png', 'ball_2.png', 'ball_3.png', 'ball_4.png', 'ball_5.png' ], 50, true, false);
};

ballClient.prototype.ballHitPlayer = function(socket, player){
	var diff = 0;
	var velocityX, velocityY;
	if( this.x < player.x){
		console.log('ballHitPlayer');
		diff = player.x - this.x;
		this.sprite.body.velocity.x = (-100 * diff);
	} 
	else if (this.y > player.y){
		console.log('ballHitPlayer 2');
		diff = this.x - player.y;
		this.sprite.body.velocity.x= (100 * diff);
	}
	else{
		//this.sprite.body.velocity.x = 2 + Math.random() * 30;
		velocityX = 2 + Math.random() * 30;
		
	}
	//this.vx = this.sprite.body.velocity.x;
	//this.vy = this.sprite.body.velocity.y;
	socket.emit('moveball', {vx: velocityX,});
	
};


ballClient.prototype.ballHitWall = function(wall){
		this.sprite.animation.play('stop');
};

ballClient.prototype.updateLocalPosition = function(data){
	this.sprite.body.velocity.x = data.vx;
};