Crafty.c("Solder", {

	_hasKey: false,
	_grenadeAmount: 6,
	_grenadeMax: 6,
	_directionX: 0,
	_directionY: 1,
	_grenadeSpeed: 2,
	_grenadeInterval: null,
	_explodeTimer: null,

	init: function(){

		var viewportWidth = Crafty.viewport.width;
		var viewportHeight = Crafty.viewport.height;

		this.requires("Unit");
			this.requires('solder');
			this.requires("SpriteAnimation");
			this.requires("Keyboard");

			this.bind("KeyDown", function(e){
				if(e.key == Crafty.keys.LEFT_ARROW)
					keyMap.LEFT = 1;
				if(e.key == Crafty.keys.RIGHT_ARROW)
					keyMap.RIGHT = 1;
				if(e.key == Crafty.keys.UP_ARROW)
					keyMap.UP = 1;
				if(e.key == Crafty.keys.DOWN_ARROW)
					keyMap.DOWN = 1;
			});
			this.bind("KeyUp", function(e){
				if(e.key == Crafty.keys.LEFT_ARROW)
					keyMap.LEFT = 0;
				if(e.key == Crafty.keys.RIGHT_ARROW)
					keyMap.RIGHT = 0;
				if(e.key == Crafty.keys.UP_ARROW)
					keyMap.UP = 0;
				if(e.key == Crafty.keys.DOWN_ARROW)
					keyMap.DOWN = 0;
			});

			this.bind("EnterFrame", function(){
				if(!keyMap.LEFT && !keyMap.RIGHT && !keyMap.UP && !keyMap.DOWN)
					Crafty.audio.stop("walk");
			});

			this.attr({x: 0, y: 0});
			
			this.reel("walk_left", 500, 0, 1, 2);
			this.reel("walk_right", 500, 0, 2, 2);
			this.reel("walk_up", 500, 0, 3, 2);
			this.reel("walk_down", 500, 0, 0, 2);
		
		this.bind("Moved", function(e) {

			Crafty.audio.play("walk", 1, 1);
			if(this.x < 0)
				this.x += this._speed.x;

			if(this.y < 0)
				this.y += this._speed.y;

			if(this.x > mapWidth)
				this.x -= this._speed.x;

			if(this.y > mapHeight)
				this.y -= this._speed.y;

			Crafty.viewport.follow(this, 0, 0);

			this._directionX = this._movement.x;
			this._directionY = this._movement.y;
		});

		this.onHit("tank_key", function(e){
			
			var keys = document.getElementById("keys");
			keys.play();
			
			setTimeout(function(){
				keys.pause();
			}, 1000);
			
			var _key = e[0].obj;

			this._hasKey = true;
			_key.destroy();
			var pic = new Image();
			pic.src = 'images/tank_key.png';
			pic.onload = function(){
				var offsetX = 570;
				ctx.drawImage(pic, offsetX, 50);
			}

		});

		this.bind("KeyDown", function(e){
			if(e.key == Crafty.keys.SPACE && this._grenadeAmount){

				Crafty.audio.play("hole");
				var _offsetX = 480;
				var k = this._grenadeMax - this._grenadeAmount;

				_offsetX = _offsetX + k * 20;
				ctx.globalCompositeOperation = 'destination-over';
				ctx.clearRect(_offsetX, 25, 20, 22);
				this._grenadeAmount -= 1;
				
				var gr = Crafty.e("2D, DOM, Collision, grenade").attr({
					x: this.x,
					y: this.y
				});

				gr.collision();
				gr._alreadyHit = false;

				var kclass = this;
				this._grenadeInterval = setInterval(function(){
					kclass._animateGrenade(gr);
				}, this._grenadeSpeed);

				//Grenade Explode
				this._explodeTimer = setTimeout(function(){
					clearInterval(this._grenadeInterval);
					kclass._animateExplode(gr);
				}, 2000);
				
				gr.onHit("tree", function(e){
					var object = e[0].obj;

					clearTimeout(kclass._explodeTimer);
					clearInterval(kclass._grenadeInterval);

					kclass._animateExplode(gr, object);
				});

				gr.onHit("stump", function(e){
					var object = e[0].obj;

					clearTimeout(kclass._explodeTimer);
					clearInterval(kclass._grenadeInterval);

					kclass._animateExplode(gr, object);
				});

				gr.onHit("enemy", function(e){
					var _enemy = e[0].obj;

					clearTimeout(kclass._explodeTimer);
					clearInterval(kclass._grenadeInterval);

					kclass._animateExplode(gr, _enemy);
				});
			}
		});
	},

	_animateGrenade: function(grenade){

		if(grenade.x <= 0 || grenade.y <= 0 || grenade.x >= mapWidth || grenade.y >= mapHeight){
			clearInterval(this._grenadeInterval);
			clearTimeout(this._explodeTimer);

			grenade.destroy();
		}

		if(this._directionX == 1){
			var grenadeX = grenade.x + this._directionX;
			var grenadeY = grenade.y;
		}

		if(this._directionX == -1){
			var grenadeX = grenade.x + this._directionX;
			var grenadeY = grenade.y;
		}

		if(this._directionY == 1){
			var grenadeX = grenade.x;
			var grenadeY = grenade.y + this._directionY;
		}

		if(this._directionY == -1){
			var grenadeX = grenade.x;
			var grenadeY = grenade.y + this._directionY;
		}

		var _rot = grenade.rotation + 0.1;

		grenade.attr({
			x: grenadeX,
			y: grenadeY,
			rotation: _rot
		});


		
	},

	_animateExplode: function(grenade, object){

		var grenadeX = grenade.x;
		var grenadeY = grenade.y;
		grenade.destroy();

		Crafty.audio.play("explode");

		setTimeout(function(){
			Crafty.audio.stop("explode");
		}, 1500);

		if(object){
			var _objX = object.x;
			var _objY = object.y;

			Crafty.e("2D, DOM, particle_explosion").attr({
				x: _objX - 35,
				y: _objY - 10
			});

			if(object.has("Enemy")){
				var _hasKey = object._hasKey;
				if(_hasKey){
					Crafty.e("2D, DOM, tank_key").attr({
						x: _objX,
						y: _objY
					});
				}
			}

			object.destroy();					
		} else {
			Crafty.e("2D, DOM, particle_explosion").attr({
				x: grenadeX - 35,
				y: grenadeY - 20
			});
		}

		

		var explode = Crafty.e("2D, DOM, GrenadeExplode").attr({
			x: grenadeX,
			y: grenadeY
		});

		explode.animate("explode1", 1);
		setTimeout(function(){
			explode.animate("explode2", 1);
		}, 500);
		setTimeout(function(){
			explode.animate("explode3", 1);
		}, 1000);
		setTimeout(function(){
			explode.animate("explode4", 1);
		}, 1500);
		setTimeout(function(){
			explode.destroy();
		}, 2000);
		
		var solderId = solder.getId();
		document.getElementById('ent' + solderId).style.zIndex = '1000000';
	}


});