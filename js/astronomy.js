/**
 * Convenience wrapper around SunCalc for synchronizing date and sun/moon calculations.
 *
 * Dependencies:
 *   - SunCalc
 *   - Moment
 *   - GardenRange (range.js)
 */

Astro.MoonPhase = [
    'New Moon',
    'Waxing Crescent',
    'First Quarter',
    'Waxing Gibbous',
    'Full Moon',
    'Waning Gibbous',
    'Last Quarter',
    'Waning Crescent',
];

Astro.moonPhase = function (phase) {
    return GardenRange.find(Astro.MoonPhase, 1.0, phase);
};

function Astro(latitude, longitude, mo) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.mo = mo;
    this.update();
}

Astro.prototype.update = function () {
    const date = this.mo.toDate();
    this.sun = SunCalc.getPosition(date, this.latitude, this.longitude);
    this.moon = SunCalc.getMoonPosition(date, this.latitude, this.longitude);
    this.moonIllumination = SunCalc.getMoonIllumination(date);
};

Astro.prototype.getYear = function () {
    return this.mo.year();
};

Astro.prototype.getMonth = function () {
    return this.mo.month();
};

Astro.prototype.getDay = function () {
    return this.mo.date();
};

Astro.prototype.getHours = function () {
    return this.mo.hours();
};

Astro.prototype.getMinutes = function () {
    return this.mo.minutes();
};

Astro.prototype.getDate = function () {
    return this.mo.toDate();
};

Astro.prototype.addYear = function (n) {
    this.mo.year(this.mo.year() + n);
    this.update();
};

Astro.prototype.addMonth = function (n) {
    this.mo.month(this.mo.month() + n);
    this.update();
};

Astro.prototype.addDay = function (n) {
    this.mo.date(this.mo.date() + n);
    this.update();
};

Astro.prototype.addHours = function (n) {
    this.mo.hours(this.mo.hours() + n);
    this.update();
};

Astro.prototype.addMinutes = function (n) {
    this.mo.minutes(this.mo.minutes() + n);
    this.update();
};