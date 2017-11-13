/**
 * Angle utilities including conversions and direction labels.
 */

GardenAngle = {};

GardenAngle.Directions = [
    {degrees: 0, direction: "N"},
    {degrees: 11.25, direction: "NNE"},
    {degrees: 33.75, direction: "NE"},
    {degrees: 56.25, direction: "ENE"},
    {degrees: 78.75, direction: "E"},
    {degrees: 101.25, direction: "ESE"},
    {degrees: 123.75, direction: "SE"},
    {degrees: 146.25, direction: "SSE"},
    {degrees: 168.75, direction: "S"},
    {degrees: 191.25, direction: "SSW"},
    {degrees: 213.75, direction: "SW"},
    {degrees: 236.25, direction: "WSW"},
    {degrees: 258.75, direction: "W"},
    {degrees: 281.25, direction: "WNW"},
    {degrees: 303.75, direction: "NW"},
    {degrees: 326.25, direction: "NNW"},
    {degrees: 348.75, direction: "N"}
];

GardenAngle.normalizeDegrees = function(degrees) {
    while (degrees < 0) degrees += 360;
    while (degrees > 360) degrees -= 360;
    return degrees;
};

GardenAngle.toDirection = function (degrees) {
    degrees = GardenAngle.normalizeDegrees(degrees);

    for (let i = 1; i < GardenAngle.Directions.length; i++) {
        if (degrees >= GardenAngle.Directions[i - 1].degrees && degrees <= GardenAngle.Directions[i].degrees) {
            return GardenAngle.Directions[i - 1].direction;
        }
    }

    return GardenAngle.Directions[GardenAngle.Directions.length - 1].direction;
};

GardenAngle.toRadians = function(angle) {
    return angle * (Math.PI / 180);
};

GardenAngle.toDegrees = function (radians) {
    return radians * (180 / Math.PI);
};