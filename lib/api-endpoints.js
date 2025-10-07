"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileApi = getFileApi;
exports.getFileNodesApi = getFileNodesApi;
exports.getImagesApi = getImagesApi;
exports.getImageFillsApi = getImageFillsApi;
exports.getCommentsApi = getCommentsApi;
exports.postCommentApi = postCommentApi;
exports.deleteCommentApi = deleteCommentApi;
exports.getCommentReactionsApi = getCommentReactionsApi;
exports.postCommentReactionApi = postCommentReactionApi;
exports.deleteCommentReactionsApi = deleteCommentReactionsApi;
exports.getUserMeApi = getUserMeApi;
exports.getFileVersionsApi = getFileVersionsApi;
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
exports.getWebhookApi = getWebhookApi;
exports.postWebhookApi = postWebhookApi;
exports.putWebhookApi = putWebhookApi;
exports.deleteWebhookApi = deleteWebhookApi;
exports.getTeamWebhooksApi = getTeamWebhooksApi;
exports.getWebhookRequestsApi = getWebhookRequestsApi;
exports.getLocalVariablesApi = getLocalVariablesApi;
exports.getPublishedVariablesApi = getPublishedVariablesApi;
exports.postVariablesApi = postVariablesApi;
exports.getDevResourcesApi = getDevResourcesApi;
exports.postDevResourcesApi = postDevResourcesApi;
exports.putDevResourcesApi = putDevResourcesApi;
exports.deleteDevResourcesApi = deleteDevResourcesApi;
exports.getLibraryAnalyticsComponentActionsApi = getLibraryAnalyticsComponentActionsApi;
exports.getLibraryAnalyticsComponentUsagesApi = getLibraryAnalyticsComponentUsagesApi;
exports.getLibraryAnalyticsStyleActionsApi = getLibraryAnalyticsStyleActionsApi;
exports.getLibraryAnalyticsStyleUsagesApi = getLibraryAnalyticsStyleUsagesApi;
exports.getLibraryAnalyticsVariableActionsApi = getLibraryAnalyticsVariableActionsApi;
exports.getLibraryAnalyticsVariableUsagesApi = getLibraryAnalyticsVariableUsagesApi;
var config_1 = require("./config");
var utils_1 = require("./utils");
// FILES
// https://www.figma.com/developers/api#files-endpoints
// -----------------------------------------------------------------
function getFileApi(pathParams, queryParams) {
    var encodedQueryParams = (0, utils_1.toQueryParams)(queryParams);
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/files/").concat(pathParams.file_key, "?").concat(encodedQueryParams));
}
function getFileNodesApi(pathParams, queryParams) {
    var encodedQueryParams = (0, utils_1.toQueryParams)(queryParams);
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/files/").concat(pathParams.file_key, "/nodes?").concat(encodedQueryParams));
}
function getImagesApi(pathParams, queryParams) {
    var encodedQueryParams = (0, utils_1.toQueryParams)(queryParams);
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/images/").concat(pathParams.file_key, "?").concat(encodedQueryParams));
}
function getImageFillsApi(pathParams) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/files/").concat(pathParams.file_key, "/images"));
}
// COMMENTS
// https://www.figma.com/developers/api#comments-endpoints
// -----------------------------------------------------------------
function getCommentsApi(pathParams) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/files/").concat(pathParams.file_key, "/comments"));
}
function postCommentApi(pathParams, requestBody) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/files/").concat(pathParams.file_key, "/comments"), {
        method: 'POST',
        data: requestBody,
    });
}
function deleteCommentApi(pathParams) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/files/").concat(pathParams.file_key, "/comments/").concat(pathParams.comment_id), {
        method: 'DELETE',
        data: ''
    });
}
function getCommentReactionsApi(pathParams, queryParams) {
    var encodedQueryParams = (0, utils_1.toQueryParams)(queryParams);
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/files/").concat(pathParams.file_key, "/comments/").concat(pathParams.comment_id, "/reactions?").concat(encodedQueryParams));
}
function postCommentReactionApi(pathParams, requestBody) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/files/").concat(pathParams.file_key, "/comments/").concat(pathParams.comment_id, "/reactions"), {
        method: 'POST',
        data: requestBody,
    });
}
function deleteCommentReactionsApi(pathParams) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/files/").concat(pathParams.file_key, "/comments/").concat(pathParams.comment_id, "/reactions"), {
        method: 'DELETE',
        data: ''
    });
}
// USERS
// https://www.figma.com/developers/api#users-endpoints
// -----------------------------------------------------------------
function getUserMeApi() {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/me"));
}
// VERSION HISTORY (FILE VERSIONS)
// https://www.figma.com/developers/api#version-history-endpoints
// -----------------------------------------------------------------
function getFileVersionsApi(pathParams) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/files/").concat(pathParams.file_key, "/versions"));
}
// PROJECTS
// https://www.figma.com/developers/api#projects-endpoints
// -----------------------------------------------------------------
function getTeamProjectsApi(pathParams) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/teams/").concat(pathParams.team_id, "/projects"));
}
function getProjectFilesApi(pathParams, queryParams) {
    var encodedQueryParams = (0, utils_1.toQueryParams)(queryParams);
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/projects/").concat(pathParams.project_id, "/files?").concat(encodedQueryParams));
}
// COMPONENTS AND STYLES (LIBRARY ITEMS)
// https://www.figma.com/developers/api#library-items-endpoints
// -----------------------------------------------------------------
function getTeamComponentsApi(pathParams, queryParams) {
    var encodedQueryParams = (0, utils_1.toQueryParams)(queryParams);
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/teams/").concat(pathParams.team_id, "/components?").concat(encodedQueryParams));
}
function getFileComponentsApi(pathParams) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/files/").concat(pathParams.file_key, "/components"));
}
function getComponentApi(pathParams) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/components/").concat(pathParams.key));
}
function getTeamComponentSetsApi(pathParams, queryParams) {
    var encodedQueryParams = (0, utils_1.toQueryParams)(queryParams);
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/teams/").concat(pathParams.team_id, "/component_sets?").concat(encodedQueryParams));
}
function getFileComponentSetsApi(pathParams) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/files/").concat(pathParams.file_key, "/component_sets"));
}
function getComponentSetApi(pathParams) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/component_sets/").concat(pathParams.key));
}
function getTeamStylesApi(pathParams, queryParams) {
    var encodedQueryParams = (0, utils_1.toQueryParams)(queryParams);
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/teams/").concat(pathParams.team_id, "/styles?").concat(encodedQueryParams));
}
function getFileStylesApi(pathParams) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/files/").concat(pathParams.file_key, "/styles"));
}
function getStyleApi(pathParams) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/styles/").concat(pathParams.key));
}
// WEBHOOKS
// https://www.figma.com/developers/api#webhooks_v2
// -----------------------------------------------------------------
function getWebhookApi(pathParams) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER_WEBHOOKS, "/webhooks/").concat(pathParams.webhook_id));
}
function postWebhookApi(requestBody) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER_WEBHOOKS, "/webhooks"), {
        method: 'POST',
        data: requestBody,
    });
}
function putWebhookApi(pathParams, requestBody) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER_WEBHOOKS, "/webhooks/").concat(pathParams.webhook_id), {
        method: 'PUT',
        data: requestBody,
    });
}
function deleteWebhookApi(pathParams) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER_WEBHOOKS, "/webhooks/").concat(pathParams.webhook_id, "/"), {
        method: 'DELETE',
        data: ''
    });
}
function getTeamWebhooksApi(pathParams) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER_WEBHOOKS, "/teams/").concat(pathParams.team_id, "/webhooks"));
}
function getWebhookRequestsApi(pathParams) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER_WEBHOOKS, "/webhooks/").concat(pathParams.webhook_id, "/requests"));
}
// ACTIVITY LOGS
// https://www.figma.com/developers/api#activity-logs-endpoints
// -----------------------------------------------------------------
// TODO - Open to contributions if someone is needs to use these endpoints
// PAYMENTS
// https://www.figma.com/developers/api#payments-endpoints
// -----------------------------------------------------------------
// TODO - Open to contributions if someone is needs to use these endpoints
// VARIABLES
// These APIs are available only to full members of Enterprise orgs.
// https://www.figma.com/developers/api#variables-endpoints
// -----------------------------------------------------------------
function getLocalVariablesApi(pathParams) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/files/").concat(pathParams.file_key, "/variables/local"));
}
function getPublishedVariablesApi(pathParams) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/files/").concat(pathParams.file_key, "/variables/published"));
}
function postVariablesApi(pathParams, requestBody) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/files/").concat(pathParams.file_key, "/variables"), {
        method: 'POST',
        data: requestBody,
    });
}
// DEV RESOURCES
// https://www.figma.com/developers/api#dev-resources-endpoints
// -----------------------------------------------------------------
function getDevResourcesApi(pathParams, queryParams) {
    var encodedQueryParams = (0, utils_1.toQueryParams)(queryParams);
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/files/").concat(pathParams.file_key, "/dev_resources"));
}
function postDevResourcesApi(requestBody) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/dev_resources"), {
        method: 'POST',
        data: requestBody,
    });
}
function putDevResourcesApi(requestBody) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/dev_resources"), {
        method: 'PUT',
        data: requestBody,
    });
}
function deleteDevResourcesApi(pathParams) {
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/files/").concat(pathParams.file_key, "/dev_resources/").concat(pathParams.dev_resource_id), {
        method: 'DELETE',
        data: ''
    });
}
// ANALYTICS
// https://www.figma.com/developers/api#library-analytics-endpoints
// -----------------------------------------------------------------
function getLibraryAnalyticsComponentActionsApi(pathParams, queryParams) {
    var encodedQueryParams = (0, utils_1.toQueryParams)(queryParams);
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/analytics/libraries/").concat(pathParams.file_key, "/component/actions?").concat(encodedQueryParams));
}
function getLibraryAnalyticsComponentUsagesApi(pathParams, queryParams) {
    var encodedQueryParams = (0, utils_1.toQueryParams)(queryParams);
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/analytics/libraries/").concat(pathParams.file_key, "/component/usages?").concat(encodedQueryParams));
}
function getLibraryAnalyticsStyleActionsApi(pathParams, queryParams) {
    var encodedQueryParams = (0, utils_1.toQueryParams)(queryParams);
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/analytics/libraries/").concat(pathParams.file_key, "/style/actions?").concat(encodedQueryParams));
}
function getLibraryAnalyticsStyleUsagesApi(pathParams, queryParams) {
    var encodedQueryParams = (0, utils_1.toQueryParams)(queryParams);
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/analytics/libraries/").concat(pathParams.file_key, "/style/usages?").concat(encodedQueryParams));
}
function getLibraryAnalyticsVariableActionsApi(pathParams, queryParams) {
    var encodedQueryParams = (0, utils_1.toQueryParams)(queryParams);
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/analytics/libraries/").concat(pathParams.file_key, "/variable/actions?").concat(encodedQueryParams));
}
function getLibraryAnalyticsVariableUsagesApi(pathParams, queryParams) {
    var encodedQueryParams = (0, utils_1.toQueryParams)(queryParams);
    return this.request("".concat(config_1.API_DOMAIN, "/").concat(config_1.API_VER, "/analytics/libraries/").concat(pathParams.file_key, "/variable/usages?").concat(encodedQueryParams));
}
