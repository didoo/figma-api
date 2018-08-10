import { API_DOMAIN, API_VER } from './config';
import { Node, Style, Component, Version, Comment, Vector, FrameOffset } from './ast-types';
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
import { ResultA, ResultOk, ResultErr, Result } from 'go-result-js';

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

export type Disposer = () => void;

export class ApiError extends Error {
    constructor(
        public response: AxiosResponse,
        message?: string,
    ) {
        super(message);
    }
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

    appendHeaders = (headers: { [x: string]: string }) => {
        if (this.personalAccessToken) headers['X-Figma-Token'] = this.personalAccessToken;
        if (this.oAuthToken) headers['Authorization'] =  `Bearer ${this.oAuthToken}`;
    };

    request = <T>(url: string, opts?: { method: string, data: string }) => ResultA<T, ApiError>(async (resolve, reject) => {
        const headers = {};
        this.appendHeaders(headers);
        const axiosParams: AxiosRequestConfig = {
            url,
            ...opts,
            headers,
        };
        const [ err, res ] = await ResultA(axios(axiosParams));
        if (err || !res || res.status !== 200) reject(new ApiError(res!, err instanceof Error ? err.message : ''));
        else resolve(res.data);
    });

    getFile = (key: string, opts?: {
        /** A specific version ID to get. Omitting this will get the current version of the file */
        version?: string,
        /** Set to "paths" to export vector data */
        geometry?: string,
    }): ResultA<GetFileResult, ApiError> => {
        const queryParams = toQueryParams(opts);
        return this.request<GetFileResult>(`${API_DOMAIN}/${API_VER}/files/${key}?${queryParams}`);
    };
    
    getImage = (key: string, opts: {
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
    }): ResultA<GetImageResult, ApiError> =>  {
        const queryParams = toQueryParams(opts);
        return this.request<GetImageResult>(`${API_DOMAIN}/${API_VER}/images/${key}?${queryParams}`);
    }
    
    getVersions = (key: string): ResultA<GetVersionsResult, ApiError> => {
        return this.request(`${API_DOMAIN}/${API_VER}/files/${key}/versions`);
    }
    
    getComments = (key: string): ResultA<GetCommentsResult, ApiError> => {
        return this.request(`${API_DOMAIN}/${API_VER}/files/${key}/comments`);
    }
    
    postComment = (key: string, message: string, client_meta: Vector|FrameOffset): ResultA<PostCommentResult, ApiError> => {
        const body = {
            message,
            client_meta,
        };
        return this.request(`${API_DOMAIN}/${API_VER}/files/${key}/comments`, {
            method: 'POST',
            data: JSON.stringify(body),
        });
    }
    
    getTeamProjects = (team_id: string): ResultA<GetTeamProjectsResult, ApiError> => {
        return this.request(`${API_DOMAIN}/${API_VER}/teams/${team_id}/projects`);
    }
    
    getProjectFiles = (project_id: string): ResultA<GetProjectFilesResult, ApiError> => {
        return this.request(`${API_DOMAIN}/${API_VER}/projects/${project_id}/files`);
    }

    _watchVersion = (
        key: string,
        onNewVersion: (newVersion: Version) => void|Promise<void>,
        opts: {
            /** in milliseconds */
            timeout: number,
            onError?: (error: ResultErr<ApiError>|undefined, dispose: Disposer) => void,
            immediate?: boolean,
        } = {
            timeout: 6000,
        },
    ): Disposer => {
        let currentPromise: ResultA<GetVersionsResult, ApiError>|null;
        let lastVersionId: string;

        const interval = setInterval(async () => {
            if (!currentPromise) {
                currentPromise = this.getVersions(key);
                const [ err, res ] = await currentPromise;
                if (err || !res) {
                    if (opts.onError) {
                        opts.onError(err, disposer);
                    } else {
                        console.error('Figma.watchVersion: Unhandled error', err);
                    }
                } else {
                    if (res.versions.length === 0) {
                        console.warn('Figma.watchVersion: Strange, versions === 0, skipping');
                        return;
                    }

                    const lastVer = res.versions[res.versions.length - 1];
                    if (!lastVersionId) {
                        if (opts.immediate) {
                            await onNewVersion(lastVer);
                        }
                    } else {
                        await onNewVersion(lastVer);
                    }
                    lastVersionId = lastVer.id;
                }
            }
        }, opts.timeout);

        const disposer = () => clearInterval(interval);
        return disposer;
    }

    _watchComments = (
        key: string,
        onNewComments: (newComments: Comment[]) => void|Promise<void>,
        opts: {
            /** in milliseconds */
            timeout: number,
            onError?: (error: ResultErr<ApiError>|undefined, dispose: Disposer) => void,
            immediate?: boolean,
        } = {
            timeout: 5000,
        },
    ): Disposer => {
        let currentPromise: ResultA<GetCommentsResult, ApiError>|null;
        let lastCommentId: string;

        const interval = setInterval(async () => {
            if (!currentPromise) {
                currentPromise = this.getComments(key);
                const [ err, res ] = await currentPromise;
                if (err || !res) {
                    if (opts.onError) {
                        opts.onError(err, disposer);
                    } else {
                        console.error('Figma.watchComments: Unhandled error', err);
                    }
                } else {
                    if (res.comments.length === 0) {
                        return;
                    }

                    const lastComment = res.comments[res.comments.length - 1];
                    if (!lastCommentId) {
                        if (opts.immediate) {
                            await onNewComments(res.comments);
                        }
                    } else {
                        // find new comments
                        const lastCommentInd = res.comments.findIndex(x => x.id === lastCommentId);
                        if (lastCommentInd === -1) await onNewComments(res.comments);
                        else {
                            const nextNewCommentInd = lastCommentInd + 1;
                            await onNewComments(res.comments.slice(nextNewCommentInd));
                        }
                    }
                    lastCommentId = lastComment.id;
                }
            }
        }, opts.timeout);

        const disposer = () => clearInterval(interval);
        return disposer;
    }
}

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

export function oAuthToken(
    client_id: string,
    client_secret: string,
    redirect_uri: string,
    code: string,
    grant_type: 'authorization_code',
): ResultA<{
    access_token: string,
    expires_in: number,
}, ApiError> {
    const queryParams = toQueryParams({
        client_id,
        client_secret,
        redirect_uri,
        code,
        grant_type,
    });
    const url = `https://www.figma.com/api/oauth/token?${queryParams}`;
    return ResultA(async (resolve, reject) => {
        const [ err, res ] = await ResultA(axios({ url, method: 'POST' }));
        if (err || !res || res.status !== 200) resolve(new ApiError(res!, err instanceof Error ? err.message : ''));
        else resolve(res.data);
    });
}