function Svg(resource) {
    this.resource = resource;
    this.size = null;
    this.paths = null;
    this.circles = null;
}

Svg.prototype.iterator = function (svg, resolver, xpath, mapper) {
    const it = svg.evaluate(xpath, svg, resolver, XPathResult.ANY_TYPE, null);
    const elems = [];
    let node;
    while (node = it.iterateNext()) {
        elems.push(mapper(node));
    }
    return elems;
};

Svg.prototype.findSize = function (svg, resolver) {
    return this.iterator(svg, resolver, '//svg:svg', node => {
        return {
            width: parseFloat(node.attributes.width.value),
            height: parseFloat(node.attributes.height.value)
        };
    })[0];
};

Svg.prototype.findPaths = function (svg, resolver) {
    return this.iterator(svg, resolver, '//svg:path', node => {
        return {
            id: node.attributes.id.value,
            d: node.attributes.d.value
        };
    });
};

Svg.prototype.findCircles = function (svg, resolver) {
    return this.iterator(svg, resolver, '//svg:circle[@garden:date][@garden:species][@garden:instance][@garden:version][@garden:type]', node => {
        return {
            id: node.attributes.id.value,
            cx: parseFloat(node.attributes.cx.value),
            cy: parseFloat(node.attributes.cy.value),
            r: parseFloat(node.attributes.r.value),
            date: node.attributes['garden:date'].value,
            species: node.attributes['garden:species'].value,
            instance: node.attributes['garden:instance'].value,
            version: parseInt(node.attributes['garden:version'].value),
            type: node.attributes['garden:type'].value
        };
    });
};

Svg.prototype.forEachCircle = function(callback) {
    Object.keys(this.index).forEach(id => {
        const species = this.index[id];
        Object.keys(species).forEach(instance => {
            const version = species[instance];
            const latest = version[version.length - 1];
            if (latest.type !== 'remove') {
                callback(latest);
            }
        });
    });
};

Svg.prototype.index = function(circles) {
    const index = {};
    circles.forEach((c) => {
        let species = index[c.species];
        if (!species) {
            species = index[c.species] = {};
        }
        let instance = species[c.instance];
        if (!instance) {
            instance = species[c.instance] = [];
        }
        instance.push(c);
        instance.sort((l, r) => l.version - r.version);
    });
    return index;
};

Svg.prototype.load = function(callback) {
    const svg = this;
    $.ajax({
        type: "GET",
        url: this.resource
    }).done(function (res) {
        const resolver = res.createNSResolver(res.ownerDocument === null
            ? res.documentElement
            : res.ownerDocument.documentElement);
        svg.size = svg.findSize(res, resolver);
        svg.paths = svg.findPaths(res, resolver);
        svg.circles = svg.findCircles(res, resolver);
        svg.index = svg.index(svg.circles);
        callback(svg);
    });
};