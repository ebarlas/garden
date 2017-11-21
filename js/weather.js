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
        url: `http://api.wunderground.com/api/f555adf106ea2fcd/conditions/q/${latitude},${longitude}.json`
    });

    promise.done(function (res) {
        localStorage.setItem(keyWeather, JSON.stringify(res));
        localStorage.setItem(keyTime, now);
    });

    return promise;
};