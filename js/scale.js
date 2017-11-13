/**
 * Utility for displaying scale line.
 */

function Scale(opts = {}) {
    this.fontSize = opts.fontSize || 14;
    this.lineWidth = opts.lineWidth || 150;
    this.sideMargin = opts.sideMargin || 20;
    this.endHeight = opts.endHeight || 10;
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

    const text = Math.round(this.lineWidth * feetPerScaledPixel) + " feet";
    const textWidth = ctx.measureText(text).width;

    ctx.beginPath();
    ctx.moveTo(this.width - this.sideMargin - this.lineWidth, this.height - this.sideMargin);
    ctx.lineTo(this.width - this.sideMargin, this.height - this.sideMargin);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.width - this.sideMargin - this.lineWidth, this.height - this.sideMargin - this.endHeight / 2);
    ctx.lineTo(this.width - this.sideMargin - this.lineWidth, this.height - this.sideMargin + this.endHeight / 2);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.width - this.sideMargin, this.height - this.sideMargin - this.endHeight / 2);
    ctx.lineTo(this.width - this.sideMargin, this.height - this.sideMargin + this.endHeight / 2);
    ctx.closePath();
    ctx.stroke();

    ctx.fillText(text, this.width - this.sideMargin - this.lineWidth / 2 - textWidth / 2, this.height - this.sideMargin - 5);
};