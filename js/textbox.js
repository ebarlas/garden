/**
 * Utility for sizing and rendering a textbox given lines of text.
 */

Textbox.Anchor = {
    UpperLeft: 1,
    LowerLeft: 2,
    UpperRight: 3,
    LowerRight: 4
};

Textbox.maxWidth = function (lines, ctx) {
    let max = 0;
    lines.forEach(line => max = Math.max(ctx.measureText(line).width, max));
    return max;
};

function Textbox(opts = {}) {
    this.margin = opts.margin || 10;
    this.fontSize = opts.fontSize || 16;
    this.lineHeight = opts.lineHeight || 10;
    this.fill = opts.fill === undefined || opts.fill === null || opts.fill;
}

Textbox.prototype.setFill = function (fill) {
    this.fill = fill;
    return this;
};

Textbox.prototype.setText = function (lines) {
    this.lines = lines;
    return this;
};

Textbox.prototype.setPosition = function (position) {
    this.position = position;
    return this;
};

Textbox.prototype.setStyle = function (style) {
    this.style = style;
    return this;
};

Textbox.prototype.getHeight = function() {
   return this.lineHeight * (2 * this.lines.length + 1);
};

Textbox.prototype.boundingBox = function(ctx) {
    ctx.font = this.fontSize + 'px serif';

    const maxTextWidth = Textbox.maxWidth(this.lines, ctx);
    const width = maxTextWidth + this.margin * 2;
    const height = this.getHeight();

    let x, y;
    if (this.style === Textbox.Anchor.UpperLeft) {
        x = this.position.x;
        y = this.position.y;
    } else if (this.style === Textbox.Anchor.LowerLeft) {
        x = this.position.x;
        y = this.position.y - height;
    } else if (this.style === Textbox.Anchor.UpperRight) {
        x = this.position.x - width;
        y = this.position.y;
    } else if (this.style === Textbox.Anchor.LowerRight) {
        x = this.position.x - width;
        y = this.position.y - height;
    }

    return {x: x, y: y, width: width, height: height};
};

Textbox.prototype.contains = function(ctx, x, y) {
    const box = this.boundingBox(ctx);
    return x >= box.x && x <= box.x + box.width && y >= box.y && y <= box.y + box.height;
};

Textbox.prototype.render = function (ctx) {
    const box = this.boundingBox(ctx);

    if (this.fill) {
        ctx.lineWidth = 1;
        ctx.fillStyle = 'white';
        ctx.fillRect(box.x, box.y, box.width, box.height);
        ctx.fillStyle = 'black';
        ctx.strokeRect(box.x, box.y, box.width, box.height);
    }

    for (let i = 0; i < this.lines.length; i++) {
        ctx.fillText(this.lines[i], box.x + this.margin, box.y + this.lineHeight * (2 * (i + 1)));
    }
};