import { Node, Style, Component, Version, Comment, Vector, FrameOffset } from './ast-types';
import { AxiosResponse } from 'axios';
import { ResultA, ResultErr } from 'go-result-js';
export declare type GetFileResult = {
    name: string;
    document: Node<'DOCUMENT'>;
    components: {
        [nodeId: string]: Component;
    };
    schemaVersion: number;
    styles: {
        [styleName: string]: Style;
    };
};
export declare type GetImageResult = {
    err: string;
    images: {
        [nodeId: string]: string | null;
    };
    status: number;
};
export declare type GetImageFillsResult = {
    err: string;
    images?: {
        [nodeId: string]: string;
    };
    meta?: {
        images: {
            [nodeId: string]: string;
        };
    };
    status: number;
};
export declare type GetVersionsResult = {
    versions: Version[];
};
export declare type GetCommentsResult = {
    comments: Comment[];
};
export declare type PostCommentResult = Comment;
export declare type GetTeamProjectsResult = {
    projects: {
        id: number;
        name: string;
    }[];
};
export declare type GetProjectFilesResult = {
    files: {
        key: string;
        name: string;
        thumbnail_url: string;
        last_modified: string;
    }[];
};
export declare function toQueryParams(x: any): string;
export declare type Disposer = () => void;
export declare class ApiError extends Error {
    response: AxiosResponse;
    constructor(response: AxiosResponse, message?: string);
}
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
    request: <T>(url: string, opts?: {
        method: string;
        data: string;
    } | undefined) => Promise<[ResultErr<ApiError>, T | undefined]>;
    getFile: (key: string, opts?: {
        /** A specific version ID to get. Omitting this will get the current version of the file */
        version?: string | undefined;
        /** Set to "paths" to export vector data */
        geometry?: string | undefined;
    } | undefined) => Promise<[ResultErr<ApiError>, GetFileResult | undefined]>;
    getImage: (key: string, opts: {
        /** A comma separated list of node IDs to render */
        ids: string;
        /** A number between 0.01 and 4, the image scaling factor */
        scale: number;
        /** A string enum for the image output format */
        format: "svg" | "jpg" | "png";
        /** Whether to include id attributes for all SVG elements. `Default: false` */
        svg_include_id?: boolean | undefined;
        /** Whether to simplify inside/outside strokes and use stroke attribute if possible instead of <mask>. `Default: true` */
        svg_simplify_stroke?: boolean | undefined;
        /** A specific version ID to get. Omitting this will get the current version of the file */
        version?: string | undefined;
    }) => Promise<[ResultErr<ApiError>, GetImageResult | undefined]>;
    getImageFills: (fileKey: string) => Promise<[ResultErr<ApiError>, GetImageFillsResult | undefined]>;
    getVersions: (key: string) => Promise<[ResultErr<ApiError>, GetVersionsResult | undefined]>;
    getComments: (key: string) => Promise<[ResultErr<ApiError>, GetCommentsResult | undefined]>;
    postComment: (key: string, message: string, client_meta: Vector | FrameOffset) => Promise<[ResultErr<ApiError>, Comment | undefined]>;
    getTeamProjects: (team_id: string) => Promise<[ResultErr<ApiError>, GetTeamProjectsResult | undefined]>;
    getProjectFiles: (project_id: string) => Promise<[ResultErr<ApiError>, GetProjectFilesResult | undefined]>;
    _watchVersion: (key: string, onNewVersion: (newVersion: Version) => void | Promise<void>, opts?: {
        /** in milliseconds */
        timeout: number;
        onError?: ((error: ResultErr<ApiError>, dispose: Disposer) => void) | undefined;
        immediate?: boolean | undefined;
    }) => Disposer;
    _watchComments: (key: string, onNewComments: (newComments: Comment[]) => void | Promise<void>, opts?: {
        /** in milliseconds */
        timeout: number;
        onError?: ((error: ResultErr<ApiError>, dispose: Disposer) => void) | undefined;
        immediate?: boolean | undefined;
    }) => Disposer;
}
export declare function oAuthLink(client_id: string, redirect_uri: string, scope: 'file_read', state: string, response_type: 'code'): string;
export declare function oAuthToken(client_id: string, client_secret: string, redirect_uri: string, code: string, grant_type: 'authorization_code'): ResultA<{
    access_token: string;
    expires_in: number;
}, ApiError>;
