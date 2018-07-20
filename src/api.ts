import { request } from './http';
import { API_DOMAIN, API_VER } from './config';
import { Node, Style, Component, Version, Comment, Vector, FrameOffset } from './ast-types';

export type GetFileResult = {
    document: Node<'DOCUMENT'>,
    components: { [nodeId: string]: Component },
    schemaVersion: number,
    styles: { [styleName: string]: Style },
};

export type GetImageResult = {
    err: string,
    images: { [nodeId: string]: string|null },
    status: number,
};

export type GetVersionsResult = {
    versions: Version[],
};

export type GetCommentsResult = {
    comments: Comment[],
};

export type PostCommentResult = Comment;

export type GetTeamProjectsResult = {
    projects: { id: number, name: string }[],
};

export type GetProjectFilesResult = {
    files: {
        key: string,
        name: string,
        thumbnail_url: string,
        last_modified: string,
    }[],
};

export function toQueryParams(x: any): string {
    if (!x) return '';
    return Object.entries(x).map(([ k, v ]) => (
        `${k}=${encodeURIComponent(v as any)}`
    )).join('&')
}

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

    appendHeaders(headers: Headers) {
        if (this.personalAccessToken) headers.append('X-Figma-Token', this.personalAccessToken);
        if (this.oAuthToken) headers.append('Authorization', `Bearer ${this.oAuthToken}`);
    }

    request(url: string, opts?: { method: string, body: string }) {
        const headers = new Headers;
        this.appendHeaders(headers);
        return request(url, { ...opts, headers });
    }

    async getFile(key: string, opts?: {
        /** A specific version ID to get. Omitting this will get the current version of the file */
        version?: string,
        /** Set to "paths" to export vector data */
        geometry?: string,
    }) {
        const queryParams = toQueryParams(opts);
        const resp = await this.request(`${API_DOMAIN}/${API_VER}/files/${key}?${queryParams}`);
        return await resp.json() as GetFileResult;
    }
    
    async getImage(key: string, opts: {
        /** A comma separated list of node IDs to render */
        ids: string,
        /** A number between 0.01 and 4, the image scaling factor */
        scale: number,
        /** A string enum for the image output format */
        format: 'jpg'|'png'|'svg',
        /** Whether to include id attributes for all SVG elements. `Default: false` */
        svg_include_id?: boolean,
        /** Whether to simplify inside/outside strokes and use stroke attribute if possible instead of <mask>. `Default: true` */
        svg_simplify_stroke?: boolean,
        /** A specific version ID to get. Omitting this will get the current version of the file */
        version?: string,
    }) {
        const queryParams = toQueryParams(opts);
        const resp = await this.request(`${API_DOMAIN}/${API_VER}/images/${key}?${queryParams}`);
        return await resp.json() as GetImageResult;
    }
    
    async getVersions(key: string) {
        const resp = await this.request(`${API_DOMAIN}/${API_VER}/files/${key}/versions`);
        return await resp.json() as GetVersionsResult;
    }
    
    async getComments(key: string) {
        const resp = await this.request(`${API_DOMAIN}/${API_VER}/files/${key}/comments`);
        return await resp.json() as GetCommentsResult;
    }
    
    async postComment(key: string, message: string, client_meta: Vector|FrameOffset) {
        const body = {
            message,
            client_meta,
        };
        const resp = await this.request(`${API_DOMAIN}/${API_VER}/files/${key}/comments`, {
            method: 'POST',
            body: JSON.stringify(body),
        });
        return await resp.json() as PostCommentResult;
    }
    
    async getTeamProjects(team_id: string) {
        const resp = await this.request(`${API_DOMAIN}/${API_VER}/teams/${team_id}/projects`);
        return await resp.json() as GetTeamProjectsResult;
    }
    
    async getProjectFiles(project_id: string) {
        const resp = await this.request(`${API_DOMAIN}/${API_VER}/projects/${project_id}/files`);
        return await resp.json() as GetProjectFilesResult;
    }
}

export async function oAuthLink(
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
) {
    const queryParams = toQueryParams({
        client_id,
        client_secret,
        redirect_uri,
        code,
        grant_type,
    });
    const resp = await request(`https://www.figma.com/api/oauth/token?${queryParams}`);
    return await resp.json() as {
        access_token: string,
        expires_in: number,
    };
}