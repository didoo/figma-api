"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("./http");
var config_1 = require("./config");
function toQueryParams(x) {
    if (!x)
        return '';
    return Object.entries(x).map(function (_a) {
        var k = _a[0], v = _a[1];
        return (k + "=" + encodeURIComponent(v));
    }).join('&');
}
exports.toQueryParams = toQueryParams;
var Api = /** @class */ (function () {
    function Api(params) {
        if ('personalAccessToken' in params) {
            this.personalAccessToken = params.personalAccessToken;
        }
        if ('oAuthToken' in params) {
            this.oAuthToken = params.oAuthToken;
        }
    }
    Api.prototype.appendHeaders = function (headers) {
        if (this.personalAccessToken)
            headers.append('X-Figma-Token', this.personalAccessToken);
        if (this.oAuthToken)
            headers.append('Authorization', "Bearer " + this.oAuthToken);
    };
    Api.prototype.request = function (url, opts) {
        var headers = new Headers;
        this.appendHeaders(headers);
        return http_1.request(url, __assign({}, opts, { headers: headers }));
    };
    Api.prototype.getFile = function (key, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var queryParams, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryParams = toQueryParams(opts);
                        return [4 /*yield*/, this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/files/" + key + "?" + queryParams)];
                    case 1:
                        resp = _a.sent();
                        return [4 /*yield*/, resp.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Api.prototype.getImage = function (key, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var queryParams, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryParams = toQueryParams(opts);
                        return [4 /*yield*/, this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/images/" + key + "?" + queryParams)];
                    case 1:
                        resp = _a.sent();
                        return [4 /*yield*/, resp.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Api.prototype.getVersions = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/files/" + key + "/versions")];
                    case 1:
                        resp = _a.sent();
                        return [4 /*yield*/, resp.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Api.prototype.getComments = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/files/" + key + "/comments")];
                    case 1:
                        resp = _a.sent();
                        return [4 /*yield*/, resp.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Api.prototype.postComment = function (key, message, client_meta) {
        return __awaiter(this, void 0, void 0, function () {
            var body, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            message: message,
                            client_meta: client_meta,
                        };
                        return [4 /*yield*/, this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/files/" + key + "/comments", {
                                method: 'POST',
                                body: JSON.stringify(body),
                            })];
                    case 1:
                        resp = _a.sent();
                        return [4 /*yield*/, resp.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Api.prototype.getTeamProjects = function (team_id) {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/teams/" + team_id + "/projects")];
                    case 1:
                        resp = _a.sent();
                        return [4 /*yield*/, resp.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Api.prototype.getProjectFiles = function (project_id) {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/projects/" + project_id + "/files")];
                    case 1:
                        resp = _a.sent();
                        return [4 /*yield*/, resp.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Api;
}());
exports.Api = Api;
function oAuthLink(client_id, redirect_uri, scope, state, response_type) {
    return __awaiter(this, void 0, void 0, function () {
        var queryParams;
        return __generator(this, function (_a) {
            queryParams = toQueryParams({
                client_id: client_id,
                redirect_uri: redirect_uri,
                scope: scope,
                state: state,
                response_type: response_type,
            });
            return [2 /*return*/, "https://www.figma.com/oauth?" + queryParams];
        });
    });
}
exports.oAuthLink = oAuthLink;
function oAuthToken(client_id, client_secret, redirect_uri, code, grant_type) {
    return __awaiter(this, void 0, void 0, function () {
        var queryParams, resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    queryParams = toQueryParams({
                        client_id: client_id,
                        client_secret: client_secret,
                        redirect_uri: redirect_uri,
                        code: code,
                        grant_type: grant_type,
                    });
                    return [4 /*yield*/, http_1.request("https://www.figma.com/api/oauth/token?" + queryParams)];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.oAuthToken = oAuthToken;
//# sourceMappingURL=api.js.map