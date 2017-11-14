/**
 * SunCalc JS wrapper that synchronizes sun and moon calculations with date changes.
 */

function Astro(latitude, longitude, date) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.date = date;
    this.update();
}

Astro.prototype.update = function() {
    this.sun = SunCalc.getPosition(date, this.latitude, this.longitude);
    this.moon = SunCalc.getMoonPosition(date, this.latitude, this.longitude);
};

Astro.prototype.getYear = function () {
    return this.date.getFullYear();
};

Astro.prototype.getMonth = function() {
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