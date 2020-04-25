GardenWeather = {};

GardenWeather.CacheTime = 1000 * 60 * 5;

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
        url: `https://w1.weather.gov/xml/current_obs/KO69.xml`
    });

    const obs = promise.then(function (data, status, resp) {
        function extractFromXml(tag) {
            const arr = new RegExp(`<${tag}>(.*)</${tag}>`).exec(resp.responseText);
            return arr ? arr[1] : null;
        }

        return {
            'time': new Date(extractFromXml('observation_time_rfc822')).getTime(),
            'windSpeed': extractFromXml('wind_mph'),
            'windDirection': extractFromXml('wind_degrees'),
            'weather': extractFromXml('weather'),
            'temp': extractFromXml('temp_f'),
            'icon': extractFromXml('icon_url_base') + extractFromXml('icon_url_name'),
        }
    });

    obs.done(function (obj) {
        localStorage.setItem(keyWeather, JSON.stringify(obj));
        localStorage.setItem(keyTime, now);
    });

    return obs;
};