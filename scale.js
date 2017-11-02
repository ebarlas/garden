function Scale(opts) {
    this.fontSize = opts.fontSize;
}

Scale.prototype.setSize = function (width, height) {
    this.width = width;
    this.height = height;
    return this;
};

Scale.prototype.render = function (ctx, feetPerScaledPixel) {
    ctx.font = this.fontSize + 'px serif';
    ctx.lineWidth = 1;
    ctx.fillStyle = 'black';

    const sideMargin = this.width / 15;
    const lineWidth = sideMargin * 2;
    const text = Math.round(lineWidth * feetPerScaledPixel) + " feet";
    const textWidth = ctx.measureText(text).width;

    ctx.beginPath();
    ctx.moveTo(this.width - sideMargin - lineWidth, this.height - sideMargin);
    ctx.lineTo(this.width - sideMargin, this.height - sideMargin);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.width - sideMargin - lineWidth, this.height - sideMargin - 5);
    ctx.lineTo(this.width - sideMargin - lineWidth, this.height - sideMargin + 5);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.width - sideMargin, this.height - sideMargin - 5);
    ctx.lineTo(this.width - sideMargin, this.height - sideMargin + 5);
    ctx.closePath();
    ctx.stroke();

    ctx.fillText(text, this.width - sideMargin - lineWidth / 2 - textWidth / 2, this.height - sideMargin - 5);
};