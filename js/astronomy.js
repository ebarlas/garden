/**
 * Convenience wrapper around SunCalc for synchronizing date and sun/moon calculations.
 *
 * Dependencies:
 *   - SunCalc
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