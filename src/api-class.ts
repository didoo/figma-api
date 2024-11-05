import * as ApiEndpoints from './api-endpoints';
import { ApiRequestMethod, toQueryParams } from './utils';

import axios, { AxiosRequestConfig, Method as AxiosMethod } from 'axios';

export class Api {
    personalAccessToken?: string;
    oAuthToken?: string;

    constructor(params: {
        personalAccessToken: string,
    } | {
        oAuthToken: string,
    }) {
        if ('personalAccessToken' in params) {
            this.personalAccessToken = params.personalAccessToken;
        }
        if ('oAuthToken' in params) {
            this.oAuthToken = params.oAuthToken;
        }
    }

    appendHeaders = (headers: { [x: string]: string }) => {
        if (this.personalAccessToken) headers['X-Figma-Token'] = this.personalAccessToken;
        if (this.oAuthToken) headers['Authorization'] =  `Bearer ${this.oAuthToken}`;
    }

    request: ApiRequestMethod = async <T>(url: string, opts?: { method: AxiosMethod, data: AxiosRequestConfig["data"] }) => {
        const headers = {};
        this.appendHeaders(headers);

        const axiosParams: AxiosRequestConfig = {
            url,
            ...opts,
            headers,
        };

        const res = await axios(axiosParams);
        if (Math.floor(res.status / 100) !== 2) throw res.statusText;
        return res.data;
    };

    getFile = ApiEndpoints.getFileApi;
    getFileNodes = ApiEndpoints.getFileNodesApi;
    getImage = ApiEndpoints.getImagesApi;
    getImageFills = ApiEndpoints.getImageFillsApi;
    getComments = ApiEndpoints.getCommentsApi;
    postComment = ApiEndpoints.postCommentApi;
    deleteComments = ApiEndpoints.deleteCommentApi;
    getMe = ApiEndpoints.getUserMeApi;
    getVersions = ApiEndpoints.getFileVersionsApi;
    getTeamProjects = ApiEndpoints.getTeamProjectsApi;
    getProjectFiles = ApiEndpoints.getProjectFilesApi;
    getTeamComponents = ApiEndpoints.getTeamComponentsApi;
    getFileComponents = ApiEndpoints.getFileComponentsApi;
    getComponent = ApiEndpoints.getComponentApi;
    getTeamComponentSets = ApiEndpoints.getTeamComponentSetsApi;
    getFileComponentSets = ApiEndpoints.getFileComponentSetsApi;
    getComponentSet = ApiEndpoints.getComponentSetApi;
    getTeamStyles = ApiEndpoints.getTeamStylesApi;
    getFileStyles = ApiEndpoints.getFileStylesApi;
    getStyle = ApiEndpoints.getStyleApi;
}

// see: https://www.figma.com/developers/api#auth-oauth2
export function oAuthLink(
    client_id: string,
    redirect_uri: string,
    scope: 'file_read',
    state: string,
    response_type: 'code',
) {
    const queryParams = toQueryParams({
        client_id,
        redirect_uri,
        scope,
        state,
        response_type,
    });
    return `https://www.figma.com/oauth?${queryParams}`;
}

export async function oAuthToken(
    client_id: string,
    client_secret: string,
    redirect_uri: string,
    code: string,
    grant_type: 'authorization_code',
): Promise<{
    user_id: string,
    access_token: string,
    refresh_token: string,
    expires_in: number,
}> {
    // see: https://www.figma.com/developers/api#update-oauth-credentials-handling
    const headers = {
        'Authorization': `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
    };
    const queryParams = toQueryParams({
        redirect_uri,
        code,
        grant_type,
    });
    const url = `https://api.figma.com/v1/oauth/token?${queryParams}`;
    const res = await axios({ url, method: 'POST', headers });
    if (res.status !== 200) throw res.statusText;
    return res.data;
}
