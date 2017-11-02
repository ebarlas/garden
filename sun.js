function GardenSun(opts) {
    this.radius = opts.radius;
    this.position = SunCalc.getPosition(opts.date, opts.latitude, opts.longitude);
}

GardenSun.prototype.setSize = function (width, height) {
    this.width = width;
    this.height = height;
    return this;
};

GardenSun.prototype.render = function (ctx) {
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
};