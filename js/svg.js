/**
 * Garden SVG loading and storing utility.
 *
 * Stores three types of garden svg data elements:
 * - Dimensions, sizes, etc
 * - Paths (structures)
 * - Circles (plant individuals)
 *
 * Circles (plant individuals) are stored in an obj-obj-array index as follows:
 * {
 *   <species-code>: {
 *     <individual>: [
 *       <version 1>, <version 2>, ...
 *     ]
 *   }
 * }
 *
 * For example:
 * {
 *   teu: {
 *     1: [
 *       {
 *         id: <id>,
 *         version: 1,
 *         cx: <x>,
 *         cy: <y>,
 *         r: <radius>,
 *         ...
 *       }, ...
 *     ]
 *   }
 * }
 *
 */

function Svg(resource) {
    this.resource = resource;
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

Svg.prototype.parseDate = function (text) {
    const parts = /([0-9]+)-([0-9]+)-([0-9]+)/.exec(text);
    return new Date(parseInt(parts[1]), parseInt(parts[2]) - 1, parseInt(parts[3]));
};

Svg.prototype.findDimensions = function (svg, resolver) {
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

Svg.prototype.findSpecies = function (svg, resolver) {
    return this.iterator(svg, resolver, '//garden:species', node => {
        return {
            id: node.attributes['garden:id'].value,
            scientificName: node.attributes['garden:scientificName'].value,
            commonName: node.attributes['garden:commonName'].value,
            type: node.attributes['garden:type'].value
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

/**
 * -> species
 * <- entire versions list for each individual of species
 */
Svg.prototype.forEachInstance = function (species, callback) {
    for (const instance in this.individuals[species]) {
        callback(this.individuals[species][instance]);
    }
};

/**
 * -> date
 * <- correct version for each individual of each species
 */
Svg.prototype.forEachCircle = function (callback, date) {
    for (const species in this.individuals) {
        const instances = this.individuals[species];
        for (const instance in instances) {
            const versions = instances[instance];
            const version = date ? this.locateVersion(versions, date) : versions[versions.length - 1];
            if (version && version.type !== 'remove') {
                callback(version);
            }
        }
    }
};

Svg.prototype.indexIndividuals = function (circles) {
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

Svg.prototype.indexSpecies = function (species) {
    const index = {};
    for (let i = 0; i < species.length; i++) {
        const s = species[i];
        s.index = i;
        index[s.id] = s;
    }
    return index;
};

/**
 * -> species
 * <- earliest version among all versions of all individuals of given species
 */
Svg.prototype.firstVersion = function (species) {
    const instances = this.individuals[species];
    let min = null;
    for (const instance in instances) {
        if (min === null || instances[instance][0].date.getTime() < min.getTime()) {
            min = instances[instance][0].date;
        }
    }
    return min;
};

/**
 * -> species
 * <- latest version among all versions of all individuals of given species
 */
Svg.prototype.lastVersion = function (species) {
    const instances = this.individuals[species];
    let max = null;
    for (const instance in instances) {
        const arr = instances[instance];
        if (max === null || arr[arr.length - 1].date.getTime() > max.getTime()) {
            max = arr[arr.length - 1].date;
        }
    }
    return max;
};

/**
 * -> species, instance
 * <- all versions of given individual of given species
 */
Svg.prototype.versions = function (species, instance) {
    return (this.individuals[species] || {})[instance];
};

/**
 * -> species, instance, date
 * <- correct, visible version of given individual of given species
 */
Svg.prototype.visibleVersionAt = function (species, instance, date) {
    const v = this.locateVersion(this.versions(species, instance) || [], date);
    return v && v.type !== 'remove' ? [v] : [];
};

/**
 * -> species, date
 * <- correct, visible versions of each individual of given species
 */
Svg.prototype.visibleVersionsAt = function (species, date) {
    const instances = this.individuals[species];
    const versions = [];
    for (const instance in instances) {
        const v = this.locateVersion(instances[instance], date);
        if (v && v.type !== 'remove') {
            versions.push(v);
        }
    }
    return versions;
};

Svg.prototype.countIndividuals = function (species) {
    return Object.keys(this.individuals[species] || {}).length;
};

Svg.prototype.countAllSpecies = function (visibleOnly) {
    let count = 0;
    outer: for (const species in this.individuals) {
        const instances = this.individuals[species];
        for (const instance in instances) {
            const versions = instances[instance];
            const version = versions[versions.length - 1];
            if (!visibleOnly || version.type !== 'remove') {
                count++;
                continue outer;
            }
        }
    }
    return count;
};

Svg.prototype.countAllIndividuals = function (visibleOnly) {
    let count = 0;
    for (const species in this.individuals) {
        const instances = this.individuals[species];
        for (const instance in instances) {
            const versions = instances[instance];
            const version = versions[versions.length - 1];
            if (!visibleOnly || version.type !== 'remove') {
                count++;
            }
        }
    }
    return count;
};

Svg.prototype.lastUpdate = function () {
    let max = null;
    for (const species in this.individuals) {
        const instances = this.individuals[species];
        for (const instance in instances) {
            const versions = instances[instance];
            const version = versions[versions.length - 1];
            if (max === null || version.date.getTime() > max.getTime()) {
                max = version.date;
            }
        }
    }
    return max;
};

Svg.prototype.forEachSpecies = function (callback) {
    for (const id in this.species) {
        callback(this.species[id]);
    }
};

Svg.prototype.getSpecies = function(id) {
    return this.species[id];
};

Svg.prototype.feetPerPixel = function () {
    return this.gardenWidth / this.width;
};

Svg.prototype.load = function (callback) {
    const svg = this;

    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", evt => {
        const res = xhr.responseXML;
        const resolver = res.createNSResolver(res.ownerDocument === null
            ? res.documentElement
            : res.ownerDocument.documentElement);
        const dims = svg.findDimensions(res, resolver);
        svg.latitude = dims.latitude;
        svg.longitude = dims.longitude;
        svg.width = dims.width;
        svg.height = dims.height;
        svg.gardenWidth = dims.gardenWidth;
        svg.paths = svg.findPaths(res, resolver);
        svg.individuals = svg.indexIndividuals(svg.findCircles(res, resolver));
        svg.species = svg.indexSpecies(svg.findSpecies(res, resolver));
        callback(svg);
    });
    xhr.open("GET", this.resource);
    xhr.send();
};