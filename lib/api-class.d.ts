import { getFileApi, getFileNodesApi, getImageApi, getImageFillsApi, getCommentsApi, postCommentsApi, getUserMeApi, getVersionsApi, getTeamProjectsApi, getProjectFilesApi, getTeamComponentsApi, getComponentApi, getTeamStylesApi, getStyleApi } from './api-funcs';
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
    getFile: typeof getFileApi;
    getFileNodes: typeof getFileNodesApi;
    getImage: typeof getImageApi;
    getImageFills: typeof getImageFillsApi;
    getComments: typeof getCommentsApi;
    postComment: typeof postCommentsApi;
    getMe: typeof getUserMeApi;
    getVersions: typeof getVersionsApi;
    getTeamProjects: typeof getTeamProjectsApi;
    getProjectFiles: typeof getProjectFilesApi;
    getTeamComponents: typeof getTeamComponentsApi;
    getComponent: typeof getComponentApi;
    getTeamStyles: typeof getTeamStylesApi;
    getStyle: typeof getStyleApi;
}
export declare function oAuthLink(client_id: string, redirect_uri: string, scope: 'file_read', state: string, response_type: 'code'): string;
export declare function oAuthToken(client_id: string, client_secret: string, redirect_uri: string, code: string, grant_type: 'authorization_code'): Promise<{
    access_token: string;
    expires_in: number;
}>;
