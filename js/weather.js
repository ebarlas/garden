GardenWeather = {};

GardenWeather.CacheTime = 1000 * 60 * 5;

// Petaluma Airport (KO69), Novato alternative: KDVO
GardenWeather.Station = 'KO69';

GardenWeather.load = function (latitude, longitude) {
    const keyWeather = `weather.${latitude}.${longitude}`;
    const keyTime = `time.${latitude}.${longitude}`;

    const now = Date.now();
    const cachedWeather = localStorage.getItem(keyWeather);
    const cacheTime = localStorage.getItem(keyTime);

    if (cachedWeather && cacheTime && now < parseInt(cacheTime) + GardenWeather.CacheTime) {
        const deferred = $.Deferred();
        deferred.resolve(JSON.parse(cachedWeather));
        return deferred;
    }

    const promise = $.ajax({
        url: `https://api.weather.gov/stations/${GardenWeather.Station}/observations/latest`,
        dataType: 'json'
    });

    const obs = promise.then(function (data) {
        const p = data.properties;
        const tempC = p.temperature.value;
        const tempF = tempC !== null ? (tempC * 9 / 5 + 32).toFixed(0) : null;
        const windKmh = p.windSpeed.value;
        const windMph = windKmh !== null ? (windKmh * 0.621371).toFixed(0) : null;
        const windDir = p.windDirection.value;

        return {
            'time': new Date(p.timestamp).getTime(),
            'windSpeed': windMph,
            'windDirection': windDir !== null ? String(windDir) : '999',
            'weather': p.textDescription || '',
            'temp': tempF,
            'icon': p.icon,
        };
    });

    obs.done(function (obj) {
        localStorage.setItem(keyWeather, JSON.stringify(obj));
        localStorage.setItem(keyTime, now);
    });

    return obs;
};