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

Fragment.prototype.getDate = function (key) {
    const d = this.fragments[key] || "";
    if (arr = /^([0-9]+)-([0-9]+)-([0-9]+)$/.exec(d)) {
        return new Date(parseInt(arr[1]), parseInt(arr[2])-1, parseInt(arr[3]));
    }
    if (arr = /^([0-9]+)-([0-9]+)-([0-9]+)T([0-9]+):([0-9]+)$/.exec(d)) {
        return new Date(parseInt(arr[1]), parseInt(arr[2])-1, parseInt(arr[3]), parseInt(arr[4]), parseInt(arr[5]));
    }
};