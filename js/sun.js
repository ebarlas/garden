/**
 * Component for visually rendering sun and moon based on position from SunCalc.
 *
 * Dependencies:
 *   - Astro (astro.js)
 *   - Textbox (textbox.js)
 *   - GardenAngle (angle.js)
 */

GardenSun.Type = {
    Sun: 1,
    Moon: 2
};

function GardenSun(canvas, image, astro, type) {
    this.radius = 75;
    this.margin = 20;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.astro = astro;
    this.image = image;
    this.type = type || GardenSun.Type.Sun;
    this.showText = false;
}

GardenSun.prototype.computePosition = function () {
    const width = this.canvas.width;
    const height = this.canvas.height;

    // convert angle orientation from [south to west] to [east to north]
    const azimuth = 3 * Math.PI / 2 - (this.type === GardenSun.Type.Sun ? this.astro.sun.azimuth : this.astro.moon.azimuth);

    // find border intercept
    const i = GardenBorder.intercept(width, height, azimuth);

    // map on to canvas coordinate system
    return {
        x: width / 2 + i.x,
        y: height / 2 - i.y,
        azimuth: azimuth,
        altitude: (this.type === GardenSun.Type.Sun ? this.astro.sun.altitude : this.astro.moon.altitude)
    };
};

GardenSun.prototype.onTap = function (click) {
    const sun = this.computePosition();
    const xDiff = click.x - sun.x;
    const yDiff = click.y - sun.y;
    this.showText = xDiff * xDiff + yDiff * yDiff <= this.radius * this.radius;
};

GardenSun.prototype.render = function () {
    const sun = this.computePosition();
    const ctx = this.ctx;

    ctx.save();
    ctx.beginPath();
    ctx.setLineDash([1, 4]);
    ctx.moveTo(this.canvas.width / 2, 0);
    ctx.lineTo(this.canvas.width / 2, this.canvas.height / 2);
    ctx.lineTo(sun.x, sun.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(this.canvas.width / 2, this.canvas.height / 2, 50, 3 * Math.PI / 2, -sun.azimuth, false);
    ctx.stroke();
    ctx.restore();

    ctx.drawImage(this.image, sun.x - this.radius, sun.y - this.radius, this.radius * 2, this.radius * 2);

    if (this.showText) {
        const altitude = Math.round(GardenAngle.toDegrees(sun.altitude));

        // compass orientation = [90 - trig orientation]
        const azimuth = Math.round(GardenAngle.normalizeDegrees(90 - GardenAngle.toDegrees(sun.azimuth)));

        const lines = [
            "Altitude " + altitude + '\u00B0',
            "Azimuth " + azimuth + '\u00B0 ' + GardenAngle.toDirection(azimuth)
        ];

        if (this.type === GardenSun.Type.Moon) {
            lines.splice(0, 0, Astro.moonPhase(this.astro.moonIllumination.phase));
        }

        let style;
        let position;
        if (sun.x === 0) {
            if (sun.y < this.canvas.height / 2) {
                position = {x: sun.x + this.radius, y: sun.y + this.radius};
                style = Textbox.Anchor.UpperLeft;
            } else {
                position = {x: sun.x + this.radius, y: sun.y - this.radius};
                style = Textbox.Anchor.LowerLeft;
            }
        } else if (sun.x === this.canvas.width) {
            if (sun.y < this.canvas.height / 2) {
                position = {x: sun.x - this.radius, y: sun.y + this.radius};
                style = Textbox.Anchor.UpperRight;
            } else {
                position = {x: sun.x - this.radius, y: sun.y - this.radius};
                style = Textbox.Anchor.LowerRight;
            }
        } else if (sun.x < this.canvas.width / 2) {
            if (sun.y === 0) {
                position = {x: sun.x + this.radius, y: sun.y + this.radius};
                style = Textbox.Anchor.UpperLeft;
            } else {
                position = {x: sun.x + this.radius, y: sun.y - this.radius};
                style = Textbox.Anchor.LowerLeft;
            }
        } else {
            if (sun.y === 0) {
                position = {x: sun.x - this.radius, y: sun.y + this.radius};
                style = Textbox.Anchor.UpperRight;
            } else {
                position = {x: sun.x - this.radius, y: sun.y - this.radius};
                style = Textbox.Anchor.LowerRight;
            }
        }

        new Textbox(ctx)
            .setText(lines)
            .setPosition(position)
            .setStyle(style)
            .render();
    }
};