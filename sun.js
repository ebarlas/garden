GardenSun.DateFormat = {month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'};

function GardenSun(opts) {
    this.radius = opts.radius || 50;
    this.margin = opts.margin || 20;
    this.date = opts.date;
    this.position = SunCalc.getPosition(opts.date, opts.latitude, opts.longitude);
}

GardenSun.prototype.setSize = function (width, height) {
    this.width = width;
    this.height = height;
    return this;
};

GardenSun.prototype.toDegrees = function (radians) {
    return radians * (180 / Math.PI);
};

GardenSun.prototype.render = function (ctx) {
    if (this.position.altitude <= 0) {
        return;
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
    if (center.y + ny * xic <= this.height) {
        x = center.x + xi;
        y = center.y + ny * xic;
    } else {
        x = center.x + nx * yic;
        y = center.y + yi;
    }

    const gradient = ctx.createRadialGradient(x, y, this.radius, x, y, 0);
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(1, 'yellow');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();

    const lines = [
        this.date.toLocaleDateString('en', GardenSun.DateFormat),
        "Sun Altitude " + Math.round(this.toDegrees(this.position.altitude)) + '\u00B0',
        "Sun Azimuth " + Math.round(this.toDegrees(rads)) + '\u00B0'
    ];

    new Textbox()
        .setText(lines)
        .setPosition({x: this.width - this.margin, y: this.margin})
        .setStyle(Textbox.UpperRight)
        .render(ctx);
};