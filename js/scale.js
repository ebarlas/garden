/**
 * Utility for displaying scale line.
 */

function Scale(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.fontSize = 14;
    this.lineWidth = 200;
    this.sideMargin = 25;
    this.endHeight = 10;
}

Scale.prototype.render = function (feetPerScaledPixel, xSvg, ySvg) {
    const width = this.canvas.width;
    const height = this.canvas.height;
    const ctx = this.ctx;

    ctx.font = this.fontSize + 'px serif';
    ctx.lineWidth = 1;
    ctx.fillStyle = 'black';

    const text = Math.round(this.lineWidth * feetPerScaledPixel) + " feet";
    const textWidth = ctx.measureText(text).width;

    ctx.beginPath();
    ctx.moveTo(width - this.sideMargin - this.lineWidth, height - this.sideMargin);
    ctx.lineTo(width - this.sideMargin, height - this.sideMargin);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width - this.sideMargin - this.lineWidth, height - this.sideMargin - this.endHeight / 2);
    ctx.lineTo(width - this.sideMargin - this.lineWidth, height - this.sideMargin + this.endHeight / 2);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width - this.sideMargin, height - this.sideMargin - this.endHeight / 2);
    ctx.lineTo(width - this.sideMargin, height - this.sideMargin + this.endHeight / 2);
    ctx.closePath();
    ctx.stroke();

    ctx.fillText(text, width - this.sideMargin - this.lineWidth / 2 - textWidth / 2, height - this.sideMargin - 5);

    ctx.fillText(`${xSvg.toFixed(2)}, ${ySvg.toFixed(2)}`, this.sideMargin, this.sideMargin);
};