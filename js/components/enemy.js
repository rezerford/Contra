Crafty.c('Enemy', {
		 
 init: function() {

  	this.requires("Unit");
  	this.requires("SpriteAnimation");
  	this.requires("enemy");
  	this.requires("FourwayAI");

  	this.attr({x: 0, y: 0, _hasKey: false});
  
  	this.reel("walk_left", 500, 2, 1, 4);
  	this.reel("walk_right", 500, 2, 2, 4);
  	this.reel("walk_up", 500, 2, 3, 4);
  	this.reel("walk_down", 500, 2, 0, 4);
  
  	this.fourway_ai(1);

  	this.bind("Moved", function(e) {
		if(this.x < 0)
			this.x += this._speed.x;

		if(this.y < 0)
			this.y += this._speed.y;

		if(this.x > mapWidth)
			this.x -= this._speed.x;

		if(this.y > mapHeight)
			this.y -= this._speed.y;

	});
   	
 },
 
 clear: function() {
  	clearInterval(this.removeComponent('enemy')._interval);
 }

});

Crafty.c('FourwayAI', {

  _enemySpeed: 1,
  _enemyDir: 1,
  _interval: null,
    
  init: function() {

  	this._movement= { x: 0, y: 0};
  
  	this.bind("EnterFrame",function() {
   		
   		if (this.disableControls) return;

   		if(this.x <= 0 || this.y <= 0 || this.x >= mapWidth || this.y >= mapHeight)
			this._enemySpeed = -this._enemySpeed;	  
  		
  		step = this._enemySpeed;
	  	if (this._enemyDir == 1) {
	   		this._movement.x = step;
	    	this._movement.y = 0;
	  	} else {
	   		this._movement.x = 0;
	    	this._movement.y = step;
	  	}

  	});


  },
 
 fourway_ai: function(speed) {

 	var that = this;
  	this._interval = setInterval(function() {
  		var line = [1,2];
   		that._enemyDir = line[Math.round(Math.random() * 1)];
  	}, 1000 * speed);

 }

});