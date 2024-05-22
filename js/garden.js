/**
 * Main entry point for garden js application.
 *
 * Dependencies:
 *   - Svg (svg.js)
 *   - Astro (astronomy.js)
 *   - GardenSun (sun.js)
 *   - GardenControl (control.js)
 *   - Scale (scale.js)
 *   - Textbox (textbox.js)
 *   - Hammer
 */

Garden.DateFormat = {month: '2-digit', day: '2-digit', year: 'numeric'};

function Garden(canvas, sunImage, moonImage, svg, mo) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.svg = svg;

    // click tracking for pan
    this.pan = {x: 0, y: 0};

    this.framesPerPeriod = 30;
    this.frameInterval = 50;
    this.zoomOpts = {pinch: 1.05, wheel: 1.05, tap: 1.0, max: 12};

    this.emphasized = [];

    /*
    http://colorbrewer2.org
    this.colorPalette = ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f'];
    this.colorPalette = ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'];
    this.colorPalette = ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666'];
    */

    this.colorPalette = ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', /*'#ffff99',*/ '#b15928'];

    this.astro = new Astro(svg.latitude, svg.longitude, mo);

    this.sun = new GardenSun(canvas, sunImage, this.astro, GardenSun.Type.Sun);
    this.moon = new GardenSun(canvas, moonImage, this.astro, GardenSun.Type.Moon);
    this.control = new GardenControl(canvas, this.astro);
    this.gardenScale = new Scale(canvas);
    this.selectionBox = new Textbox(this.ctx);

    window.addEventListener('resize', () => this.onWindowResize(), false);

    canvas.addEventListener('wheel', (evt) => this.onWheel(evt));

    const hammertime = new Hammer(canvas, {threshold: 1});
    hammertime.get('pan').set({threshold: 0, direction: Hammer.DIRECTION_ALL});
    hammertime.get('pinch').set({enable: true});
    hammertime.on('panmove', (evt) => this.onPanMove(evt));
    hammertime.on('panend', (evt) => this.onPanEnd(evt));
    hammertime.on('tap', (evt) => this.onTap(evt));
    hammertime.on('pinchin', (evt) => this.onPinchIn(evt));
    hammertime.on('pinchout', (evt) => this.onPinchOut(evt));

    this.onWindowResize();
}

Garden.prototype.emphasize = function(species, instance) {
    const garden = this;

    if (species) {
        if (instance) {
            const pos = svg.visiblePositionAt(species, instance, this.astro.getDate());
            this.emphasized = pos ? [pos] : [];
        } else {
            this.emphasized = svg.visiblePositionsAt(species, this.astro.getDate());
        }

        this.frame = 0;
        this.intervalId = window.setInterval(() => {
            garden.render();
            this.frame = (this.frame + 1) % this.framesPerPeriod;
        }, this.frameInterval);
    }
};

Garden.prototype.canvasCenter = function () {
    return {x: this.canvas.width / 2, y: this.canvas.height / 2};
};

Garden.prototype.onWindowResize = function () {
    this.canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    this.canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    this.control.resize();
    this.resetScale();
    this.render();
};

Garden.prototype.resetScale = function () {
    const widthScale = this.canvas.width / this.svg.width;
    const heightScale = this.canvas.height / this.svg.height;

    this.scale = Math.min(widthScale, heightScale);
    this.scaleRange = {min: this.scale, max: this.scale * this.zoomOpts.max};

    if (this.scale === widthScale) {
        this.translation = {x: 0, y: (this.canvas.height - (this.svg.height * this.scale)) / 2.0};
    } else {
        this.translation = {x: (this.canvas.width - (this.svg.width * this.scale)) / 2.0, y: 0};
    }
};

Garden.prototype.findTouchedIndividual = function (click, grace) {
    let min;
    let match = null;

    const scale = this.scale;
    const translation = this.translation;

    this.svg.forEachIndividualAt((c) => {
        const xDiff = click.x - (c.x * scale + translation.x);
        const yDiff = click.y - (c.y * scale + translation.y);
        const rad = (c.r + grace) * scale;
        if (xDiff * xDiff + yDiff * yDiff <= rad * rad && (!min || rad < min)) {
            min = rad;
            match = c;
        }
    }, this.astro.getDate());

    return match;
};

Garden.prototype.clickCoordinates = function (e) {
    if (e.offsetX && e.offsetY) {
        return {x: e.offsetX, y: e.offsetY};
    }

    const rect = this.canvas.getBoundingClientRect();
    const x = e.pageX - rect.left;
    const y = e.pageY - rect.top;
    return {x: x, y: y};
};

Garden.prototype.zoom = function (zoomIn, zoomFactor, click) {
    const percentOfWidthLeftOfCenter = (click.x - this.translation.x) / (this.canvas.width * this.scale);
    const percentOfHeightTopOfCenter = (click.y - this.translation.y) / (this.canvas.height * this.scale);
    this.scale = Math.min(this.scaleRange.max, Math.max(this.scaleRange.min, zoomIn ? this.scale * zoomFactor : this.scale / zoomFactor));
    this.translation.x = this.canvas.width / 2 - this.canvas.width * this.scale * percentOfWidthLeftOfCenter;
    this.translation.y = this.canvas.height / 2 - this.canvas.height * this.scale * percentOfHeightTopOfCenter;
};

Garden.prototype.onPanMove = function (evt) {
    this.translation.x += evt.deltaX - this.pan.x;
    this.translation.y += evt.deltaY - this.pan.y;
    this.pan.x = evt.deltaX;
    this.pan.y = evt.deltaY;
    this.render();
};

Garden.prototype.onPanEnd = function (evt) {
    this.pan.x = 0;
    this.pan.y = 0;
};

Garden.prototype.findClickTarget = function (click, double) {
    const prevSelection = this.selection;

    // clear selection
    this.selection = null;

    // control overlay clicked
    if(this.control.onTap(click)) {
        return;
    }

    // individual selection box clicked
    if (prevSelection) {
        if (this.selectionBox.scaledContains(click.x, click.y, this.scale, this.translation)) {
            window.location.href = `individuals.html?species=${prevSelection.species}&individual=${prevSelection.individual}`;
            return;
        }
    }

    // sun clicked
    if (this.control.showSun && this.sun.onTap(click)) {
        return;
    }

    // moon clicked
    if (this.control.showMoon && this.moon.onTap(click)) {
        return;
    }

    // individual plant clicked within radius
    if (this.selection = this.findTouchedIndividual(click, 0)) {
        return;
    }

    // individual plant clicked within radius + grace
    if (this.selection = this.findTouchedIndividual(click, 20)) {
        return;
    }

    if (double) {
        this.zoom(true, this.zoomOpts.tap, click);
        return;
    }

    if (this.intervalId) {
        clearInterval(this.intervalId);
        this.emphasized = [];
        this.intervalId = null;
    }
};

Garden.prototype.onTap = function (evt) {
    // convert event to click coordinates
    const click = this.clickCoordinates(evt.srcEvent);

    // find click target
    this.findClickTarget(click, evt.tapCount === 2);

    // update individual selection details textbox
    this.updateSelection();

    // re-render canvas
    this.render();
};

Garden.prototype.onPinchIn = function (evt) {
    this.zoom(false, this.zoomOpts.pinch, this.canvasCenter());
    this.render();
};

Garden.prototype.onPinchOut = function (evt) {
    this.zoom(true, this.zoomOpts.pinch, this.canvasCenter());
    this.render();
};

Garden.prototype.onWheel = function (evt) {
    if (evt.deltaY !== 0) {
        this.zoom(evt.deltaY < 0, this.zoomOpts.wheel, this.canvasCenter());
        this.render();
    }

    evt.preventDefault();
};

Garden.prototype.updateSelection = function () {
    if (!this.selection) {
        return;
    }

    const sel = this.selection;
    const species = this.svg.getSpecies(sel.species);
    const events = this.svg.individualEvents(sel.species, sel.individual);

    const lines = [
        species.scientificName,
        species.commonName,
        "Individual " + sel.individual,
        "Introduced " + events[0].moment.toLocaleDateString('en', Garden.DateFormat)
    ];

    this.selectionBox
        .setPosition({x: sel.x + sel.r, y: sel.y - sel.r})
        .setText(lines)
        .setStyle(Textbox.Anchor.LowerLeft);
};

Garden.prototype.pulsate = function (ctx) {
    this.emphasized.forEach(h => {
        const r = this.interpolate(this.frame / this.framesPerPeriod);
        ctx.beginPath();
        ctx.arc(h.x, h.y, r * 100, 0, Math.PI * 2, false);
        ctx.strokeStyle = 'rgba(0, 0, 0, ' + (1.0 - r) + ')';
        ctx.stroke();
    });
};

Garden.prototype.interpolate = function (input) {
    return 1.0 - (1.0 - input) * (1.0 - input);
};

Garden.prototype.render = function () {
    const ctx = this.ctx;
    const svg = this.svg;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.save();
    ctx.lineWidth = 1;
    ctx.translate(this.translation.x, this.translation.y);
    ctx.scale(this.scale, this.scale);

    ctx.strokeRect(0, 0, svg.width, svg.height);

    svg.paths.forEach(p => {
        ctx.stroke(new Path2D(p.d));
    });

    this.pulsate(ctx);

    ctx.globalAlpha = 0.9;

    const circles = [];
    svg.forEachIndividualAt(c => circles.push(c), this.astro.getDate());
    circles.sort((l, r) => r.r - l.r);

    circles.forEach(c => {
        const species = svg.getSpecies(c.species);
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2, false);
        ctx.fillStyle = this.colorPalette[species.index % this.colorPalette.length];
        ctx.fill();
    });

    if (this.selection) {
        this.selectionBox.render();
    }

    ctx.restore();

    if (this.control.showSun) {
        this.sun.render();
    }

    if (this.control.showMoon) {
        this.moon.render();
    }

    if (this.control.showScale) {
        const xCanvas = this.canvas.width / 2;
        const yCanvas = this.canvas.height / 2;
        const xSvg = (xCanvas - this.translation.x) / this.scale;
        const ySvg = (yCanvas - this.translation.y) / this.scale;
        const ftPerPxScaled = this.svg.feetPerPixel() / this.scale;
        this.gardenScale.render(ftPerPxScaled, xSvg, ySvg);
    }

    this.control.render();
};