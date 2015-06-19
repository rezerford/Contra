Crafty.c("Tank_bullet", {

	dirX: 0,
	dirY: 0,
	offsetX: 0,
	offsetY: 0,

	init: function(){

		this.requires("2D");
			this.requires("DOM");
			this.requires("Fourway");
			this.requires("shell");
			
			this.requires("Collision"); 
			this.collision();
			this.fourway(1);

			this.onHit("tree", function(e){
				_tree = e[0].obj;
				this._explosionObject(_tree);					
			});

			this.onHit("Jeep", function(e){
				_jeep = e[0].obj;
				this._explosionObject(_jeep);					
			});

			this.onHit("Tower", function(e){
				_tower = e[0].obj;
				this._explosionObject(_tower);					
			});

			this.onHit("enemy", function(e){
				_enemy = e[0].obj;
				this._explosionObject(_enemy);					
			});

			this.onHit("fence10", function(e){
				_f = e[0].obj;
				this._explosionObject(_f);					
			});

			this.onHit("fence11", function(e){
				_f = e[0].obj;
				this._explosionObject(_f);					
			});

		},

		_explosionObject: function(_tree){
			var eX = _tree.x;
			var eY = _tree.y;

			Crafty.audio.play("explode", 1);
			setTimeout(function(){
				Crafty.audio.stop("explode");
			}, 1000);

			_tree.destroy();
			this.destroy();

		Crafty.e("Tank_explosion").attr({
			x: eX,
			y: eY
		}).animate("tank_explosion", 1);

		setTimeout(function(){
			Crafty.e("Tank_explosion").attr({
				x: eX,
				y: eY
			}).animate("tank_explosion2", 1);

			Crafty.e("2D, DOM, particle_explosion").attr({
				x: eX,
				y: eY
			});
		}, 400);
		},

	_bulletAnimated: function(){

		if(this.x <= 0 || this.x >= mapWidth || this.y <= 0 || this.y >= mapHeight){
			this.destroy();
			return;
		}

		if(this.rotation == -180){
			this.offsetX = 40;
			this.offsetY = 30;
			this.dirX = 5;
			this.dirY = 0;
		}

		if(this.rotation == -90){
			this.dirX = 0;
			this.dirY = 5;
		}

		if(this.rotation == 0){
			this.offsetX = 20;
			this.offsetY = 10;
			this.dirX = -5;
			this.dirY = 0;
		}

		if(this.rotation == -270){
			this.offsetX = 32;
			this.offsetY = 0;
			this.dirX = 0;
			this.dirY = -5;
		}

		Crafty.e("Particle_large").attr({
			x: this.x - this.offsetX,
			y: this.y - this.offsetY
		}).animate("particle_large_explotion", 1);

		var kclass = this;
		setTimeout(function(){
			kclass._movement.x = kclass.dirX;
			kclass._movement.y = kclass.dirY;
		}, 0);				
	}

});