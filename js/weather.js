GardenWeather = {};

GardenWeather.CacheTime = 1000 * 60 * 5;
GardenWeather.Stations = ['KO69', 'KDVO'];
GardenWeather.BaseUrl = 'https://api.weather.gov/stations';

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

    const obs = GardenWeather._fetchWithFallback(0);

    obs.done(function (obj) {
        localStorage.setItem(keyWeather, JSON.stringify(obj));
        localStorage.setItem(keyTime, now);
    });

    return obs;
};

GardenWeather._parseObservation = function (data) {
    const p = data.properties;
    const tempC = p.temperature.value;
    const windKmh = p.windSpeed.value;
    const windDir = p.windDirection.value;

    return {
        'time': new Date(p.timestamp).getTime(),
        'windSpeed': windKmh !== null ? (windKmh * 0.621371).toFixed(0) : '--',
        'windDirection': windDir !== null ? String(windDir) : '999',
        'weather': p.textDescription || '',
        'temp': tempC !== null ? (tempC * 9 / 5 + 32).toFixed(0) : '--',
        'icon': p.icon,
        'station': p.station.split('/').pop(),
    };
};

GardenWeather._hasGoodQuality = function (obs) {
    return obs.temp !== '--';
};

GardenWeather._fetchWithFallback = function (stationIndex) {
    const station = GardenWeather.Stations[stationIndex];

    return $.ajax({
        url: `${GardenWeather.BaseUrl}/${station}/observations/latest`,
        dataType: 'json'
    }).then(function (data) {
        const obs = GardenWeather._parseObservation(data);
        if (GardenWeather._hasGoodQuality(obs) || stationIndex >= GardenWeather.Stations.length - 1) {
            return obs;
        }
        return GardenWeather._fetchWithFallback(stationIndex + 1);
    }, function () {
        if (stationIndex < GardenWeather.Stations.length - 1) {
            return GardenWeather._fetchWithFallback(stationIndex + 1);
        }
        return $.Deferred().reject().promise();
    });
};