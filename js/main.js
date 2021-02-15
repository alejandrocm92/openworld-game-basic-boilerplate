// General constants.
const TILESIZE = 24;

// TODO convert keyboard input handling into object oriented entity.
let keyPressed = {};

const loadImage = function(src) {
	return new Promise((resolve, reject) => {
		const img = new Image();

		// Eventually change promise status according to whether or not it was correctly loaded. 
		img.addEventListener("load", () => resolve(img));
		img.addEventListener("error", err => reject(err));

	    // Try to load image, it will cause the promise to be resolved or rejected.
	    img.src = src;
	});
}

const resizeCanvas = function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
    player.setOnScreenPositionX(canvas.width/2);
    player.setOnScreenPositionY(canvas.height/2);
}

const keyDownListener = function(event) {
	keyPressed[event.key] = true;
}

const keyUpListener = function(event) {
	keyPressed[event.key] = false;
}

const getSpriteMap = function(terrainSpriteSheetImg, oceanSpriteSheetImg) {
	const spriteMap = [];

	/* Map IDs tileIDMap to canvas sprite wrapper. */
	spriteMap[0] = new canvasSpriteWrapper(terrainSpriteSheetImg, 16, 0, 1);
	spriteMap[1] = new canvasSpriteWrapper(terrainSpriteSheetImg, 16, 0, 1);
	// Complete...

	return spriteMap;
}

document.addEventListener("DOMContentLoaded", function() {
	var tileIDMap = worldMap;

	let canvas = document.getElementById('canvas');
	let ctx = canvas.getContext('2d');

	// Set player's position to center of screen at start.
	let playerStartScreenPosX = canvas.width/2;
	let playerStartScreenPosY = canvas.height/2;

	let camera = new Camera(TILESIZE);

	/* Async loads. */

	// Just a quick load of a few hardcoded sprite sheet images for the purpose of this example.
	let promiseTerrainSpriteSheet = loadImage('images/example_grass_tileset_16x16.png'),
	promisePlayerSpriteSheet = loadImage('images/example_character_16x18.png'),
	promiseOceanSpriteSheet = loadImage('images/example_ocean_tileset_16x16.png');

	let tileMap = null,
	player = null;

	Promise.all([promiseTerrainSpriteSheet, promisePlayerSpriteSheet, promiseOceanSpriteSheet]).then(
  		([
	  		terrainSpriteSheetImg,
	  		playerSpriteSheetImg,
	  		oceanSpriteSheetImg
  		]) => {
			const spriteMap = getSpriteMap(terrainSpriteSheetImg, promiseOceanSpriteSheet);

			tileMap = new TileMap(TILESIZE);
			player = new Player(playerSpriteSheetImg, playerStartScreenPosX, playerStartScreenPosY);

			player.setOnMapPositionX(camera.getFocusPositionX());
			player.setOnMapPositionY(camera.getFocusPositionY());

			tileMap.initialize(tileIDMap, spriteMap);

			// Set canvas initial dimensions to fit the browser window size.
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;

			// Set initial player position.
			player.setOnScreenPositionX(canvas.width/2); /// player.onScreenX = canvas.width/2;
			player.setOnScreenPositionY(canvas.height/2); /// player.onScreenY = canvas.width/2;

			requestAnimationFrame(gameLoop);
	});

	function gameLoop() {
		console.log(ctx);
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		let playerHasMoved = false;
		let playerPosition = player.getOnMapPosition();

		if (keyPressed.w === true) {
			player.setDirection(FACING_UP);

			camera.shiftFocusOffsetY(-player.getSpeed());
			let cameraPositionY = camera.getFocusPositionY();

		    // Have player follow camera since it is intended to have a centered fixed position on screen.
		    player.setOnMapPositionY(cameraPositionY);


			playerHasMoved = true;
		} else if (keyPressed.s === true) {
			player.setDirection(FACING_DOWN);

			camera.shiftFocusOffsetY(player.getSpeed());
			let cameraPositionY = camera.getFocusPositionY();

			// Have player follow camera since it is intended to have a centered fixed position on screen.
			player.setOnMapPositionY(cameraPositionY);


			playerHasMoved = true;
		}

		if (keyPressed.a === true) {
			player.setDirection(FACING_LEFT);

			camera.shiftFocusOffsetX(-player.getSpeed());
			let cameraPositionX = camera.getFocusPositionX();

			// Have player follow camera since it is intended to have a centered fixed position on screen.
			player.setOnMapPositionX(cameraPositionX);

			playerHasMoved = true;
		} else if (keyPressed.d === true) {
			player.setDirection(FACING_RIGHT);

			camera.shiftFocusOffsetX(player.getSpeed());
			let cameraPositionX = camera.getFocusPositionX();

			// Have player follow camera since it is intended to have a centered fixed position on screen.
			player.setOnMapPositionX(cameraPositionX);

			playerHasMoved = true;
		}

		if (playerHasMoved === true) {
			player.runAnimationLoop();
		} else {
			player.restartAnimationLoop();
		}

		// Render frame.
		tileMap.render(ctx, canvas.width, canvas.height, camera.getFocusPositionX(), camera.getFocusPositionY(), camera.getFocusOffsetX(), camera.getFocusOffsetY());

		// Render player.
		player.render(ctx);

		////var t1 = performance.now(); 

		window.requestAnimationFrame(gameLoop);
	}

});



window.addEventListener('resize', resizeCanvas, false);

// Declare keyboard events.
window.addEventListener('keydown', keyDownListener);
window.addEventListener('keyup', keyUpListener);