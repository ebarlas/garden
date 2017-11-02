Textbox.UpperLeft = 1;
Textbox.LowerLeft = 2;
Textbox.UpperRight = 3;
Textbox.LowerRight = 4;

Textbox.maxWidth = function (lines, ctx) {
    let max = 0;
    lines.forEach(line => max = Math.max(ctx.measureText(line).width, max));
    return max;
};

function Textbox(opts) {
    this.margin = opts.margin;
    this.fontSize = opts.fontSize;
    this.lineHeight = opts.lineHeight;
}

Textbox.prototype.setText = function (lines) {
    this.lines = lines;
    return this;
};

Textbox.prototype.setPosition = function (position) {
    this.position = position;
    return this;
};

Textbox.prototype.render = function (ctx, style) {
    ctx.font = this.fontSize + 'px serif';

    const maxTextWidth = Textbox.maxWidth(this.lines, ctx);
    const width = maxTextWidth + this.margin * 2;
    const height = this.lineHeight * (2 * this.lines.length + 1);

    let x, y;
    if (style === Textbox.UpperLeft) {
        x = this.position.x;
        y = this.position.y;
    } else if (style === Textbox.LowerLeft) {
        x = this.position.x;
        y = this.position.y - height;
    } else if (style === Textbox.UpperRight) {
        x = this.position.x - width;
        y = this.position.y;
    } else if (style === Textbox.LowerRight) {
        x = this.position.x - width;
        y = this.position.y - height;
    }

    ctx.lineWidth = 1;
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = 'black';
    ctx.strokeRect(x, y, width, height);
    for (let i = 0; i < this.lines.length; i++) {
        ctx.fillText(this.lines[i], x + this.margin, y + this.lineHeight * (2 * (i + 1)));
    }
};