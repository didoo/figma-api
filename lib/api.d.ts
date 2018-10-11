import { Node, Style, Component, Version, Comment, Vector, FrameOffset } from './ast-types';
import { AxiosResponse } from 'axios';
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
    } | undefined) => Promise<any>;
    getFile: (key: string, opts?: {
        /** A specific version ID to get. Omitting this will get the current version of the file */
        version?: string | undefined;
        /** Set to "paths" to export vector data */
        geometry?: string | undefined;
    } | undefined) => Promise<GetFileResult>;
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
    }) => Promise<GetImageResult>;
    getVersions: (key: string) => Promise<GetVersionsResult>;
    getComments: (key: string) => Promise<GetCommentsResult>;
    postComment: (key: string, message: string, client_meta: Vector | FrameOffset) => Promise<Comment>;
    getTeamProjects: (team_id: string) => Promise<GetTeamProjectsResult>;
    getProjectFiles: (project_id: string) => Promise<GetProjectFilesResult>;
}
export declare function oAuthLink(client_id: string, redirect_uri: string, scope: 'file_read', state: string, response_type: 'code'): string;
export declare function oAuthToken(client_id: string, client_secret: string, redirect_uri: string, code: string, grant_type: 'authorization_code'): Promise<{
    access_token: string;
    expires_in: number;
}>;
