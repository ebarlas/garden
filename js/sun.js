GardenSun.Directions = [
    {degrees: 0, direction: "N"},
    {degrees: 11.25, direction: "NNE"},
    {degrees: 33.75, direction: "NE"},
    {degrees: 56.25, direction: "ENE"},
    {degrees: 78.75, direction: "E"},
    {degree: 101.25, direction: "ESE"},
    {degrees: 123.75, direction: "SE"},
    {degrees: 146.25, direction: "SSE"},
    {degrees: 168.75, direction: "S"},
    {degrees: 191.25, direction: "SSW"},
    {degrees: 213.75, direction: "SW"},
    {degrees: 236.25, direction: "WSW"},
    {degrees: 258.75, direction: "W"},
    {degrees: 281.25, direction: "WNW"},
    {degrees: 303.75, direction: "NW"},
    {degrees: 326.25, direction: "NNW"},
    {degrees: 348.75, direction: "N"}
];

GardenSun.DateFormat = {month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'};

GardenSun.toDirection = function (degrees) {
    while (degrees < 0) degrees += 360;
    while (degrees > 360) degrees -= 360;

    for (let i = 1; i < GardenSun.Directions.length; i++) {
        if (degrees >= GardenSun.Directions[i - 1].degrees && degrees <= GardenSun.Directions[i].degrees) {
            return GardenSun.Directions[i - 1].direction;
        }
    }

    return GardenSun.Directions[GardenSun.Directions.length - 1].direction;
};

function GardenSun(opts) {
    this.radius = opts.radius || 75;
    this.margin = opts.margin || 20;
    this.date = opts.date;
    this.position = SunCalc.getPosition(opts.date, opts.latitude, opts.longitude);
    this.showText = false;
}

GardenSun.prototype.setSize = function (width, height) {
    this.width = width;
    this.height = height;
    return this;
};

GardenSun.prototype.toDegrees = function (radians) {
    return radians * (180 / Math.PI);
};

GardenSun.prototype.compute = function () {
    if (this.position.altitude <= 0) {
        return null;
    }

    const rads = this.position.azimuth + Math.PI / 2;

    const nx = Math.cos(rads);
    const ny = Math.sin(rads);

    const center = {x: this.width / 2, y: this.height / 2};

    const xi = nx > 0 ? this.width - center.x : -center.x;
    const yi = ny > 0 ? this.height - center.y : -center.y;

    const xic = xi / nx;
    const yic = yi / ny;

    let x, y;
    if (ny > 0 && center.y + ny * xic <= this.height || ny < 0 && center.y + ny * xic >= 0) {
        x = center.x + xi;
        y = center.y + ny * xic;
    } else {
        x = center.x + nx * yic;
        y = center.y + yi;
    }

    return {x: x, y: y};
};

GardenSun.prototype.onTap = function (click) {
    console.log('tap', click);
    const sun = this.compute();

    const xDiff = click.x - sun.x;
    const yDiff = click.y - sun.y;
    this.showText = xDiff * xDiff + yDiff * yDiff <= this.radius * this.radius;
};

GardenSun.prototype.render = function (ctx) {
    const sun = this.compute();
    const image = document.getElementById('imgSun');
    ctx.drawImage(image, sun.x - this.radius, sun.y - this.radius, this.radius * 2, this.radius * 2);

    if (this.showText) {
        const altitude = Math.round(this.toDegrees(this.position.altitude));
        const azimuth = Math.round(this.toDegrees(this.position.azimuth + Math.PI / 2));

        const lines = [
            this.date.toLocaleDateString('en', GardenSun.DateFormat),
            "Sun Altitude " + altitude + '\u00B0',
            "Sun Azimuth " + azimuth + '\u00B0 ' + GardenSun.toDirection(azimuth + 90)
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