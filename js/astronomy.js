Astro.MoonPhase = [
    'New Moon',
    'Waxing Crescent',
    'First Quarter',
    'Waxing Gibbous',
    'Full Moon',
    'Waning Gibbous',
    'Last Quarter',
    'Waning Crescent',
    'New Moon'
];

Astro.moonPhase = function (phase) {
    for (let i=1; i<Astro.MoonPhase.length; i++) {
        const prev = (i-1) * 0.125;
        const next = i * 0.125;
        if (phase >= prev && phase <= next) {
            const pdist = phase - prev;
            const ndist = next - phase;
            return pdist < ndist
                ? Astro.MoonPhase[i-1]
                : Astro.MoonPhase[i];
        }
    }

    return 'None';
};

/**
 * SunCalc JS wrapper that synchronizes sun and moon calculations with date changes.
 */

function Astro(latitude, longitude, date) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.date = date;
    this.update();
}

Astro.prototype.update = function () {
    this.sun = SunCalc.getPosition(this.date, this.latitude, this.longitude);
    this.moon = SunCalc.getMoonPosition(this.date, this.latitude, this.longitude);
    this.moonIllumination = SunCalc.getMoonIllumination(this.date);
};

Astro.prototype.getYear = function () {
    return this.date.getFullYear();
};

Astro.prototype.getMonth = function () {
    return this.date.getMonth();
};

Astro.prototype.getDay = function () {
    return this.date.getDate();
};

Astro.prototype.getHours = function () {
    return this.date.getHours();
};

Astro.prototype.getMinutes = function () {
    return this.date.getMinutes();
};

Astro.prototype.addYear = function (n) {
    this.date.setFullYear(this.date.getFullYear() + n);
    this.update();
};

Astro.prototype.addMonth = function (n) {
    this.date.setMonth(this.date.getMonth() + n);
    this.update();
};

Astro.prototype.addDay = function (n) {
    this.date.setDate(this.date.getDate() + n);
    this.update();
};

Astro.prototype.addHours = function (n) {
    this.date.setHours(this.date.getHours() + n);
    this.update();
};

Astro.prototype.addMinutes = function (n) {
    this.date.setMinutes(this.date.getMinutes() + n);
    this.update();
};