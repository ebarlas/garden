/**
 * Utility for computing the border intercept given dimensions of an x-y plane and an angle in radians.
 * Angles in radians start on the x-axis and arc into the first quadrant.
 *
 *  ---------------------
 * |          |          |
 * |          |          |
 * |----------x----------|
 * |          |          |
 * |          |          |
 *  ---------------------
 */

GardenBorder = {};

GardenBorder.intercept = function (width, height, angle) {
    // x, y components of unit vector at angle
    const xunit = Math.cos(angle);
    const yunit = Math.sin(angle);

    // absolute values
    const axunit = Math.abs(xunit);
    const ayunit = Math.abs(yunit);

    // positive intercepts
    const xi = width / 2;
    const yi = height / 2;

    // number of steps to intercept
    const xsteps = xi / axunit;
    const steps = yi / ayunit;

    return ayunit * xsteps <= yi
        ? {x: xunit * xsteps, y: yunit * xsteps}
        : {x: xunit * steps, y: yunit * steps};
};



