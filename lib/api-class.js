"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var api_funcs_1 = require("./api-funcs");
var axios_1 = __importDefault(require("axios"));
var utils_1 = require("./utils");
var Api = /** @class */ (function () {
    function Api(params) {
        var _this = this;
        this.appendHeaders = function (headers) {
            if (_this.personalAccessToken)
                headers['X-Figma-Token'] = _this.personalAccessToken;
            if (_this.oAuthToken)
                headers['Authorization'] = "Bearer " + _this.oAuthToken;
        };
        this.request = function (url, opts) { return __awaiter(_this, void 0, void 0, function () {
            var headers, axiosParams, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = {};
                        this.appendHeaders(headers);
                        axiosParams = __assign({ url: url }, opts, { headers: headers });
                        return [4 /*yield*/, axios_1.default(axiosParams)];
                    case 1:
                        res = _a.sent();
                        if (Math.floor(res.status / 100) !== 2)
                            throw res.statusText;
                        return [2 /*return*/, res.data];
                }
            });
        }); };
        this.getFile = api_funcs_1.getFileApi;
        this.getFileNodes = api_funcs_1.getFileNodesApi;
        this.getImage = api_funcs_1.getImageApi;
        this.getImageFills = api_funcs_1.getImageFillsApi;
        this.getComments = api_funcs_1.getCommentsApi;
        this.postComment = api_funcs_1.postCommentsApi;
        this.deleteComments = api_funcs_1.deleteCommentsApi;
        this.getMe = api_funcs_1.getUserMeApi;
        this.getVersions = api_funcs_1.getVersionsApi;
        this.getTeamProjects = api_funcs_1.getTeamProjectsApi;
        this.getProjectFiles = api_funcs_1.getProjectFilesApi;
        this.getTeamComponents = api_funcs_1.getTeamComponentsApi;
        this.getFileComponents = api_funcs_1.getFileComponentsApi;
        this.getComponent = api_funcs_1.getComponentApi;
        this.getTeamComponentSets = api_funcs_1.getTeamComponentSetsApi;
        this.getFileComponentSets = api_funcs_1.getFileComponentSetsApi;
        this.getComponentSet = api_funcs_1.getComponentSetApi;
        this.getTeamStyles = api_funcs_1.getTeamStylesApi;
        this.getFileStyles = api_funcs_1.getFileStylesApi;
        this.getStyle = api_funcs_1.getStyleApi;
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
    var queryParams = utils_1.toQueryParams({
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
    return __awaiter(this, void 0, void 0, function () {
        var queryParams, url, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    queryParams = utils_1.toQueryParams({
                        client_id: client_id,
                        client_secret: client_secret,
                        redirect_uri: redirect_uri,
                        code: code,
                        grant_type: grant_type,
                    });
                    url = "https://www.figma.com/api/oauth/token?" + queryParams;
                    return [4 /*yield*/, axios_1.default({ url: url, method: 'POST' })];
                case 1:
                    res = _a.sent();
                    if (res.status !== 200)
                        throw res.statusText;
                    return [2 /*return*/, res.data];
            }
        });
    });
}
exports.oAuthToken = oAuthToken;
//# sourceMappingURL=api-class.js.map