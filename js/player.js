// Player constants.
const SCALE = 2;
const FRAME_WIDTH = 16;
const FRAME_HEIGHT = 18;
const CYCLE_LOOP = [0, 1, 0, 2];
const FACING_DOWN = 0;
const FACING_UP = 1;
const FACING_LEFT = 2;
const FACING_RIGHT = 3;
const FRAME_LIMIT = 15;
const WALKING_SPEED = 1;
const RUNNING_SPEED = 2;

let Player = (() => {
	let _frameWidth = 16;
	let _frameHeight = 18;
	let _scaledWidth = SCALE * FRAME_WIDTH;
  	let _scaledHeight = SCALE * FRAME_HEIGHT;
	let _currentDirection = FACING_DOWN;
	let _currentLoopIndex = 0;
	let _onScreenX;
	let _onScreenY;
	let _onMapX = 0;
	let _onMapY = 0;
	let _movementSpeed = WALKING_SPEED;
	let _frameCount = 0;
	let _spriteImg = null;

	function Player(spriteImg, onScreenX, onScreenY) {
		_spriteImg = spriteImg;
		_onScreenX = onScreenX;
		_onScreenY = onScreenY;
	}

	Player.prototype.render = function(canvasCtx) {
		canvasCtx.drawImage(_spriteImg,
                    CYCLE_LOOP[_currentLoopIndex] * FRAME_WIDTH, _currentDirection * FRAME_HEIGHT, FRAME_WIDTH, FRAME_HEIGHT,
                    _onScreenX, _onScreenY, _scaledWidth, _scaledHeight);
	}

	Player.prototype.setDirection = function(direction) {
		if (!(direction != "FACING_LEFT" || direction != "FACING_RIGHT" || direction != "FACING_UP" || direction != "FACING_DOWN")) {
			throw "Invalid player direction";
		}

		_currentDirection = direction;
	}

	Player.prototype.getDirection = function() {
		return _currentDirection;
	}

	Player.prototype.getSpeed = function(speed) {
		return _movementSpeed;
	}

	Player.prototype.restartAnimationLoop = function() {
		_currentLoopIndex = 0;
	}

	Player.prototype.runAnimationLoop = function() {
		_frameCount++;

	    if (_frameCount < FRAME_LIMIT) {
	    	return;
	    }

	    _frameCount = 0;
	    // Advance animation loop only in case _frameCount game loops have occured. _frameCount determines the rate at which player animation refreshes.
	    _currentLoopIndex++;

	   	if (_currentLoopIndex >= CYCLE_LOOP.length) {
	    	_currentLoopIndex = 0;
	    }
	}

	Player.prototype.getOnMapPosition = function() {
		return {X: _onMapX, Y: _onMapY};
	}

	Player.prototype.setOnMapPositionX = function(X) {
		_onMapX = X;
	}

	Player.prototype.setOnMapPositionY = function(Y) {
		_onMapY = Y;
	}

	Player.prototype.setOnScreenPositionX = function(X) {
		_onScreenX = X;
	}

	Player.prototype.setOnScreenPositionY = function(Y) {
		_onScreenY = Y;
	}

	return Player;

})();