
var Pointer = {};

Pointer.MAX_X = 600;
Pointer.MAX_Y = 800;

Pointer.init = function(target, screenWidth, screenHeight, bmd){
	console.log('screenWidth: ' + screenWidth);
	Pointer.screenWidth = screenWidth;
	Pointer.screenHeight = screenHeight;
	Pointer.isMouseDown = false;
	Pointer.oldX = 0;
	Pointer.oldY = 0;
	Pointer.threshold = 3;
	Pointer.points =[];
	Pointer.needSendData = false;

	target.canvas.addEventListener('touchstart', function(e){
		e.preventDefault();
		var touch = e.touchs[0];
		Pointer.ctx.strokeStyle = "#bae1ff";
		bmd.ctx.lineCap = "round";
		bmd.ctx.lineJoin = "round";
		bmd.ctx.lineWidth = 6;
		x = touch.pageX;
		y = touch.pageY;

	}, false);

	target.canvas.addEventListener('touchmove', function(e){

	});
	//if(game.input.open(method, url, async, user, password))
	target.canvas.addEventListener('mousedown', function(e){
		if (Pointer.needSendData){
			return;
		}
		Pointer.isMouseDown = true;
		e.preventDefault();
		// draw round line
		Pointer.points =[];
		bmd.ctx.beginPath();
		bmd.ctx.strokeStyle = "#bae1ff";
		bmd.ctx.lineCap = "round";
		bmd.ctx.lineJoin = "round";
		bmd.ctx.lineWidth = 6;
		bmd.ctx.shadowColor = 'rgba(169,236,255,0.1)';
		bmd.ctx.shadowOffsetX = 0;
		bmd.ctx.shadowOffsetY = 0;
		bmd.ctx.shadowBlur = 10;
		// get current position;
		Pointer.oldX = target.input.mousePointer.x;
		Pointer.oldY =target.input.mousePointer.y;
		Pointer.points[Pointer.points.length] = new Phaser.Point(Pointer.oldX, Pointer.oldY);
		console.log('Pointer.oldX : ' + Pointer.oldX );
		console.log('Pointer.oldY : ' + Pointer.oldY );
	}, false);

	target.canvas.addEventListener('mousemove', function(e){
		if(!Pointer.isMouseDown){
			return;
		}
		// distance too small
		if(Pointer.oldX -  target.input.mousePointer.x && Pointer.oldX -  target.input.mousePointer.x > -3){
			return;
		}

		if(Pointer.oldY -  target.input.mousePointer.y < 3 && Pointer.oldY -  target.input.mousePointer.y > -3){
			return;
		}
		// move to this position
		bmd.ctx.moveTo(Pointer.oldX, Pointer.oldY);
		Pointer.oldX = target.input.mousePointer.x;
		Pointer.oldY = target.input.mousePointer.y;
		Pointer.points[Pointer.points.length] = new Phaser.Point(Pointer.oldX, Pointer.oldY);
		bmd.ctx.lineTo(Pointer.oldX, Pointer.oldY);
		bmd.ctx.stroke();
	}, false);

	target.canvas.addEventListener('mouseup', function(e){
		Pointer.needSendData = true;
		Pointer.isMouseDown = false;
		//bmd.ctx.closePath();
		//bmd.ctx.clearRect(0, 0, Pointer.screenWidth, Pointer.screenHeight);


	}, false);

};

Pointer.scaleX = function(x) {
  x = x - (window.innerWidth - Pointer.screenWidth) / 2;
  return Pointer.MAX_X * x / Pointer.screenWidth;
};

Pointer.scaleRate = function() {
  return Pointer.screenWidth / Pointer.MAX_X;
}

Pointer.scaleY = function(y) {
  y = y - (window.innerHeight - Pointer.screenHeight) / 2;
  return Pointer.MAX_Y * y / Pointer.screenHeight;
};


