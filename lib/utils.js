"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
function toQueryParams(x) {
    if (!x)
        return '';
    return Object.entries(x).map(function (_a) {
        var k = _a[0], v = _a[1];
        return (k && v && k + "=" + encodeURIComponent(v));
    }).filter(Boolean).join('&');
}
exports.toQueryParams = toQueryParams;
var ApiError = /** @class */ (function (_super) {
    __extends(ApiError, _super);
    function ApiError(response, message) {
        var _this = _super.call(this, message) || this;
        _this.response = response;
        return _this;
    }
    return ApiError;
}(Error));
exports.ApiError = ApiError;
//# sourceMappingURL=utils.js.map