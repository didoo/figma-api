import { API_DOMAIN, API_VER, API_VER_WEBHOOKS } from "./config";
import { ApiRequestMethod, toQueryParams } from "./utils";

// types

type ApiClass = {
    request: ApiRequestMethod
};

import type * as FigmaRestAPI from '@figma/rest-api-spec';


// FILES
// https://www.figma.com/developers/api#files-endpoints
// -----------------------------------------------------------------

export function getFileApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.GetFilePathParams,
    queryParams?: FigmaRestAPI.GetFileQueryParams
): Promise<FigmaRestAPI.GetFileResponse> {
    const encodedQueryParams = toQueryParams(queryParams);
    return this.request(`${API_DOMAIN}/${API_VER}/files/${pathParams.file_key}?${encodedQueryParams}`);
}

export function getFileNodesApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.GetFileNodesPathParams,
    queryParams?: FigmaRestAPI.GetFileNodesQueryParams
): Promise<FigmaRestAPI.GetFileNodesResponse> {
    const encodedQueryParams = toQueryParams(queryParams);
    return this.request(`${API_DOMAIN}/${API_VER}/files/${pathParams.file_key}/nodes?${encodedQueryParams}`);
}

export function getImagesApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.GetImagesPathParams,
    queryParams?: FigmaRestAPI.GetImagesQueryParams,
): Promise<FigmaRestAPI.GetImagesResponse> {
    const encodedQueryParams = toQueryParams(queryParams);
    return this.request(`${API_DOMAIN}/${API_VER}/images/${pathParams.file_key}?${encodedQueryParams}`);
}

export function getImageFillsApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.GetImageFillsPathParams,
): Promise<FigmaRestAPI.GetImageFillsResponse> {
    return this.request(`${API_DOMAIN}/${API_VER}/files/${pathParams.file_key}/images`);
}


// COMMENTS
// https://www.figma.com/developers/api#comments-endpoints
// -----------------------------------------------------------------

export function getCommentsApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.GetCommentsPathParams
): Promise<FigmaRestAPI.GetCommentsResponse> {
    return this.request(`${API_DOMAIN}/${API_VER}/files/${pathParams.file_key}/comments`);
}

export function postCommentApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.PostCommentPathParams,
    requestBody?: FigmaRestAPI.PostCommentRequestBody,
): Promise<FigmaRestAPI.PostCommentResponse> {
    return this.request(`${API_DOMAIN}/${API_VER}/files/${pathParams.file_key}/comments`, {
        method: 'POST',
        data: requestBody,
    });
}

export function deleteCommentApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.DeleteCommentPathParams,
): Promise<FigmaRestAPI.DeleteCommentResponse> {
    return this.request(`${API_DOMAIN}/${API_VER}/files/${pathParams.file_key}/comments/${pathParams.comment_id}`, {
        method: 'DELETE',
        data: ''
    });
}

export function getCommentReactionsApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.GetCommentReactionsPathParams,
    queryParams?: FigmaRestAPI.GetCommentReactionsQueryParams,
): Promise<FigmaRestAPI.GetCommentsResponse> {
    const encodedQueryParams = toQueryParams(queryParams);
    return this.request(`${API_DOMAIN}/${API_VER}/files/${pathParams.file_key}/comments/${pathParams.comment_id}/reactions?${encodedQueryParams}`);
}

export function postCommentReactionApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.PostCommentReactionPathParams,
    requestBody?: FigmaRestAPI.PostCommentReactionRequestBody,
): Promise<FigmaRestAPI.PostCommentResponse> {
    return this.request(`${API_DOMAIN}/${API_VER}/files/${pathParams.file_key}/comments/${pathParams.comment_id}/reactions`, {
        method: 'POST',
        data: requestBody,
    });
}

export function deleteCommentReactionsApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.DeleteCommentReactionPathParams,
): Promise<FigmaRestAPI.DeleteCommentReactionResponse> {
    return this.request(`${API_DOMAIN}/${API_VER}/files/${pathParams.file_key}/comments/${pathParams.comment_id}/reactions`, {
        method: 'DELETE',
        data: ''
    });
}


// USERS
// https://www.figma.com/developers/api#users-endpoints
// -----------------------------------------------------------------

export function getUserMeApi(
    this: ApiClass
): Promise<FigmaRestAPI.User> {
    return this.request(`${API_DOMAIN}/${API_VER}/me`);
}


// VERSION HISTORY (FILE VERSIONS)
// https://www.figma.com/developers/api#version-history-endpoints
// -----------------------------------------------------------------

export function getFileVersionsApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.GetFileVersionsPathParams
): Promise<FigmaRestAPI.GetFileVersionsResponse> {
    return this.request(`${API_DOMAIN}/${API_VER}/files/${pathParams.file_key}/versions`);
}


// PROJECTS
// https://www.figma.com/developers/api#projects-endpoints
// -----------------------------------------------------------------

export function getTeamProjectsApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.GetTeamProjectsPathParams
): Promise<FigmaRestAPI.GetTeamProjectsResponse> {
    return this.request(`${API_DOMAIN}/${API_VER}/teams/${pathParams.team_id}/projects`);
}

export function getProjectFilesApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.GetProjectFilesPathParams,
    queryParams?: FigmaRestAPI.GetProjectFilesQueryParams,
): Promise<FigmaRestAPI.GetProjectFilesResponse> {
    const encodedQueryParams = toQueryParams(queryParams);
    return this.request(`${API_DOMAIN}/${API_VER}/projects/${pathParams.project_id}/files?${encodedQueryParams}`);
}


// COMPONENTS AND STYLES (LIBRARY ITEMS)
// https://www.figma.com/developers/api#library-items-endpoints
// -----------------------------------------------------------------

export function getTeamComponentsApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.GetTeamComponentsPathParams,
    queryParams?: FigmaRestAPI.GetTeamComponentsQueryParams,
): Promise<FigmaRestAPI.GetTeamComponentsResponse> {
    const encodedQueryParams = toQueryParams(queryParams);
    return this.request(`${API_DOMAIN}/${API_VER}/teams/${pathParams.team_id}/components?${encodedQueryParams}`);
}

export function getFileComponentsApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.GetFileComponentsPathParams,
): Promise<FigmaRestAPI.GetFileComponentsResponse> {
    return this.request(`${API_DOMAIN}/${API_VER}/files/${pathParams.file_key}/components`);
}

export function getComponentApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.GetComponentPathParams,
): Promise<FigmaRestAPI.GetComponentResponse> {
    return this.request(`${API_DOMAIN}/${API_VER}/components/${pathParams.key}`);
}

export function getTeamComponentSetsApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.GetTeamComponentSetsPathParams,
    queryParams?: FigmaRestAPI.GetTeamComponentSetsQueryParams,
): Promise<FigmaRestAPI.GetTeamComponentSetsResponse> {
    const encodedQueryParams = toQueryParams(queryParams);
    return this.request(`${API_DOMAIN}/${API_VER}/teams/${pathParams.team_id}/component_sets?${encodedQueryParams}`);
}

export function getFileComponentSetsApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.GetFileComponentSetsPathParams,
): Promise<FigmaRestAPI.GetFileComponentSetsResponse> {
    return this.request(`${API_DOMAIN}/${API_VER}/files/${pathParams.file_key}/component_sets`);
}

export function getComponentSetApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.GetComponentSetPathParams,
): Promise<FigmaRestAPI.GetComponentSetResponse> {
    return this.request(`${API_DOMAIN}/${API_VER}/component_sets/${pathParams.key}`);
}

export function getTeamStylesApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.GetTeamStylesPathParams,
    queryParams?: FigmaRestAPI.GetTeamStylesQueryParams,
): Promise<FigmaRestAPI.GetTeamStylesResponse> {
    const encodedQueryParams = toQueryParams(queryParams);
    return this.request(`${API_DOMAIN}/${API_VER}/teams/${pathParams.team_id}/styles?${encodedQueryParams}`);
}

export function getFileStylesApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.GetFileStylesPathParams,
): Promise<FigmaRestAPI.GetFileStylesResponse> {
    return this.request(`${API_DOMAIN}/${API_VER}/files/${pathParams.file_key}/styles`);
}

export function getStyleApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.GetStylePathParams,
): Promise<FigmaRestAPI.GetStyleResponse> {
    return this.request(`${API_DOMAIN}/${API_VER}/styles/${pathParams.key}`);
}


// WEBHOOKS
// https://www.figma.com/developers/api#webhooks_v2
// -----------------------------------------------------------------

export function getWebhookApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.GetWebhookPathParams,
): Promise<FigmaRestAPI.GetWebhookResponse> {
    return this.request(`${API_DOMAIN}/${API_VER_WEBHOOKS}/webhooks/${pathParams.webhook_id}`);
}

export function postWebhookApi(
    this: ApiClass,
    requestBody?: FigmaRestAPI.PostWebhookRequestBody,
): Promise<FigmaRestAPI.PostWebhookResponse> {
    return this.request(`${API_DOMAIN}/${API_VER_WEBHOOKS}/webhooks`, {
        method: 'POST',
        data: requestBody,
    });
}

export function putWebhookApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.PutWebhookPathParams,
    requestBody?: FigmaRestAPI.PutWebhookRequestBody,
): Promise<FigmaRestAPI.PutWebhookResponse> {
    return this.request(`${API_DOMAIN}/${API_VER_WEBHOOKS}/webhooks/${pathParams.webhook_id}`, {
        method: 'PUT',
        data: requestBody,
    });
}

export function deleteWebhookApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.DeleteWebhookPathParams,
): Promise<FigmaRestAPI.DeleteWebhookResponse> {
    return this.request(`${API_DOMAIN}/${API_VER_WEBHOOKS}/webhooks/${pathParams.webhook_id}/`, {
        method: 'DELETE',
        data: ''
    });
}

export function getTeamWebhooksApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.GetTeamWebhooksPathParams,
): Promise<FigmaRestAPI.GetTeamWebhooksResponse> {
    return this.request(`${API_DOMAIN}/${API_VER_WEBHOOKS}/teams/${pathParams.team_id}/webhooks`);
}

export function getWebhookRequestsApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.GetWebhookRequestsPathParams,
): Promise<FigmaRestAPI.GetWebhookRequestsResponse> {
    return this.request(`${API_DOMAIN}/${API_VER_WEBHOOKS}/webhooks/${pathParams.webhook_id}/requests`);
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

export function getLocalVariablesApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.GetLocalVariablesPathParams,
): Promise<FigmaRestAPI.GetLocalVariablesResponse> {
    return this.request(`${API_DOMAIN}/${API_VER}/files/${pathParams.file_key}/variables/local`);
}

export function getPublishedVariablesApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.GetPublishedVariablesPathParams,
): Promise<FigmaRestAPI.GetPublishedVariablesResponse> {
    return this.request(`${API_DOMAIN}/${API_VER}/analytics/libraries/${pathParams.file_key}/variables/published`);
}

export function postVariablesApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.PostVariablesPathParams,
    requestBody?: FigmaRestAPI.PostVariablesRequestBody,
): Promise<FigmaRestAPI.PostVariablesResponse> {
    return this.request(`${API_DOMAIN}/${API_VER}/files/${pathParams.file_key}/variables`, {
        method: 'POST',
        data: requestBody,
    });
}


// DEV RESOURCES
// https://www.figma.com/developers/api#dev-resources-endpoints
// -----------------------------------------------------------------

export function getDevResourcesApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.GetDevResourcesPathParams,
    queryParams?: FigmaRestAPI.GetDevResourcesQueryParams,
): Promise<FigmaRestAPI.GetDevResourcesResponse> {
    const encodedQueryParams = toQueryParams(queryParams);
    return this.request(`${API_DOMAIN}/${API_VER}/files/${pathParams.file_key}/dev_resources`);
}

export function postDevResourcesApi(
    this: ApiClass,
    requestBody?: FigmaRestAPI.PostDevResourcesRequestBody,
): Promise<FigmaRestAPI.PostDevResourcesResponse> {
    return this.request(`${API_DOMAIN}/${API_VER}/dev_resources`, {
        method: 'POST',
        data: requestBody,
    });
}

export function putDevResourcesApi(
    this: ApiClass,
    requestBody?: FigmaRestAPI.PutDevResourcesRequestBody,
): Promise<FigmaRestAPI.PutDevResourcesResponse> {
    return this.request(`${API_DOMAIN}/${API_VER}/dev_resources`, {
        method: 'PUT',
        data: requestBody,
    });
}

export function deleteDevResourcesApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.DeleteDevResourcePathParams,
): Promise<FigmaRestAPI.DeleteDevResourceResponse> {
    return this.request(`${API_DOMAIN}/${API_VER}/files/${pathParams.file_key}/dev_resources/${pathParams.dev_resource_id}`, {
        method: 'DELETE',
        data: ''
    });
}


// ANALYTICS
// https://www.figma.com/developers/api#library-analytics-endpoints
// -----------------------------------------------------------------

export function getLibraryAnalyticsComponentActionsApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.GetLibraryAnalyticsComponentActionsPathParams,
    queryParams?: FigmaRestAPI.GetLibraryAnalyticsComponentActionsQueryParams,
): Promise<FigmaRestAPI.GetLibraryAnalyticsComponentActionsResponse> {
    const encodedQueryParams = toQueryParams(queryParams);
    return this.request(`${API_DOMAIN}/${API_VER}/analytics/libraries/${pathParams.file_key}/component/actions?${encodedQueryParams}`);
}

export function getLibraryAnalyticsComponentUsagesApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.GetLibraryAnalyticsComponentUsagesPathParams,
    queryParams?: FigmaRestAPI.GetLibraryAnalyticsComponentUsagesQueryParams,
): Promise<FigmaRestAPI.GetLibraryAnalyticsComponentUsagesResponse> {
    const encodedQueryParams = toQueryParams(queryParams);
    return this.request(`${API_DOMAIN}/${API_VER}/analytics/libraries/${pathParams.file_key}/component/usages?${encodedQueryParams}`);
}

export function getLibraryAnalyticsStyleActionsApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.GetLibraryAnalyticsStyleActionsPathParams,
    queryParams?: FigmaRestAPI.GetLibraryAnalyticsStyleActionsQueryParams,
): Promise<FigmaRestAPI.GetLibraryAnalyticsStyleActionsResponse> {
    const encodedQueryParams = toQueryParams(queryParams);
    return this.request(`${API_DOMAIN}/${API_VER}/analytics/libraries/${pathParams.file_key}/style/actions?${encodedQueryParams}`);
}

export function getLibraryAnalyticsStyleUsagesApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.GetLibraryAnalyticsStyleUsagesPathParams,
    queryParams?: FigmaRestAPI.GetLibraryAnalyticsStyleUsagesQueryParams,
): Promise<FigmaRestAPI.GetLibraryAnalyticsStyleUsagesResponse> {
    const encodedQueryParams = toQueryParams(queryParams);
    return this.request(`${API_DOMAIN}/${API_VER}/analytics/libraries/${pathParams.file_key}/style/usages?${encodedQueryParams}`);
}

export function getLibraryAnalyticsVariableActionsApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.GetLibraryAnalyticsVariableActionsPathParams,
    queryParams?: FigmaRestAPI.GetLibraryAnalyticsVariableActionsQueryParams,
): Promise<FigmaRestAPI.GetLibraryAnalyticsVariableActionsResponse> {
    const encodedQueryParams = toQueryParams(queryParams);
    return this.request(`${API_DOMAIN}/${API_VER}/analytics/libraries/${pathParams.file_key}/variable/actions?${encodedQueryParams}`);
}

export function getLibraryAnalyticsVariableUsagesApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.GetLibraryAnalyticsVariableUsagesPathParams,
    queryParams?: FigmaRestAPI.GetLibraryAnalyticsVariableUsagesQueryParams,
): Promise<FigmaRestAPI.GetLibraryAnalyticsVariableUsagesResponse> {
    const encodedQueryParams = toQueryParams(queryParams);
    return this.request(`${API_DOMAIN}/${API_VER}/analytics/libraries/${pathParams.file_key}/variable/usages?${encodedQueryParams}`);
}

