Crafty.c("Tank1", {

	permitShoot: true,
	width: 85,
	height: 160,

	init: function(){
		this.requires("2D, DOM, tank1");
		this.requires("Fourway");
		this.requires("Keyboard");
		this.requires("Tween");
		this.requires("Collision");

		this.bind("EnterFrame", function(){
			if(this.x + 100 > mapWidth){
				Crafty.audio.stop("basic");
				Crafty.scene('level2');
			}
		});
	},

	getControll: function(that){

		this.attach(that);
		that.disableControls = true;

		Crafty.audio.stop("walk");
		that.unbind("KeyDown");
		that.unbind("KeyUp");

		that.visible = false;

		this.collision();
		this.fourway(1);

		this.bind("Moved",function(e){

			panther_engine = document.getElementById('panther_engine');
			panther_engine.volume = 0.1;
			panther_engine.play();

			if(this.x <= 0)
				this.x += 1;

			if(this.y <= 0)
				this.y += 1;

			if(this.y >= mapHeight - 50)
				this.y -= 1;

			Crafty.viewport.follow(this, 0, 0);
		});

		this.origin("center center");

		this.bind("KeyDown", function(e){
			
			var panther_engine = document.getElementById('panther_engine');
			panther_engine.volume = 0.1;
			panther_engine.play();

			var rot = this.rotation;
			if(e.key == Crafty.keys.LEFT_ARROW && rot != 90){
				this.tween({rotation: rot + 10}, 10);
			}

			if(e.key == Crafty.keys.RIGHT_ARROW && rot != -90){
				this.tween({rotation: rot - 10}, 10);
			}

			if(e.key == Crafty.keys.DOWN_ARROW && rot != 0){
				this.tween({rotation: rot + 10}, 10);
			}

			if(e.key == Crafty.keys.UP_ARROW && rot != -180){
				this.tween({rotation: rot - 10}, 10);
			}

			
			if(e.key == Crafty.keys.LEFT_ARROW)
				keyMap.LEFT = 1;
			if(e.key == Crafty.keys.RIGHT_ARROW)
				keyMap.RIGHT = 1;
			if(e.key == Crafty.keys.UP_ARROW)
				keyMap.UP = 1;
			if(e.key == Crafty.keys.DOWN_ARROW)
				keyMap.DOWN = 1;
			
			this.bind("EnterFrame", function(){
				if(!keyMap.LEFT && !keyMap.RIGHT && !keyMap.UP && !keyMap.DOWN)
					panther_engine.pause();				  						
			});

			if(e.key == Crafty.keys.SPACE){
				
				if(rot == 90 || rot == -90 || rot == 0 || rot == -180){
					
					var thisX = this.x;
					var thisY = this.y;

					if(rot == -90){
						thisX += 150;
						thisY += 98;
					}

					if(rot == 0){
						thisX += 20;
						thisY += 168;
					}

					if(rot == -180){
						thisX += 62;
						thisY -= 20;
					}

					if(rot == 90){
						thisX -= 40;
						thisY += 62;
					}
					
					if(this.permitShoot){

						this.permitShoot = false;
						Crafty.audio.play("shoot_tank", 1);
						setTimeout(function(){
							Crafty.audio.stop("shoot_tank");

						}, 900);

						var _bullet = Crafty.e("Tank_bullet").attr({
							x: thisX,
							y: thisY,
							rotation: rot - 90
						});

						_bullet._bulletAnimated();

						_tank = this;
						setTimeout(function(){
							_tank.permitShoot = true;
						}, 3000);
					}
				}
			}

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


		this.onHit("enemy", function(e){
			var _enemy = e[0].obj;
			var _bloodX = _enemy.x;
			var _bloodY = _enemy.y;

			Crafty.audio.play("krik");
			
			if(_enemy){

				_enemy.destroy();
				Crafty.e("2D, DOM, blood").attr({
					x: _bloodX,
					y: _bloodY
				});
				setTimeout(function(){
					Crafty.audio.stop("krik");
				}, 1000);

			}
			
		});

		this.onHit("tree", function(e){

			var _tree = e[0].obj;
			if((this.x + Math.round(this.height/2)) > _tree.x){

					Crafty.audio.play("wood", 1);
					var _treeX = _tree.x;
					var _treeY = _tree.y;
					_tree.destroy();	

					Crafty.e("2D, DOM, broken_tree").attr({
						x: _treeX,
						y: _treeY + 15
					});
			}

		});


		this.onHit("fence10", function(e){
			this.x -= 1;
		});

		this.onHit("Jeep", function(e){
			this.x -= 1;
		});

		this.onHit("Tower", function(e){
			this.x -= 1;
		});

		this.onHit("fence11", function(e){
			var _fence = e[0].obj;
			if(this.y < _fence.y)
				this.y += 1;
			if(_fence.y < this.y)
				this.y -= 1;
		});

	}

});