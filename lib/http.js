"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var isBrowser;
try {
    isBrowser = fetch !== undefined;
}
catch (_a) { }
if (!isBrowser) {
    var parseUrl_1 = require('url').parse;
    var request_1 = require('https').request;
    global.fetch = function (url, opts) {
        return new Promise(function (resolve) {
            request_1(__assign({ method: 'GET' }, parseUrl_1(url), opts), function (res) {
                var datas = [];
                res.on('data', function (data) { return datas.push(data); });
                res.on('end', function () {
                    var result = datas.join('');
                    resolve({
                        json: function () { return Promise.resolve(JSON.parse(result)); },
                    });
                });
            }).end();
        });
    };
    global.Headers = /** @class */ (function () {
        function Headers() {
        }
        Headers.prototype.append = function (name, value) {
            this[name] = value;
        };
        return Headers;
    }());
}
exports.request = fetch;
//# sourceMappingURL=http.js.map