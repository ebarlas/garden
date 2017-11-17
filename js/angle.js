/**
 * Angle utilities including conversions and direction labels.
 *
 * Dependencies:
 *   - GardenRange (range.js)
 */

GardenAngle = {};

GardenAngle.Directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW"
];

GardenAngle.normalizeDegrees = function(degrees) {
    return GardenRange.normalize(360, degrees);
};

GardenAngle.toDirection = function (degrees) {
    return GardenRange.find(GardenAngle.Directions, 360, degrees);
};

GardenAngle.toRadians = function(angle) {
    return angle * (Math.PI / 180);
};

GardenAngle.toDegrees = function (radians) {
    return radians * (180 / Math.PI);
};