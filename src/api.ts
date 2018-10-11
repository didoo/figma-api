import { API_DOMAIN, API_VER } from './config';
import { Node, Style, Component, Version, Comment, Vector, FrameOffset } from './ast-types';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export type GetFileResult = {
    name: string,
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

export type GetImageFillsResult = {
    err: string,
    images?: { [nodeId: string]: string },
    meta?: {
        images: { [nodeId: string]: string },
    },
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

    request = async <T>(url: string, opts?: { method: string, data: string }) => {
        const headers = {};
        this.appendHeaders(headers);
        const axiosParams: AxiosRequestConfig = {
            url,
            ...opts,
            headers,
        };
        const res = await axios(axiosParams);
        if (res.status !== 200) throw res.statusText;
        return res.data;
    };

    getFile = (key: string, opts?: {
        /** A specific version ID to get. Omitting this will get the current version of the file */
        version?: string,
        /** Set to "paths" to export vector data */
        geometry?: string,
    }): Promise<GetFileResult> => {
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
    }): Promise<GetImageResult> =>  {
        const queryParams = toQueryParams(opts);
        return this.request<GetImageResult>(`${API_DOMAIN}/${API_VER}/images/${key}?${queryParams}`);
    }

    getImageFills = (fileKey: string): Promise<GetImageFillsResult> =>  {
        return this.request<GetImageFillsResult>(`${API_DOMAIN}/${API_VER}/files/${fileKey}/images`);
    }
    
    getVersions = (key: string): Promise<GetVersionsResult> => {
        return this.request(`${API_DOMAIN}/${API_VER}/files/${key}/versions`);
    }
    
    getComments = (key: string): Promise<GetCommentsResult> => {
        return this.request(`${API_DOMAIN}/${API_VER}/files/${key}/comments`);
    }
    
    postComment = (key: string, message: string, client_meta: Vector|FrameOffset): Promise<PostCommentResult> => {
        const body = {
            message,
            client_meta,
        };
        return this.request(`${API_DOMAIN}/${API_VER}/files/${key}/comments`, {
            method: 'POST',
            data: JSON.stringify(body),
        });
    }
    
    getTeamProjects = (team_id: string): Promise<GetTeamProjectsResult> => {
        return this.request(`${API_DOMAIN}/${API_VER}/teams/${team_id}/projects`);
    }
    
    getProjectFiles = (project_id: string): Promise<GetProjectFilesResult> => {
        return this.request(`${API_DOMAIN}/${API_VER}/projects/${project_id}/files`);
    }

    // _watchVersion = (
    //     key: string,
    //     onNewVersion: (newVersion: Version) => void|Promise<void>,
    //     opts: {
    //         /** in milliseconds */
    //         timeout: number,
    //         onError?: (error: ApiError|undefined, dispose: Disposer) => void,
    //         immediate?: boolean,
    //     } = {
    //         timeout: 6000,
    //     },
    // ): Disposer => {
    //     let currentPromise: Promise<GetVersionsResult>|null;
    //     let lastVersionId: string;

    //     const interval = setInterval(async () => {
    //         if (!currentPromise) {
    //             currentPromise = this.getVersions(key);
    //             const res = await currentPromise;
                
    //             if (!res) {
    //                 if (opts.onError) {
    //                     opts.onError(err, disposer);
    //                 } else {
    //                     console.error('Figma.watchVersion: Unhandled error', err);
    //                 }
    //             } else {
    //                 if (res.versions.length === 0) {
    //                     console.warn('Figma.watchVersion: Strange, versions === 0, skipping');
    //                 } else {
    //                     const lastVer = res.versions[res.versions.length - 1];
    //                     if (!lastVersionId) {
    //                         if (opts.immediate) {
    //                             await onNewVersion(lastVer);
    //                         }
    //                     } else {
    //                         await onNewVersion(lastVer);
    //                     }
    //                     lastVersionId = lastVer.id;
    //                 }
    //             }
    //             currentPromise = null;
    //         }
    //     }, opts.timeout);

    //     const disposer = () => clearInterval(interval);
    //     return disposer;
    // }

    // _watchComments = (
    //     key: string,
    //     onNewComments: (newComments: Comment[]) => void|Promise<void>,
    //     opts: {
    //         /** in milliseconds */
    //         timeout: number,
    //         onError?: (error: ResultErr<ApiError>|undefined, dispose: Disposer) => void,
    //         immediate?: boolean,
    //     } = {
    //         timeout: 5000,
    //     },
    // ): Disposer => {
    //     let currentPromise: Promise<GetCommentsResult>|null;
    //     let lastCommentId: string;

    //     const interval = setInterval(async () => {
    //         if (!currentPromise) {
    //             currentPromise = this.getComments(key);
    //             const [ err, res ] = await currentPromise;

    //             if (err || !res) {
    //                 if (opts.onError) {
    //                     opts.onError(err, disposer);
    //                 } else {
    //                     console.error('Figma.watchComments: Unhandled error', err);
    //                 }
    //             } else {
    //                 if (res.comments.length !== 0) {
    //                     const lastComment = res.comments[res.comments.length - 1];
    //                     if (!lastCommentId) {
    //                         if (opts.immediate) {
    //                             await onNewComments(res.comments);
    //                         }
    //                     } else {
    //                         // find new comments
    //                         const lastCommentInd = res.comments.findIndex(x => x.id === lastCommentId);
    //                         if (lastCommentInd === -1) await onNewComments(res.comments);
    //                         else {
    //                             const nextNewCommentInd = lastCommentInd + 1;
    //                             await onNewComments(res.comments.slice(nextNewCommentInd));
    //                         }
    //                     }
    //                     lastCommentId = lastComment.id;
    //                 }
    //             }
    //             currentPromise = null;
    //         }
    //     }, opts.timeout);

    //     const disposer = () => clearInterval(interval);
    //     return disposer;
    // }
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

export async function oAuthToken(
    client_id: string,
    client_secret: string,
    redirect_uri: string,
    code: string,
    grant_type: 'authorization_code',
): Promise<{
    access_token: string,
    expires_in: number,
}> {
    const queryParams = toQueryParams({
        client_id,
        client_secret,
        redirect_uri,
        code,
        grant_type,
    });
    const url = `https://www.figma.com/api/oauth/token?${queryParams}`;
    const res = await axios({ url, method: 'POST' });
    if (res.status !== 200) throw res.statusText;
    return res.data;
}
