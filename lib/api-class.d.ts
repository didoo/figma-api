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
    getImage: typeof ApiEndpoints.getImagesApi;
    getImageFills: typeof ApiEndpoints.getImageFillsApi;
    getComments: typeof ApiEndpoints.getCommentsApi;
    postComment: typeof ApiEndpoints.postCommentApi;
    deleteComments: typeof ApiEndpoints.deleteCommentApi;
    getMe: typeof ApiEndpoints.getUserMeApi;
    getVersions: typeof ApiEndpoints.getFileVersionsApi;
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
}
export declare function oAuthLink(client_id: string, redirect_uri: string, scope: 'file_read', state: string, response_type: 'code'): string;
export declare function oAuthToken(client_id: string, client_secret: string, redirect_uri: string, code: string, grant_type: 'authorization_code'): Promise<{
    user_id: string;
    access_token: string;
    refresh_token: string;
    expires_in: number;
}>;
