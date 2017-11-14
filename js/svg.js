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
            height: parseFloat(node.attributes.height.value),
            latitude: parseFloat(node.attributes['garden:latitude'].value),
            longitude: parseFloat(node.attributes['garden:longitude'].value),
            gardenWidth: parseFloat(node.attributes['garden:width'].value)
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

Svg.prototype.parseDate = function (text) {
    const parts = /([0-9]+)-([0-9]+)-([0-9]+)/.exec(text);
    return new Date(parseInt(parts[1]), parseInt(parts[2]) - 1, parseInt(parts[3]));
};

Svg.prototype.findCircles = function (svg, resolver) {
    return this.iterator(svg, resolver, '//svg:circle[@garden:date][@garden:species][@garden:instance][@garden:version][@garden:type][@garden:description]', node => {
        return {
            id: node.attributes.id.value,
            cx: parseFloat(node.attributes.cx.value),
            cy: parseFloat(node.attributes.cy.value),
            r: parseFloat(node.attributes.r.value),
            date: this.parseDate(node.attributes['garden:date'].value),
            species: node.attributes['garden:species'].value,
            instance: node.attributes['garden:instance'].value,
            version: parseInt(node.attributes['garden:version'].value),
            type: node.attributes['garden:type'].value,
            description: node.attributes['garden:description'].value
        };
    });
};

Svg.prototype.locateVersion = function (versions, date) {
    let i;
    for (i = 0; i < versions.length; i++) {
        // advance until target date is in the past
        if (date.getTime() < versions[i].date.getTime()) {
            break;
        }
    }
    return i === 0 ? null : versions[i - 1];
};

Svg.prototype.forEachInstance = function (species, callback) {
    for (const instance in this.index[species]) {
        callback(this.index[species][instance]);
    }
};

Svg.prototype.forEachCircle = function (callback, date) {
    Object.keys(this.index).forEach(id => {
        const species = this.index[id];
        Object.keys(species).forEach(instance => {
            const versions = species[instance];
            const version = date ? this.locateVersion(versions, date) : versions[versions.length - 1];
            if (version && version.type !== 'remove') {
                callback(version);
            }
        });
    });
};

Svg.prototype.index = function (circles) {
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

Svg.prototype.firstVersion = function (species) {
    const instances = this.index[species];
    let min = null;
    for (const instance in instances) {
        if (min === null || instances[instance][0].date.getTime() < min.getTime()) {
            min = instances[instance][0].date;
        }
    }
    return min;
};

Svg.prototype.lastVersion = function (species) {
    const instances = this.index[species];
    let max = null;
    for (const instance in instances) {
        const arr = instances[instance];
        if (max === null || arr[arr.length - 1].date.getTime() < max.getTime()) {
            max = arr[arr.length - 1].date;
        }
    }
    return max;
};

Svg.prototype.versions = function (species, instance) {
    return (this.index[species] || {})[instance];
};

Svg.prototype.versionAt = function (species, instance, date) {
    return this.locateVersion(this.versions(species, instance) || [], date);
};

Svg.prototype.versionsAt = function (species, date) {
    const instances = this.index[species];
    const versions = [];
    for (const instance in instances) {
        versions.push(this.locateVersion(instances[instance], date));
    }
    return versions;
};

Svg.prototype.load = function (callback) {
    const svg = this;

    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", evt => {
        const res = xhr.responseXML;
        const resolver = res.createNSResolver(res.ownerDocument === null
            ? res.documentElement
            : res.ownerDocument.documentElement);
        svg.size = svg.findSize(res, resolver);
        svg.paths = svg.findPaths(res, resolver);
        svg.circles = svg.findCircles(res, resolver);
        svg.index = svg.index(svg.circles);
        callback(svg);
    });
    xhr.open("GET", this.resource);
    xhr.send();
};