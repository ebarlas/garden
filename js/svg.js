/**
 * Garden SVG loading and storing utility.
 *
 * Dependencies:
 *   - Moment
 *
 * Stores three types of garden svg data elements:
 * - Dimensions: width (px), height (px), lat (deg), lon (deg), garden width (ft)
 * - Paths (structures)
 * - Plants
 *
 * Plants data are indexed as follows:
 * - events: sorted array of all plant individual events [{...}, ...]
 * - species: array of all species [{...}, ...]
 * - speciesIndividuals: map of species id to map of individual id to events array {'...': {'...': [{...}, ...]}}
 * - individuals: array of all individuals [{...}, ...]
 *
 * Plant individuals are stored in an obj-obj-array index as follows:
 * {
 *   <species-id>: {
 *     <individual-id>: [
 *       <event 1>, <event 2>, ...
 *     ]
 *   }
 * }
 *
 * For example:
 * {
 *   raywood_ash: {
 *     20140419_1_raywood_ash: [
 *       {
 *         species: <species_id>,
 *         individual: <individual_id>,
 *         x: <x>,
 *         y: <y>,
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

Svg.prototype.findDimensions = function (svg, resolver) {
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

Svg.prototype.findPositionAt = function (events, targetMoment) {
    let result = null;
    for (const event of events) {
        if (targetMoment.getTime() < event.moment.getTime()) {
            break;
        }
        if (['inherit', 'add', 'move', 'update'].includes(event.type)) {
            result = {
                x: event.x,
                y: event.y,
                r: event.r,
                species: event.species,
                individual: event.individual,
                date: event.date,
                moment: event.moment
            };
        }
        if (event.type === 'remove') {
            return null;
        }
    }
    return result;
};

Svg.prototype.forEachSpeciesIndividual = function (speciesId, callback) {
    Object.entries(this.speciesIndividuals[speciesId]).forEach(([indyId, indyEvents], n) => {
        callback(this.species[speciesId], n, indyEvents);
    });
};

Svg.prototype.forEachIndividual = function (callback) {
    this.individuals.forEach((indy, i) => {
        callback(this.species[indy.species], i, this.speciesIndividuals[indy.species][indy.individual]);
    });
};

Svg.prototype.forEachIndividualAt = function (callback, date) {
    for (const indyObj of Object.values(this.speciesIndividuals)) {
        for (const events of Object.values(indyObj)) {
            const position = date ? this.findPositionAt(events, date) : events[events.length - 1];
            if (position) {
                callback(position);
            }
        }
    }
};

Svg.prototype.indexModel = function(model) {
    const species = model.species.reduce((acc, s, index) => {
        s.index = index;
        acc[s.id] = s;
        return acc;
    }, {});

    const events = model.events.sort((l, r) => {
        const dateCmp = l.date.localeCompare(r.date);
        if (dateCmp !== 0) return dateCmp;

        const speciesCmp = species[l.species].commonName.localeCompare(species[r.species].commonName);
        if (speciesCmp !== 0) return speciesCmp;

        return l.individual.localeCompare(r.individual);
    });

    const speciesIndividuals = {};
    const individuals = [];
    events.forEach(e => {
        e.moment = moment.tz(e.date, "America/Los_Angeles").toDate();

        if (!speciesIndividuals[e.species]) {
            speciesIndividuals[e.species] = {};
        }

        if (!speciesIndividuals[e.species][e.individual]) {
            speciesIndividuals[e.species][e.individual] = [];
            individuals.push({ species: e.species, individual: e.individual });
        }

        speciesIndividuals[e.species][e.individual].push(e);
    });

    return {
        events,
        species,
        speciesIndividuals,
        individuals
    };
};

Svg.prototype.timeOfFirstEvent = function (speciesId) {
    let minEvent = null;
    for (const events of Object.values(this.speciesIndividuals[speciesId])) {
        const firstEvent = events[0];
        if (!minEvent || firstEvent.moment.getTime() < minEvent.moment.getTime()) {
            minEvent = {
                moment: firstEvent.moment,
                date: firstEvent.date
            };
        }
    }
    return minEvent;
};

Svg.prototype.timeOfLastEvent = function (speciesId) {
    const indies = this.speciesIndividuals[speciesId];
    let maxEvent = null;
    for (const events of Object.values(indies)) {
        const lastEvent = events[events.length - 1];
        if (!maxEvent || lastEvent.moment.getTime() > maxEvent.moment.getTime()) {
            maxEvent = {
                moment: lastEvent.moment,
                date: lastEvent.date
            };
        }
    }
    return maxEvent;
};

Svg.prototype.individualEvents = function (speciesId, individualId) {
    return (this.speciesIndividuals[speciesId] || {})[individualId];
};

Svg.prototype.visiblePositionAt = function (speciesId, individualId, date) {
    return this.findPositionAt(this.individualEvents(speciesId, individualId) || [], date);
};

Svg.prototype.visiblePositionsAt = function (speciesId, date) {
    const positions = [];
    for (const events of Object.values(this.speciesIndividuals[speciesId])) {
        const pos = this.findPositionAt(events, date);
        if (pos) {
            positions.push(pos);
        }
    }
    return positions;
};

Svg.prototype.countIndividuals = function (speciesId, visibleOnly) {
    let count = 0;
    for (const events of Object.values(this.speciesIndividuals[speciesId])) {
        const lastEvent = events[events.length - 1];
        if (!visibleOnly || lastEvent.type !== 'remove') {
            count++;
        }
    }
    return count;
};

Svg.prototype.countAllSpecies = function (visibleOnly) {
    let count = 0;
    for (const indies of Object.values(this.speciesIndividuals)) {
        for (const events of Object.values(indies)) {
            const lastEvent = events[events.length - 1];
            if (!visibleOnly || lastEvent.type !== 'remove') {
                count++;
                break; // Exit the inner loop as we only need one individual per species
            }
        }
    }
    return count;
};

Svg.prototype.countAllIndividuals = function (visibleOnly) {
    return Object.keys(this.speciesIndividuals).reduce((total, speciesId) => {
        return total + this.countIndividuals(speciesId, visibleOnly);
    }, 0);
};

Svg.prototype.lastUpdate = function () {
    return this.events[this.events.length - 1].date;
};

Svg.prototype.forEachSpeciesWithIndividuals = function (callback) {
    for (const id in this.species) {
        if (this.speciesIndividuals[id]) {
            callback(this.species[id]);
        }
    }
};

Svg.prototype.getSpecies = function(id) {
    return this.species[id];
};

Svg.prototype.getIndividual = function(speciesId, individualId) {
    return this.speciesIndividuals[speciesId][individualId];
};

Svg.prototype.feetPerPixel = function () {
    return this.gardenWidth / this.width;
};

Svg.prototype.load = async function (callback) {
    const svg = this;

    const loadModelFn = async () => {
        return (await fetch(`data/${svg.resource}.json`)).json();
    };

    const loadSvgFn = async () => {
        return (await fetch(`data/${svg.resource}.svg`)).text();
    };

    const [model, svgText] = await Promise.all([loadModelFn(), loadSvgFn()]);

    const parser = new DOMParser();
    const res = parser.parseFromString(svgText, "image/svg+xml");
    const resolver = res.createNSResolver(res.ownerDocument === null
        ? res.documentElement
        : res.ownerDocument.documentElement);

    const dims = svg.findDimensions(res, resolver);
    const paths = svg.findPaths(res, resolver);

    svg.model = model;
    svg.latitude = model.map.latitude;
    svg.longitude = model.map.longitude;
    svg.width = dims.width;
    svg.height = dims.height;
    svg.gardenWidth = model.map.width;
    svg.paths = paths;

    const index = svg.indexModel(model);
    svg.events = index.events;
    svg.species = index.species;
    svg.speciesIndividuals = index.speciesIndividuals;
    svg.individuals = index.individuals;

    callback(svg);
};