/**
 * Utility for sizing and rendering a textbox given lines of text.
 */

Textbox.Anchor = {
    UpperLeft: 1,
    LowerLeft: 2,
    UpperRight: 3,
    LowerRight: 4
};

function Textbox(ctx, opts = {}) {
    this.ctx = ctx;
    this.margin = opts.margin || 12;
    this.fontSize = opts.fontSize || 18;
    this.lineHeight = opts.lineHeight || 12;
    this.fill = opts.fill === undefined || opts.fill === null || opts.fill;
}

Textbox.prototype.maxWidth = function (lines) {
    let max = 0;
    lines.forEach(line => max = Math.max(this.ctx.measureText(line).width, max));
    return max;
};

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

Textbox.prototype.boundingBox = function() {
    this.ctx.font = this.fontSize + 'px serif';

    const maxTextWidth = this.maxWidth(this.lines);
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

Textbox.prototype.contains = function(x, y) {
    const box = this.boundingBox();
    return x >= box.x && x <= box.x + box.width && y >= box.y && y <= box.y + box.height;
};

Textbox.prototype.scaledContains = function(x, y, scale, translation) {
    const box = this.boundingBox();
    const bx = box.x * scale + translation.x;
    const by = box.y * scale + translation.y;
    const bw = box.width * scale;
    const bh = box.height * scale;
    return x >= bx && x <= bx + bw && y >= by && y <= by + bh;
};

Textbox.prototype.render = function () {
    const box = this.boundingBox();

    if (this.fill) {
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(box.x, box.y, box.width, box.height);
        this.ctx.fillStyle = 'black';
        this.ctx.strokeRect(box.x, box.y, box.width, box.height);
    }

    for (let i = 0; i < this.lines.length; i++) {
        this.ctx.fillText(this.lines[i], box.x + this.margin, box.y + this.lineHeight * (2 * (i + 1)));
    }
};