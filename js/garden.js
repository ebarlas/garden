Garden.DateFormat = {month: '2-digit', day: '2-digit', year: 'numeric'};

function Garden(config) {
    this.svg = config.svg;
    this.date = config.date;
    this.canvas = config.canvas;
    this.ctx = config.canvas.getContext('2d');
    this.pan = {x: 0, y: 0};
    this.scale = null;
    this.scaleRange = null;
    this.translation = null;
    this.selection = null;
    this.framesPerPeriod = 30;
    this.frameInterval = 50;
    this.highlights = [];
    this.intervalId = null;
    this.sun = null;
    this.zoomOpts = {pinch: 1.05, wheel: 1.05, tap: 1.0, max: 12};
    this.speciesIndex = this.indexSpecies(config.speciesCatalog);
    /*
    http://colorbrewer2.org
    this.colorPalette = ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f'];
    this.colorPalette = ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'];
    this.colorPalette = ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666'];
    */
    this.colorPalette = ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'];
}

Garden.prototype.indexSpecies = function (array) {
    const index = {};
    for (let i = 0; i < array.length; i++) {
        const s = array[i];
        s.index = i;
        index[s.id] = s;
    }
    return index;
};

Garden.prototype.canvasCenter = function () {
    return {x: this.canvas.width / 2, y: this.canvas.height / 2};
};

Garden.prototype.feetPerPixel = function () {
    return this.svg.size.gardenWidth / this.svg.size.width;
};

Garden.prototype.onWindowResize = function () {
    this.canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    this.canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    this.resetScale();
    this.render();
};

Garden.prototype.resetScale = function () {
    const widthScale = this.canvas.width / this.svg.size.width;
    const heightScale = this.canvas.height / this.svg.size.height;

    this.scale = Math.min(widthScale, heightScale);
    this.scaleRange = {min: this.scale, max: this.scale * this.zoomOpts.max};

    if (this.scale === widthScale) {
        this.translation = {x: 0, y: (this.canvas.height - (this.svg.size.height * this.scale)) / 2.0};
    } else {
        this.translation = {x: (this.canvas.width - (this.svg.size.width * this.scale)) / 2.0, y: 0};
    }
};

Garden.prototype.findTouchedIndividual = function (click, grace) {
    let min;
    let match = null;

    const scale = this.scale;
    const translation = this.translation;

    this.svg.forEachCircle((c) => {
        const xDiff = click.x - (c.cx * scale + translation.x);
        const yDiff = click.y - (c.cy * scale + translation.y);
        const rad = c.r * grace * scale;
        if (xDiff * xDiff + yDiff * yDiff <= rad * rad && (!min || rad < min)) {
            min = rad;
            match = c;
        }
    }, this.date);

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

Garden.prototype.onTap = function (evt) {
    const click = this.clickCoordinates(evt.srcEvent);

    this.selection = this.findTouchedIndividual(click, 1);
    if (!this.selection) {
        this.selection = this.findTouchedIndividual(click, 2);
    }

    if (evt.tapCount === 2) {
        this.zoom(true, this.zoomOpts.tap, click);
    } else {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.highlights = [];
            this.intervalId = null;
        }
    }

    this.sun.onTap(click);

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

Garden.prototype.init = function (species, instance) {
    const garden = this;

    this.sun = new GardenSun({
        date: this.date,
        latitude: this.svg.size.latitude,
        longitude: this.svg.size.longitude
    });

    const resize = () => garden.onWindowResize();
    window.addEventListener('resize', resize, false);
    resize();

    this.canvas.addEventListener('wheel', (evt) => garden.onWheel(evt));

    const hammertime = new Hammer(this.canvas, {threshold: 1});
    hammertime.get('pan').set({threshold: 0, direction: Hammer.DIRECTION_ALL});
    hammertime.get('pinch').set({enable: true});
    hammertime.on('panmove', (evt) => garden.onPanMove(evt));
    hammertime.on('panend', (evt) => garden.onPanEnd(evt));
    hammertime.on('tap', (evt) => garden.onTap(evt));
    hammertime.on('pinchin', (evt) => garden.onPinchIn(evt));
    hammertime.on('pinchout', (evt) => garden.onPinchOut(evt));

    if (species) {
        if (instance) {
            this.highlights = [this.svg.versionAt(species, instance, this.date)];
        } else {
            this.highlights = this.svg.versionsAt(species, this.date);
        }

        this.frame = 0;
        this.intervalId = window.setInterval(() => {
            garden.render();
            this.frame = (this.frame + 1) % this.framesPerPeriod;
        }, this.frameInterval);
    }
};

Garden.prototype.renderIndividualDetails = function () {
    if (!this.selection) {
        return;
    }

    const ind = this.selection;
    const species = this.speciesIndex[ind.species];
    const versions = this.svg.versions(ind.species, ind.instance);

    const lines = [
        species.scientificName,
        species.commonName,
        "Version " + ind.version + " of " + versions.length,
        "Added " + versions[0].date.toLocaleDateString('en', Garden.DateFormat)
    ];

    new Textbox()
        .setPosition({x: ind.cx + ind.r, y: ind.cy - ind.r})
        .setText(lines)
        .setStyle(Textbox.LowerLeft)
        .render(this.ctx);
};

Garden.prototype.pulsate = function (ctx) {
    this.highlights.forEach(h => {
        const r = this.interpolate(this.frame / this.framesPerPeriod);
        ctx.beginPath();
        ctx.arc(h.cx, h.cy, r * 100, 0, Math.PI * 2, false);
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

    ctx.strokeRect(0, 0, svg.size.width, svg.size.height);

    svg.paths.forEach(p => {
        ctx.stroke(new Path2D(p.d));
    });

    this.pulsate(ctx);

    ctx.globalAlpha = 0.9;

    svg.forEachCircle(c => {
        const species = this.speciesIndex[c.species];
        ctx.beginPath();
        ctx.arc(c.cx, c.cy, c.r, 0, Math.PI * 2, false);
        ctx.fillStyle = this.colorPalette[species.index % this.colorPalette.length];
        ctx.fill();
    }, this.date);

    this.renderIndividualDetails();

    ctx.restore();

    this.sun
        .setSize(this.canvas.width, this.canvas.height)
        .render(this.ctx);

    new Scale()
        .setSize(this.canvas.width, this.canvas.height)
        .render(this.ctx, this.feetPerPixel() / this.scale);
};