Crafty.c("Unit", {

	init: function(){

		this.requires("2D");
		this.requires("DOM");

		this.requires("Fourway");
		this.requires("Collision"); 
		this.collision();

		this.fourway(1);
  		
		this.onHit("solder", function(e) {
			var that = this;
	   		this.collisionWithObject(e, that);
		});

		this.onHit("enemy", function(e) {
			var that = this;
		   	this.collisionWithObject(e, that);
		});

		this.onHit("stump", function(e) {
			var that = this;
		   	this.collisionWithObject(e, that);
		});

		this.onHit("tree", function(e) {
			var that = this;
		   	this.collisionWithObject(e, that);
		});

		this.onHit("tank1", function(e) {
			var that = this;
		   	this.collisionWithObject(e, that);
		});

		this.onHit("fence10", function(e) {
			var that = this;
		   	this.collisionWithObject(e, that);
		});

		this.onHit("fence11", function(e) {
			var that = this;
		   	this.collisionWithObject(e, that);
		});

	  	this.bind("Moved", function(e) {
		   if(this.x < e.x) {
		   	if(!this.isPlaying("walk_left"))
		     	this.animate("walk_left", 1);
		   }
		   if(this.x > e.x) {
		    if(!this.isPlaying("walk_right"))
		     	this.animate("walk_right", 1);
		   }
		   if(this.y < e.y) {
		    if(!this.isPlaying("walk_up"))
		    	this.animate("walk_up", 1);
		   }
		   if(this.y > e.y) {
		   	if(!this.isPlaying("walk_down"))
		    	this.animate("walk_down", 1);
		   }
		});
	},

	collisionWithObject: function(e, that){

	   var object = e[0].obj;
	   // left
	   if (object.x > that.x && (that.x + Settings.poligon) > object.x) {
	    that.x -= that._speed.x;
	    that.y -= that._speed.y;
	   }
	   // right
	   if (object.x < that.x && that.x < (object.x + Settings.poligon)) {
	    that.x += that._speed.x;
	    that.y -= that._speed.y;
	   }
	   // top
	   if (object.y < that.y && (that.y + Settings.poligon) > object.y) {
	    that.y += that._speed.y;
	    //that.x -= that._speed.x;
	   }
	   // bottom
	   if (object.y > that.y && that.y < (object.y + Settings.poligon)) {
	    that.y -= that._speed.y;
	    //that.x -= that._speed.x;
	   }

	   if(that.has("Enemy")){
	   		this._enemySpeed = -this._enemySpeed;
	   }

	   if(that.has("Solder")){
	   		if(object.has("Tank1")){
	   			var _tank = object;

	   			var tankId = _tank.getId();
	   			document.getElementById('ent' + tankId).style.zIndex = '1000000';

				if(this._hasKey){
					_tank.getControll(this);							
				}
	   		}
	   }

	}

});