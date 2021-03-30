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
    var queryParams = utils_1.toQueryParams(__assign({}, opts, { ids: opts && opts.ids && opts.ids.join(',') }));
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/files/" + fileKey + "?" + queryParams);
}
exports.getFileApi = getFileApi;
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
    var queryParams = utils_1.toQueryParams(__assign({}, opts, { ids: ids.join(',') }));
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/files/" + fileKey + "/nodes?" + queryParams);
}
exports.getFileNodesApi = getFileNodesApi;
function getImageApi(fileKey, opts) {
    var queryParams = utils_1.toQueryParams(opts);
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/images/" + fileKey + "?" + queryParams);
}
exports.getImageApi = getImageApi;
function getImageFillsApi(fileKey) {
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/files/" + fileKey + "/images");
}
exports.getImageFillsApi = getImageFillsApi;
// COMMENTS
// -----------------------------------------------------------------
function getCommentsApi(fileKey) {
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/files/" + fileKey + "/comments");
}
exports.getCommentsApi = getCommentsApi;
function postCommentsApi(fileKey, message, 
/** The position of where to place the comment. This can either be an absolute canvas position or the relative position within a frame. */
client_meta, 
/** (Optional) The comment to reply to, if any. This must be a root comment, that is, you cannot reply to a comment that is a reply itself (a reply has a parent_id). */
comment_id) {
    var body = {
        message: message,
        client_meta: client_meta,
        comment_id: comment_id,
    };
    /** Notice: we need to pass a custom 'Content-Type' header (as 'application-json') or the current implementation
     * (see `this.appendHeaders` in api-class.ts) will use the default 'application/x-www-form-urlencoded' content-type */
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/files/" + fileKey + "/comments", {
        method: 'POST',
        data: body,
    });
}
exports.postCommentsApi = postCommentsApi;
function deleteCommentsApi(fileKey, comment_id) {
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/files/" + fileKey + "/comments/" + comment_id, {
        method: 'DELETE',
        data: ''
    });
}
exports.deleteCommentsApi = deleteCommentsApi;
// USERS
// -----------------------------------------------------------------
function getUserMeApi() {
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/me");
}
exports.getUserMeApi = getUserMeApi;
// VERSION HISTORY
// -----------------------------------------------------------------
function getVersionsApi(fileKey) {
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/files/" + fileKey + "/versions");
}
exports.getVersionsApi = getVersionsApi;
// PROJECTS
// -----------------------------------------------------------------
function getTeamProjectsApi(team_id) {
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/teams/" + team_id + "/projects");
}
exports.getTeamProjectsApi = getTeamProjectsApi;
function getProjectFilesApi(project_id) {
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/projects/" + project_id + "/files");
}
exports.getProjectFilesApi = getProjectFilesApi;
// COMPONENTS AND STYLES
// -----------------------------------------------------------------
/** Get a paginated list of published components within a team library */
function getTeamComponentsApi(team_id, opts) {
    if (opts === void 0) { opts = {}; }
    var queryParams = utils_1.toQueryParams(opts);
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/teams/" + team_id + "/components?" + queryParams);
}
exports.getTeamComponentsApi = getTeamComponentsApi;
function getFileComponentsApi(project_id) {
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/files/" + project_id + "/components");
}
exports.getFileComponentsApi = getFileComponentsApi;
/** Get metadata on a component by key. */
function getComponentApi(componentKey) {
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/components/" + componentKey);
}
exports.getComponentApi = getComponentApi;
function getTeamComponentSetsApi(team_id, opts) {
    if (opts === void 0) { opts = {}; }
    var queryParams = utils_1.toQueryParams(opts);
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/teams/" + team_id + "/component_sets?" + queryParams);
}
exports.getTeamComponentSetsApi = getTeamComponentSetsApi;
function getFileComponentSetsApi(file_key) {
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/files/" + file_key + "/component_sets");
}
exports.getFileComponentSetsApi = getFileComponentSetsApi;
function getComponentSetApi(componentsetKey) {
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/component_sets/" + componentsetKey);
}
exports.getComponentSetApi = getComponentSetApi;
function getTeamStylesApi(team_id, opts) {
    if (opts === void 0) { opts = {}; }
    var queryParams = utils_1.toQueryParams(opts);
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/teams/" + team_id + "/styles?" + queryParams);
}
exports.getTeamStylesApi = getTeamStylesApi;
function getFileStylesApi(file_key) {
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/files/" + file_key + "/styles");
}
exports.getFileStylesApi = getFileStylesApi;
function getStyleApi(
/** The unique identifier of the style */
styleKey) {
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/styles/" + styleKey);
}
exports.getStyleApi = getStyleApi;
//# sourceMappingURL=api-funcs.js.map