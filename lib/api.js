"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var axios_1 = __importDefault(require("axios"));
var go_result_js_1 = require("go-result-js");
function toQueryParams(x) {
    if (!x)
        return '';
    return Object.entries(x).map(function (_a) {
        var k = _a[0], v = _a[1];
        return (k + "=" + encodeURIComponent(v));
    }).join('&');
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
var Api = /** @class */ (function () {
    function Api(params) {
        var _this = this;
        this.appendHeaders = function (headers) {
            if (_this.personalAccessToken)
                headers['X-Figma-Token'] = _this.personalAccessToken;
            if (_this.oAuthToken)
                headers['Authorization'] = "Bearer " + _this.oAuthToken;
        };
        this.request = function (url, opts) { return go_result_js_1.ResultA(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var headers, axiosParams, _a, err, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        headers = {};
                        this.appendHeaders(headers);
                        axiosParams = __assign({ url: url }, opts, { headers: headers });
                        return [4 /*yield*/, go_result_js_1.ResultA(axios_1.default(axiosParams))];
                    case 1:
                        _a = _b.sent(), err = _a[0], res = _a[1];
                        if (err || !res || res.status !== 200)
                            reject(new ApiError(res, err instanceof Error ? err.message : ''));
                        else
                            resolve(res.data);
                        return [2 /*return*/];
                }
            });
        }); }); };
        this.getFile = function (key, opts) {
            var queryParams = toQueryParams(opts);
            return _this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/files/" + key + "?" + queryParams);
        };
        this.getImage = function (key, opts) {
            var queryParams = toQueryParams(opts);
            return _this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/images/" + key + "?" + queryParams);
        };
        this.getImageFills = function (fileKey) {
            return _this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/files/" + fileKey + "/images");
        };
        this.getVersions = function (key) {
            return _this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/files/" + key + "/versions");
        };
        this.getComments = function (key) {
            return _this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/files/" + key + "/comments");
        };
        this.postComment = function (key, message, client_meta) {
            var body = {
                message: message,
                client_meta: client_meta,
            };
            return _this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/files/" + key + "/comments", {
                method: 'POST',
                data: JSON.stringify(body),
            });
        };
        this.getTeamProjects = function (team_id) {
            return _this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/teams/" + team_id + "/projects");
        };
        this.getProjectFiles = function (project_id) {
            return _this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/projects/" + project_id + "/files");
        };
        this._watchVersion = function (key, onNewVersion, opts) {
            if (opts === void 0) { opts = {
                timeout: 6000,
            }; }
            var currentPromise;
            var lastVersionId;
            var interval = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, err, res, lastVer;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!!currentPromise) return [3 /*break*/, 10];
                            currentPromise = this.getVersions(key);
                            return [4 /*yield*/, currentPromise];
                        case 1:
                            _a = _b.sent(), err = _a[0], res = _a[1];
                            if (!(err || !res)) return [3 /*break*/, 2];
                            if (opts.onError) {
                                opts.onError(err, disposer);
                            }
                            else {
                                console.error('Figma.watchVersion: Unhandled error', err);
                            }
                            return [3 /*break*/, 9];
                        case 2:
                            if (!(res.versions.length === 0)) return [3 /*break*/, 3];
                            console.warn('Figma.watchVersion: Strange, versions === 0, skipping');
                            return [3 /*break*/, 9];
                        case 3:
                            lastVer = res.versions[res.versions.length - 1];
                            if (!!lastVersionId) return [3 /*break*/, 6];
                            if (!opts.immediate) return [3 /*break*/, 5];
                            return [4 /*yield*/, onNewVersion(lastVer)];
                        case 4:
                            _b.sent();
                            _b.label = 5;
                        case 5: return [3 /*break*/, 8];
                        case 6: return [4 /*yield*/, onNewVersion(lastVer)];
                        case 7:
                            _b.sent();
                            _b.label = 8;
                        case 8:
                            lastVersionId = lastVer.id;
                            _b.label = 9;
                        case 9:
                            currentPromise = null;
                            _b.label = 10;
                        case 10: return [2 /*return*/];
                    }
                });
            }); }, opts.timeout);
            var disposer = function () { return clearInterval(interval); };
            return disposer;
        };
        this._watchComments = function (key, onNewComments, opts) {
            if (opts === void 0) { opts = {
                timeout: 5000,
            }; }
            var currentPromise;
            var lastCommentId;
            var interval = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, err, res, lastComment, lastCommentInd, nextNewCommentInd;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!!currentPromise) return [3 /*break*/, 11];
                            currentPromise = this.getComments(key);
                            return [4 /*yield*/, currentPromise];
                        case 1:
                            _a = _b.sent(), err = _a[0], res = _a[1];
                            if (!(err || !res)) return [3 /*break*/, 2];
                            if (opts.onError) {
                                opts.onError(err, disposer);
                            }
                            else {
                                console.error('Figma.watchComments: Unhandled error', err);
                            }
                            return [3 /*break*/, 10];
                        case 2:
                            if (!(res.comments.length !== 0)) return [3 /*break*/, 10];
                            lastComment = res.comments[res.comments.length - 1];
                            if (!!lastCommentId) return [3 /*break*/, 5];
                            if (!opts.immediate) return [3 /*break*/, 4];
                            return [4 /*yield*/, onNewComments(res.comments)];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4: return [3 /*break*/, 9];
                        case 5:
                            lastCommentInd = res.comments.findIndex(function (x) { return x.id === lastCommentId; });
                            if (!(lastCommentInd === -1)) return [3 /*break*/, 7];
                            return [4 /*yield*/, onNewComments(res.comments)];
                        case 6:
                            _b.sent();
                            return [3 /*break*/, 9];
                        case 7:
                            nextNewCommentInd = lastCommentInd + 1;
                            return [4 /*yield*/, onNewComments(res.comments.slice(nextNewCommentInd))];
                        case 8:
                            _b.sent();
                            _b.label = 9;
                        case 9:
                            lastCommentId = lastComment.id;
                            _b.label = 10;
                        case 10:
                            currentPromise = null;
                            _b.label = 11;
                        case 11: return [2 /*return*/];
                    }
                });
            }); }, opts.timeout);
            var disposer = function () { return clearInterval(interval); };
            return disposer;
        };
        if ('personalAccessToken' in params) {
            this.personalAccessToken = params.personalAccessToken;
        }
        if ('oAuthToken' in params) {
            this.oAuthToken = params.oAuthToken;
        }
    }
    return Api;
}());
exports.Api = Api;
function oAuthLink(client_id, redirect_uri, scope, state, response_type) {
    var queryParams = toQueryParams({
        client_id: client_id,
        redirect_uri: redirect_uri,
        scope: scope,
        state: state,
        response_type: response_type,
    });
    return "https://www.figma.com/oauth?" + queryParams;
}
exports.oAuthLink = oAuthLink;
function oAuthToken(client_id, client_secret, redirect_uri, code, grant_type) {
    var _this = this;
    var queryParams = toQueryParams({
        client_id: client_id,
        client_secret: client_secret,
        redirect_uri: redirect_uri,
        code: code,
        grant_type: grant_type,
    });
    var url = "https://www.figma.com/api/oauth/token?" + queryParams;
    return go_result_js_1.ResultA(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var _a, err, res;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, go_result_js_1.ResultA(axios_1.default({ url: url, method: 'POST' }))];
                case 1:
                    _a = _b.sent(), err = _a[0], res = _a[1];
                    if (err || !res || res.status !== 200)
                        resolve(new ApiError(res, err instanceof Error ? err.message : ''));
                    else
                        resolve(res.data);
                    return [2 /*return*/];
            }
        });
    }); });
}
exports.oAuthToken = oAuthToken;
//# sourceMappingURL=api.js.map