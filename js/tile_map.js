let TileMap = (() => {
	let _tileSize = null;
	let _tileMap = [];

	function TileMap(tileSize) {

		try {
			if(isNaN(tileSize) || tileSize < 1)
				throw `tile size ${tileSize} is not a valid value`;
		}
		catch(err) {
			console.error('Error in TileMap constructor: ' + err);
		}

		_tileSize = tileSize;
	}
 
 	/**
	 * Initialize tile map.
	 * @param  {Array}  tileIDMap 2-dimensional array containing IDs of each element in game that should be translated into a tile.
	 * @param  {Array} 	spriteMap Array that sets correspondency between ID and tile that should be rendered.
	 * @param  {Number} sliceFromCoordsX Coords to initilize tile map with a slice of IDs map. 
	 * @param  {Number} sliceToCoordsX Coords to initilize tile map with a slice of IDs map.
	 * @param  {Number} sliceFromCoordsY Coords to initilize tile map with a slice of IDs map.
	 * @param  {Number} sliceToCoordsY Coords to initilize tile map with a slice of IDs map.
	 */
	TileMap.prototype.initialize = function(tileIDMap, spriteMap, sliceFromCoordsX=null, sliceToCoordsX=null, sliceFromCoordsY=null, sliceToCoordsY=null) {
		const tileIDMapSizeX = tileIDMap.length;
		const tileIDMapSizeY = tileIDMap[0].length;

		for (let x=Math.max(0, sliceFromCoordsX ?? 0); x < Math.min(tileIDMapSizeX, sliceToCoordsX ?? tileIDMap.length); x++) {
			_tileMap[x] = [];

			for (let y=Math.max(0, sliceFromCoordsY ?? 0); y < Math.min(tileIDMapSizeY, sliceToCoordsY ?? tileIDMap.length); y++) {
				let spriteWrapper = spriteMap[tileIDMap[x][y]];

				if (typeof spriteWrapper !== 'undefined' && spriteWrapper.hasOwnProperty('renderSprite')) {
					_tileMap[x][y] = spriteWrapper;
				}
				else {
					_tileMap[x][y] = null;
				}
			}
		}
	}

	/**
	 * Render set of tiles accordingly to canvas dimensions.
	 * @param  {Object} ctx Canvas context object.
	 * @param  {Number} canvasWidth Canvas width in px.
	 * @param  {Number} canvasHeight Canvas height in px.
	 * @param  {Number} cameraFocusPostionX In-game position of game camera in horizontal axis.
	 * @param  {Number} cameraFocusPostionY In-game position of game camera in vertical axis.
	 * @param  {Number} cameraFocusPostionY Game camera offset in horizontal axis in px.
	 * @param  {Number} cameraFocusPostionY Game camera offset in vertical axis in px.
	 */
	TileMap.prototype.render = function(ctx, canvasWidth, canvasHeight, cameraFocusPostionX, cameraFocusPostionY, cameraOffsetX=0, cameraOffsetY=0) {
		let offsetPosX = 0,
			offsetPosY = 0,
			initialOffsetX = 0,
			finalOffsetX = 0,
			initialOffsetY = 0,
			finalOffsetY = 0;

	    const max_tiles_x = Math.ceil((canvasWidth / _tileSize)),
	    	  max_tiles_y = Math.ceil((canvasHeight / _tileSize));

	    if (cameraOffsetX < 0) {
	      initialOffsetX = -1;
	      offsetPosX -= cameraOffsetX + _tileSize;
	    } else if (cameraOffsetX > 0) {
	      finalOffsetX = 1;
	      offsetPosX -= cameraOffsetX;
	    }

    	if (cameraOffsetY < 0) {
	      initialOffsetY = -1;
	      offsetPosY -= cameraOffsetY + _tileSize;
	    } else if (cameraOffsetY > 0) {
	      finalOffsetY = 1;
	      offsetPosY -= cameraOffsetY;
	    }


	    const display_from_x = cameraFocusPostionX - Math.ceil(max_tiles_x/2) + initialOffsetX,
	    	display_to_x = cameraFocusPostionX + Math.ceil(max_tiles_x/2) + finalOffsetX,
	    	display_from_y = cameraFocusPostionY - Math.ceil(max_tiles_y/2) + initialOffsetY,
	    	display_to_y = cameraFocusPostionY + Math.ceil(max_tiles_y/2) + finalOffsetY;

	    let drawOffsetX = offsetPosX;
	    let drawOffsetY = offsetPosY;

		for (let x = display_from_x; x < display_to_x; x++) {
			for (let y = display_from_y; y < display_to_y; y++) {
				// Function.prototype.call.bind(Object.prototype.toString);
				
				if (_tileMap[x][y] !== null) {
	  				_tileMap[x][y].renderSprite(ctx, drawOffsetX, drawOffsetY);
	  			}

	        	drawOffsetY += _tileSize;
	      }

	      drawOffsetX += _tileSize;
	      drawOffsetY = offsetPosY;
	    }
	}

	return TileMap;

})();