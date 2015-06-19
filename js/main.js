var Settings = {};
	Settings.poligon = 64,
	Settings.grenades = [],
	mapWidth = 3500,
	mapHeight = 2500,
	solder = null,
	keyMap = {
		'LEFT': 0,
		'RIGHT': 0,
		'UP': 0,
		'DOWN': 0
	},
    ctx = null;

window.onload = function(){
	
	var canvas = document.getElementById("dashboard");
	ctx = canvas.getContext('2d');

	var pic = new Image();
	pic.src = 'images/grenade.png';
	pic.onload = function(){

		var offsetX = 480;
		for(var n = 0; n <= 6 * 20; n += 20){
			ctx.drawImage(pic, offsetX, 25);
			offsetX += 20;
		}
	}

	contra.initialize();			
}