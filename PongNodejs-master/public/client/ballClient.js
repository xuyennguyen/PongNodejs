
'use strict';
var screenWidth = 600;
var screenHeight = 800;
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

ballClient.prototype.ballHitPlayer = function(player1, player2){
	
	this.x += this.vx;
	this.y += this.vy;
	var top_x = this.x - this.radius;
	var top_y = this.y = this.radius;
	var bottom_x = this.x + this.radius;
	var bottom_y = this.y + this.radius;
	if (this.x - this.radius < 0)  // the ball hiting the left wall
	{
		this.x = this.radius;
		this.vx =  -this.vx;
	}else if ( this.x + this.radius > screenWidth) // the ball hiting the right wall
	{
		this.x = screenWidth - this.radius;
		this.vx = -this.vx;
	}

	if ( this.y < 0 || this.y > screenHeight){

		this.vx = 0;
		this.vy = 3;
		this.x = screenWidth /2;
		this.y = screenHeight /2;
	}
	// the player 1 stay at top of table;
	if (top_y > screenHeight /2){
		if ( top_y < (player1.y + player1.height)){
			this.vy = - 3;
			this.vx += 10;
			this.y += this.vy;
		}
	}
	
};


ballClient.prototype.ballHitWall = function(wall){
		this.sprite.animation.play('stop');
};

ballClient.prototype.updateLocalPosition = function(data){
	this.sprite.body.velocity.x = data.vx;
};