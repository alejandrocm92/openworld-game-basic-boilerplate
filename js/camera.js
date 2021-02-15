// Camera constants.
const INGAMESTARTPOSITIONX = 75;
const INGAMESTARTPOSITIONY = 75;

let Camera = (() => {
	let _focusPxOffsetX = 0;
	let _focusPxOffsetY = 0;
	let _tileSize = null;
	let _focusPositionX = INGAMESTARTPOSITIONX;
	let _focusPositionY = INGAMESTARTPOSITIONY;

	function Camera(tileSize) {

		try {
			if(isNaN(tileSize) || tileSize < 1)
				throw `tile size ${tileSize} is not a valid value`;
		}
		catch(err) {
			console.error('Error in Camera constructor: ' + err);
		}

		_tileSize = tileSize;
	}

 	/**
	 * Update camera focus offset in horizontal axis.
	 * @param  {Number} px Amount of pixels that the camera focus will be shifted.
	 */
	Camera.prototype.shiftFocusOffsetX = function(px) {
		_focusPxOffsetX += px;

		let positionsShifted = Math.floor(Math.abs(_focusPxOffsetX) / _tileSize) * Math.sign(_focusPxOffsetX);
		
		// Update camera focus position in case offset exceeds tile size.
		if (positionsShifted !== 0) {
			_focusPxOffsetX = 0;

			_focusPositionX += positionsShifted;
		}
	}

 	/**
	 * Update camera focus offset in vertical axis.
	 * @param  {Number} px Amount of pixels that the camera focus will be shifted.
	 */
	Camera.prototype.shiftFocusOffsetY = function(px) {
		_focusPxOffsetY += px;

		let positionsShifted = Math.floor(Math.abs(_focusPxOffsetY) / _tileSize) * Math.sign(_focusPxOffsetY);

		// Update camera focus position in case offset exceeds tile size.
		if (positionsShifted !== 0) {
			_focusPxOffsetY = 0;

			_focusPositionY += positionsShifted;
		}
	}

 	/**
	 * Getter for camera focus offset in horizontal axis.
	 * @return  {Number} Camera focus ofrset in px.
	 */
	Camera.prototype.getFocusOffsetX = function() {
		return _focusPxOffsetX;
	}

 	/**
	 * Getter for camera focus offset in vertical axis.
	 * @return  {Number} Camera focus ofrset in px.
	 */
	Camera.prototype.getFocusOffsetY = function() {
		return _focusPxOffsetY;
	}

 	/**
	 * Getter for camera focus in-game position in horizontal axis.
	 * @return  {Number} Camera focus in-game position.
	 */
	Camera.prototype.getFocusPositionX = function() {
		return _focusPositionX;
	}

 	/**
	 * Getter for camera focus in-game position in vertical axis.
	 * @return  {Number} Camera focus in-game position.
	 */
	Camera.prototype.getFocusPositionY = function() {
		return _focusPositionY;
	}

	return Camera;

})();