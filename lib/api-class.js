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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.Api = void 0;
exports.oAuthLink = oAuthLink;
exports.oAuthToken = oAuthToken;
var ApiEndpoints = __importStar(require("./api-endpoints"));
var utils_1 = require("./utils");
var axios_1 = __importDefault(require("axios"));
var Api = /** @class */ (function () {
    function Api(params) {
        var _this = this;
        this.appendHeaders = function (headers) {
            if (_this.personalAccessToken)
                headers['X-Figma-Token'] = _this.personalAccessToken;
            if (_this.oAuthToken)
                headers['Authorization'] = "Bearer ".concat(_this.oAuthToken);
        };
        this.request = function (url, opts) { return __awaiter(_this, void 0, void 0, function () {
            var headers, axiosParams, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = {};
                        this.appendHeaders(headers);
                        axiosParams = __assign(__assign({ url: url }, opts), { headers: headers });
                        return [4 /*yield*/, (0, axios_1.default)(axiosParams)];
                    case 1:
                        res = _a.sent();
                        if (Math.floor(res.status / 100) !== 2)
                            throw res.statusText;
                        return [2 /*return*/, res.data];
                }
            });
        }); };
        this.getFile = ApiEndpoints.getFileApi;
        this.getFileNodes = ApiEndpoints.getFileNodesApi;
        this.getImages = ApiEndpoints.getImagesApi;
        this.getImageFills = ApiEndpoints.getImageFillsApi;
        this.getComments = ApiEndpoints.getCommentsApi;
        this.postComment = ApiEndpoints.postCommentApi;
        this.deleteComment = ApiEndpoints.deleteCommentApi;
        this.getCommentReactions = ApiEndpoints.getCommentReactionsApi;
        this.postCommentReaction = ApiEndpoints.postCommentReactionApi;
        this.deleteCommentReactions = ApiEndpoints.deleteCommentReactionsApi;
        this.getUserMe = ApiEndpoints.getUserMeApi;
        this.getFileVersions = ApiEndpoints.getFileVersionsApi;
        this.getTeamProjects = ApiEndpoints.getTeamProjectsApi;
        this.getProjectFiles = ApiEndpoints.getProjectFilesApi;
        this.getTeamComponents = ApiEndpoints.getTeamComponentsApi;
        this.getFileComponents = ApiEndpoints.getFileComponentsApi;
        this.getComponent = ApiEndpoints.getComponentApi;
        this.getTeamComponentSets = ApiEndpoints.getTeamComponentSetsApi;
        this.getFileComponentSets = ApiEndpoints.getFileComponentSetsApi;
        this.getComponentSet = ApiEndpoints.getComponentSetApi;
        this.getTeamStyles = ApiEndpoints.getTeamStylesApi;
        this.getFileStyles = ApiEndpoints.getFileStylesApi;
        this.getStyle = ApiEndpoints.getStyleApi;
        this.getWebhook = ApiEndpoints.getWebhookApi;
        this.postWebhook = ApiEndpoints.postWebhookApi;
        this.putWebhook = ApiEndpoints.putWebhookApi;
        this.deleteWebhook = ApiEndpoints.deleteWebhookApi;
        this.getTeamWebhooks = ApiEndpoints.getTeamWebhooksApi;
        this.getWebhookRequests = ApiEndpoints.getWebhookRequestsApi;
        this.getLocalVariables = ApiEndpoints.getLocalVariablesApi;
        this.getPublishedVariables = ApiEndpoints.getPublishedVariablesApi;
        this.postVariables = ApiEndpoints.postVariablesApi;
        this.getDevResources = ApiEndpoints.getDevResourcesApi;
        this.postDevResources = ApiEndpoints.postDevResourcesApi;
        this.putDevResources = ApiEndpoints.putDevResourcesApi;
        this.deleteDevResources = ApiEndpoints.deleteDevResourcesApi;
        this.getLibraryAnalyticsComponentActions = ApiEndpoints.getLibraryAnalyticsComponentActionsApi;
        this.getLibraryAnalyticsComponentUsages = ApiEndpoints.getLibraryAnalyticsComponentUsagesApi;
        this.getLibraryAnalyticsStyleActions = ApiEndpoints.getLibraryAnalyticsStyleActionsApi;
        this.getLibraryAnalyticsStyleUsages = ApiEndpoints.getLibraryAnalyticsStyleUsagesApi;
        this.getLibraryAnalyticsVariableActions = ApiEndpoints.getLibraryAnalyticsVariableActionsApi;
        this.getLibraryAnalyticsVariableUsages = ApiEndpoints.getLibraryAnalyticsVariableUsagesApi;
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
// see: https://www.figma.com/developers/api#auth-oauth2
function oAuthLink(client_id, redirect_uri, scope, state, response_type) {
    var queryParams = (0, utils_1.toQueryParams)({
        client_id: client_id,
        redirect_uri: redirect_uri,
        scope: scope,
        state: state,
        response_type: response_type,
    });
    return "https://www.figma.com/oauth?".concat(queryParams);
}
function oAuthToken(client_id, client_secret, redirect_uri, code, grant_type) {
    return __awaiter(this, void 0, void 0, function () {
        var headers, queryParams, url, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    headers = {
                        'Authorization': "Basic ".concat(Buffer.from("".concat(client_id, ":").concat(client_secret)).toString('base64')),
                    };
                    queryParams = (0, utils_1.toQueryParams)({
                        redirect_uri: redirect_uri,
                        code: code,
                        grant_type: grant_type,
                    });
                    url = "https://api.figma.com/v1/oauth/token?".concat(queryParams);
                    return [4 /*yield*/, axios_1.default.post(url, null, { headers: headers })];
                case 1:
                    res = _a.sent();
                    if (res.status !== 200)
                        throw res.statusText;
                    return [2 /*return*/, res.data];
            }
        });
    });
}
