const canvasSpriteWrapper = function(spriteSheetImg, spriteSizeSqPx, spriteRowIndex, spriteColumnIndex) {
	this.spriteSheetImg = spriteSheetImg;
	this.spriteSizeSqPx = spriteSizeSqPx;
	this.spriteRowIndex = spriteRowIndex;
	this.spriteColumnIndex = spriteColumnIndex;

	this.renderSprite = function(ctx, sx, sy) {
		ctx.drawImage(
			this.spriteSheetImg,
			this.spriteSizeSqPx * this.spriteRowIndex,
			this.spriteSizeSqPx * this.spriteColumnIndex,
			this.spriteSizeSqPx,
			this.spriteSizeSqPx,
			sx,
			sy,
			TILESIZE,
			TILESIZE
		);
	};

}