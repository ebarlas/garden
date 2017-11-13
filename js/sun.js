GardenSun.DateFormat = {month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'};

function GardenSun(opts) {
    this.radius = opts.radius || 75;
    this.margin = opts.margin || 20;
    this.image = opts.image || 'imgSun';
    this.date = opts.date;
    this.position = opts.position;
    this.showText = false;
}

GardenSun.prototype.setSize = function (width, height) {
    this.width = width;
    this.height = height;
    return this;
};

GardenSun.prototype.compute = function () {
    if (this.position.altitude <= 0) {
        return null;
    }

    // find border intercept
    const i = GardenBorder.intercept(this.width, this.height, this.position.azimuth);

    // map on to canvas coordinate system
    return {
        x: this.width / 2 + i.x,
        y: this.height / 2 - i.y
    };
};

GardenSun.prototype.onTap = function (click) {
    const sun = this.compute();
    if (!sun) {
        return;
    }

    const xDiff = click.x - sun.x;
    const yDiff = click.y - sun.y;
    this.showText = xDiff * xDiff + yDiff * yDiff <= this.radius * this.radius;
};

GardenSun.prototype.render = function (ctx) {
    const sun = this.compute();
    if (!sun) {
        return;
    }

    ctx.save();
    ctx.beginPath();
    ctx.setLineDash([1, 4]);
    ctx.moveTo(this.width / 2, 0);
    ctx.lineTo(this.width / 2, this.height / 2);
    ctx.lineTo(sun.x, sun.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(this.width / 2, this.height / 2, 50, 3 * Math.PI / 2, -this.position.azimuth, false);
    ctx.stroke();
    ctx.restore();

    const image = document.getElementById(this.image);
    ctx.drawImage(image, sun.x - this.radius, sun.y - this.radius, this.radius * 2, this.radius * 2);

    if (this.showText) {
        const altitude = Math.round(GardenAngle.toDegrees(this.position.altitude));

        // compass orientation = [90 - trig orientation]
        const azimuth = Math.round(GardenAngle.normalizeDegrees(90 - GardenAngle.toDegrees(this.position.azimuth)));

        const lines = [
            this.date.toLocaleDateString('en', GardenSun.DateFormat),
            "Altitude " + altitude + '\u00B0',
            "Azimuth " + azimuth + '\u00B0 ' + GardenAngle.toDirection(azimuth)
        ];

        let style;
        let position;
        if (sun.x === 0) {
            if (sun.y < this.height / 2) {
                position = {x: sun.x + this.radius, y: sun.y + this.radius};
                style = Textbox.UpperLeft;
            } else {
                position = {x: sun.x + this.radius, y: sun.y - this.radius};
                style = Textbox.LowerLeft;
            }
        } else if (sun.x === this.width) {
            if (sun.y < this.height / 2) {
                position = {x: sun.x - this.radius, y: sun.y + this.radius};
                style = Textbox.UpperRight;
            } else {
                position = {x: sun.x - this.radius, y: sun.y - this.radius};
                style = Textbox.LowerRight;
            }
        } else if (sun.x < this.width / 2) {
            if (sun.y === 0) {
                position = {x: sun.x + this.radius, y: sun.y + this.radius};
                style = Textbox.UpperLeft;
            } else {
                position = {x: sun.x + this.radius, y: sun.y - this.radius};
                style = Textbox.LowerLeft;
            }
        } else {
            if (sun.y === 0) {
                position = {x: sun.x - this.radius, y: sun.y + this.radius};
                style = Textbox.UpperRight;
            } else {
                position = {x: sun.x - this.radius, y: sun.y - this.radius};
                style = Textbox.LowerRight;
            }
        }

        new Textbox()
            .setText(lines)
            .setPosition(position)
            .setStyle(style)
            .render(ctx);
    }
};