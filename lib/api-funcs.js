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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileApi = getFileApi;
exports.getFileNodesApi = getFileNodesApi;
exports.getImageApi = getImageApi;
exports.getImageFillsApi = getImageFillsApi;
exports.getCommentsApi = getCommentsApi;
exports.postCommentsApi = postCommentsApi;
exports.deleteCommentsApi = deleteCommentsApi;
exports.getUserMeApi = getUserMeApi;
exports.getVersionsApi = getVersionsApi;
exports.getTeamProjectsApi = getTeamProjectsApi;
exports.getProjectFilesApi = getProjectFilesApi;
exports.getTeamComponentsApi = getTeamComponentsApi;
exports.getFileComponentsApi = getFileComponentsApi;
exports.getComponentApi = getComponentApi;
exports.getTeamComponentSetsApi = getTeamComponentSetsApi;
exports.getFileComponentSetsApi = getFileComponentSetsApi;
exports.getComponentSetApi = getComponentSetApi;
exports.getTeamStylesApi = getTeamStylesApi;
exports.getFileStylesApi = getFileStylesApi;
exports.getStyleApi = getStyleApi;
var config_1 = require("./config");
var utils_1 = require("./utils");
// FIGMA FILES
// -----------------------------------------------------------------
function getFileApi(
/**
 * File to export JSON from
 *
 * Can be found in url to file, eg:
 * https://www.figma.com/file/FILE_KEY/FILE_NAME
 */
fileKey, opts) {
    var queryParams = (0, utils_1.toQueryParams)(__assign(__assign({}, opts), { ids: opts && opts.ids && opts.ids.join(',') }));
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/files/").concat(fileKey, "?").concat(queryParams));
}
function getFileNodesApi(
/**
 * File to export JSON from
 *
 * Can be found in url to file, eg:
 * https://www.figma.com/file/FILE_KEY/FILE_NAME
 */
fileKey, 
/** list of node IDs to retrieve and convert */
ids, opts) {
    var queryParams = (0, utils_1.toQueryParams)(__assign(__assign({}, opts), { ids: ids.join(',') }));
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/files/").concat(fileKey, "/nodes?").concat(queryParams));
}
function getImageApi(fileKey, opts) {
    var queryParams = (0, utils_1.toQueryParams)(opts);
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/images/").concat(fileKey, "?").concat(queryParams));
}
function getImageFillsApi(fileKey) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/files/").concat(fileKey, "/images"));
}
// COMMENTS
// -----------------------------------------------------------------
function getCommentsApi(fileKey) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/files/").concat(fileKey, "/comments"));
}
function postCommentsApi(fileKey, 
/** The text contents of the comment to post */
message, 
/** The position of where to place the comment. This can either be an absolute canvas position or the relative position within a frame. */
client_meta, 
/** (Optional) The comment to reply to, if any. This must be a root comment, that is, you cannot reply to a comment that is a reply itself (a reply has a parent_id). */
comment_id) {
    var body = comment_id ? { message: message, client_meta: client_meta, comment_id: comment_id } : { message: message, client_meta: client_meta };
    /** Notice: we need to pass a custom 'Content-Type' header (as 'application-json') or the current implementation
     * (see `this.appendHeaders` in api-class.ts) will use the default 'application/x-www-form-urlencoded' content-type */
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/files/").concat(fileKey, "/comments"), {
        method: 'POST',
        data: body,
    });
}
function deleteCommentsApi(fileKey, comment_id) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/files/").concat(fileKey, "/comments/").concat(comment_id), {
        method: 'DELETE',
        data: ''
    });
}
// USERS
// -----------------------------------------------------------------
function getUserMeApi() {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/me"));
}
// VERSION HISTORY
// -----------------------------------------------------------------
function getVersionsApi(fileKey) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/files/").concat(fileKey, "/versions"));
}
// PROJECTS
// -----------------------------------------------------------------
function getTeamProjectsApi(team_id) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/teams/").concat(team_id, "/projects"));
}
function getProjectFilesApi(project_id, opts) {
    var queryParams = (0, utils_1.toQueryParams)(opts);
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/projects/").concat(project_id, "/files?").concat(queryParams));
}
// COMPONENTS AND STYLES
// -----------------------------------------------------------------
/** Get a paginated list of published components within a team library */
function getTeamComponentsApi(
/** Id of the team to list components from */
team_id, opts) {
    if (opts === void 0) { opts = {}; }
    var queryParams = (0, utils_1.toQueryParams)(opts);
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/teams/").concat(team_id, "/components?").concat(queryParams));
}
function getFileComponentsApi(fileKey) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/files/").concat(fileKey, "/components"));
}
/** Get metadata on a component by key. */
function getComponentApi(
/** The unique identifier of the component. */
key) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/components/").concat(key));
}
function getTeamComponentSetsApi(
/** Id of the team to list component_sets from */
team_id, opts) {
    if (opts === void 0) { opts = {}; }
    var queryParams = (0, utils_1.toQueryParams)(opts);
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/teams/").concat(team_id, "/component_sets?").concat(queryParams));
}
function getFileComponentSetsApi(file_key) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/files/").concat(file_key, "/component_sets"));
}
function getComponentSetApi(
/** The unique identifier of the component_set */
key) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/component_sets/").concat(key));
}
function getTeamStylesApi(team_id, opts) {
    if (opts === void 0) { opts = {}; }
    var queryParams = (0, utils_1.toQueryParams)(opts);
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/teams/").concat(team_id, "/styles?").concat(queryParams));
}
function getFileStylesApi(file_key) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/files/").concat(file_key, "/styles"));
}
function getStyleApi(
/** The unique identifier of the style */
key) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/styles/").concat(key));
}
//# sourceMappingURL=api-funcs.js.map