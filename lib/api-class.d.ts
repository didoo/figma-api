import * as ApiEndpoints from './api-endpoints';
import { ApiRequestMethod } from './utils';
export declare class Api {
    personalAccessToken?: string;
    oAuthToken?: string;
    constructor(params: {
        personalAccessToken: string;
    } | {
        oAuthToken: string;
    });
    appendHeaders: (headers: {
        [x: string]: string;
    }) => void;
    request: ApiRequestMethod;
    getFile: typeof ApiEndpoints.getFileApi;
    getFileNodes: typeof ApiEndpoints.getFileNodesApi;
    getImages: typeof ApiEndpoints.getImagesApi;
    getImageFills: typeof ApiEndpoints.getImageFillsApi;
    getComments: typeof ApiEndpoints.getCommentsApi;
    postComment: typeof ApiEndpoints.postCommentApi;
    deleteComment: typeof ApiEndpoints.deleteCommentApi;
    getCommentReactions: typeof ApiEndpoints.getCommentReactionsApi;
    postCommentReaction: typeof ApiEndpoints.postCommentReactionApi;
    deleteCommentReactions: typeof ApiEndpoints.deleteCommentReactionsApi;
    getUserMe: typeof ApiEndpoints.getUserMeApi;
    getFileVersions: typeof ApiEndpoints.getFileVersionsApi;
    getTeamProjects: typeof ApiEndpoints.getTeamProjectsApi;
    getProjectFiles: typeof ApiEndpoints.getProjectFilesApi;
    getTeamComponents: typeof ApiEndpoints.getTeamComponentsApi;
    getFileComponents: typeof ApiEndpoints.getFileComponentsApi;
    getComponent: typeof ApiEndpoints.getComponentApi;
    getTeamComponentSets: typeof ApiEndpoints.getTeamComponentSetsApi;
    getFileComponentSets: typeof ApiEndpoints.getFileComponentSetsApi;
    getComponentSet: typeof ApiEndpoints.getComponentSetApi;
    getTeamStyles: typeof ApiEndpoints.getTeamStylesApi;
    getFileStyles: typeof ApiEndpoints.getFileStylesApi;
    getStyle: typeof ApiEndpoints.getStyleApi;
    getWebhook: typeof ApiEndpoints.getWebhookApi;
    postWebhook: typeof ApiEndpoints.postWebhookApi;
    putWebhook: typeof ApiEndpoints.putWebhookApi;
    deleteWebhook: typeof ApiEndpoints.deleteWebhookApi;
    getTeamWebhooks: typeof ApiEndpoints.getTeamWebhooksApi;
    getWebhookRequests: typeof ApiEndpoints.getWebhookRequestsApi;
    getLocalVariables: typeof ApiEndpoints.getLocalVariablesApi;
    getPublishedVariables: typeof ApiEndpoints.getPublishedVariablesApi;
    postVariables: typeof ApiEndpoints.postVariablesApi;
    getDevResources: typeof ApiEndpoints.getDevResourcesApi;
    postDevResources: typeof ApiEndpoints.postDevResourcesApi;
    putDevResources: typeof ApiEndpoints.putDevResourcesApi;
    deleteDevResources: typeof ApiEndpoints.deleteDevResourcesApi;
    getLibraryAnalyticsComponentActions: typeof ApiEndpoints.getLibraryAnalyticsComponentActionsApi;
    getLibraryAnalyticsComponentUsages: typeof ApiEndpoints.getLibraryAnalyticsComponentUsagesApi;
    getLibraryAnalyticsStyleActions: typeof ApiEndpoints.getLibraryAnalyticsStyleActionsApi;
    getLibraryAnalyticsStyleUsages: typeof ApiEndpoints.getLibraryAnalyticsStyleUsagesApi;
    getLibraryAnalyticsVariableActions: typeof ApiEndpoints.getLibraryAnalyticsVariableActionsApi;
    getLibraryAnalyticsVariableUsages: typeof ApiEndpoints.getLibraryAnalyticsVariableUsagesApi;
}
export declare function oAuthLink(client_id: string, redirect_uri: string, scope: 'file_read', state: string, response_type: 'code'): string;
type OAuthTokenResponseData = {
    user_id: string;
    access_token: string;
    refresh_token: string;
    expires_in: number;
};
export declare function oAuthToken(client_id: string, client_secret: string, redirect_uri: string, code: string, grant_type: 'authorization_code'): Promise<OAuthTokenResponseData>;
export {};
