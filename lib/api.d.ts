import { Node, Style, Component, Version, Comment, Vector, FrameOffset } from './ast-types';
export declare type GetFileResult = {
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
export declare class Api {
    personalAccessToken?: string;
    oAuthToken?: string;
    constructor(params: {
        personalAccessToken: string;
    } | {
        oAuthToken: string;
    });
    appendHeaders(headers: Headers): void;
    request(url: string, opts?: {
        method: string;
        body: string;
    }): Promise<Response>;
    getFile(key: string, opts?: {
        /** A specific version ID to get. Omitting this will get the current version of the file */
        version?: string;
        /** Set to "paths" to export vector data */
        geometry?: string;
    }): Promise<GetFileResult>;
    getImage(key: string, opts: {
        /** A comma separated list of node IDs to render */
        ids: string;
        /** A number between 0.01 and 4, the image scaling factor */
        scale: number;
        /** A string enum for the image output format */
        format: 'jpg' | 'png' | 'svg';
        /** Whether to include id attributes for all SVG elements. `Default: false` */
        svg_include_id?: boolean;
        /** Whether to simplify inside/outside strokes and use stroke attribute if possible instead of <mask>. `Default: true` */
        svg_simplify_stroke?: boolean;
        /** A specific version ID to get. Omitting this will get the current version of the file */
        version?: string;
    }): Promise<GetImageResult>;
    getVersions(key: string): Promise<GetVersionsResult>;
    getComments(key: string): Promise<GetCommentsResult>;
    postComment(key: string, message: string, client_meta: Vector | FrameOffset): Promise<Comment>;
    getTeamProjects(team_id: string): Promise<GetTeamProjectsResult>;
    getProjectFiles(project_id: string): Promise<GetProjectFilesResult>;
}
export declare function oAuthLink(client_id: string, redirect_uri: string, scope: 'file_read', state: string, response_type: 'code'): Promise<string>;
export declare function oAuthToken(client_id: string, client_secret: string, redirect_uri: string, code: string, grant_type: 'authorization_code'): Promise<{
    access_token: string;
    expires_in: number;
}>;
