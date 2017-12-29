/**
 * Utilities for dealing with url fragment that follows hash mark (#).
 */

function Fragment() {
    const hash = window.location.hash;
    this.fragments = {};
    hash.replace("#", "").split("&").forEach(i => {
        const kv = i.split("=");
        this.fragments[kv[0]] = decodeURIComponent(kv[1]);
    });
}

Fragment.prototype.get = function (key) {
    return this.fragments[key];
};

Fragment.prototype.map = function (key, fun) {
    return fun(this.get(key));
};