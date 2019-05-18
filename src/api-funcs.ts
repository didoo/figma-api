import { API_DOMAIN, API_VER } from "./config";
import { Vector, FrameOffset } from "./ast-types";
import { GetFileNodesResult, GetImageResult, GetImageFillsResult, GetFileResult, GetCommentsResult, PostCommentResult, GetUserMeResult, GetVersionsResult, GetTeamProjectsResult, GetProjectFilesResult, GetTeamComponentsResult, ComponentMetadata, GetTeamStylesResult, StyleMetadata, GetComponentResult, GetStyleResult } from "./api-types";
import { ApiRequestMethod, toQueryParams } from "./utils";

type ApiClass = {
    request: ApiRequestMethod
};

export function getFileApi(this: ApiClass,
    /**
     * File to export JSON from
     * 
     * Can be found in url to file, eg:  
     * https://www.figma.com/file/FILE_KEY/FILE_NAME
     */
    fileKey: string,
    opts?: {
        /** A specific version ID to get. Omitting this will get the current version of the file */
        version?: string,
        /** Set to "paths" to export vector data */
        geometry?: 'paths',
    }
): Promise<GetFileResult> {
    const queryParams = toQueryParams(opts);
    return this.request<GetFileResult>(`${API_DOMAIN}/${API_VER}/files/${fileKey}?${queryParams}`);
}

export function getFileNodesApi(this: ApiClass,
    /**
     * File to export JSON from
     * 
     * Can be found in url to file, eg:  
     * https://www.figma.com/file/FILE_KEY/FILE_NAME
     */
    fileKey: string,
    /** list of node IDs to retrieve and convert */
    ids: string[],
    opts?: {
        /** A specific version ID to get. Omitting this will get the current version of the file */
        version?: string,
        /** Set to "paths" to export vector data */
        geometry?: 'paths',
    }
): Promise<GetFileNodesResult> {
    const queryParams = toQueryParams({ ...opts, ids: ids.join(',') });
    return this.request<GetFileNodesResult>(`${API_DOMAIN}/${API_VER}/files/${fileKey}/nodes?${queryParams}`);
}

export function getImageApi(this: ApiClass,
    fileKey: string,
    opts: {
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
    }
): Promise<GetImageResult> {
    const queryParams = toQueryParams(opts);
    return this.request<GetImageResult>(`${API_DOMAIN}/${API_VER}/images/${fileKey}?${queryParams}`);
}

export function getImageFillsApi(this: ApiClass, fileKey: string): Promise<GetImageFillsResult> {
    return this.request<GetImageFillsResult>(`${API_DOMAIN}/${API_VER}/files/${fileKey}/images`);
}

export function getCommentsApi(this: ApiClass, fileKey: string): Promise<GetCommentsResult> {
    return this.request<GetCommentsResult>(`${API_DOMAIN}/${API_VER}/files/${fileKey}/comments`);
}

export function postCommentsApi(
    this: ApiClass,
    fileKey: string,
    message: string,
    client_meta: Vector|FrameOffset
): Promise<PostCommentResult> {
    const body = {
        message,
        client_meta,
    };

    return this.request<PostCommentResult>(`${API_DOMAIN}/${API_VER}/files/${fileKey}/comments`, {
        method: 'POST',
        data: JSON.stringify(body),
    });
}

export function getUserMeApi(this: ApiClass): Promise<GetUserMeResult> {
    return this.request(`${API_DOMAIN}/${API_VER}/me`);
}

export function getVersionsApi(this: ApiClass, fileKey: string): Promise<GetVersionsResult> {
    return this.request(`${API_DOMAIN}/${API_VER}/files/${fileKey}/versions`);
}

export function getTeamProjectsApi(this: ApiClass, team_id: string): Promise<GetTeamProjectsResult> {
    return this.request(`${API_DOMAIN}/${API_VER}/teams/${team_id}/projects`);
}

export function getProjectFilesApi(this: ApiClass, project_id: string): Promise<GetProjectFilesResult> {
    return this.request(`${API_DOMAIN}/${API_VER}/projects/${project_id}/files`);
}

/** Get a paginated list of published components within a team library */
export function getTeamComponentsApi(
    this: ApiClass,
    team_id: string,
    opts: {
        /** Number of items in a paged list of results. Defaults to 30. */
        page_size?: number,
        /** A map that indicates the starting/ending point from which objects are returned. The cursor value is an internally tracked integer that doesn't correspond to any Ids */
        cursor?: { [x: string]: number },
    } = {}
): Promise<GetTeamComponentsResult> {
    const queryParams = toQueryParams(opts);
    return this.request(`${API_DOMAIN}/${API_VER}/teams/${team_id}/components?${queryParams}`);
}

/** Get metadata on a component by key. */
export function getComponentApi(this: ApiClass, componentKey: string): Promise<GetComponentResult> {
    return this.request(`${API_DOMAIN}/${API_VER}/components/${componentKey}`);
}

export function getTeamStylesApi(
    this: ApiClass,
    team_id: string,
    opts: {
        /** Number of items in a paged list of results. Defaults to 30. */
        page_size?: number,
        /** A map that indicates the starting/ending point from which objects are returned. The cursor value is an internally tracked integer that doesn't correspond to any Ids */
        cursor?: { [x: string]: number },
    } = {}
): Promise<GetTeamStylesResult> {
    const queryParams = toQueryParams(opts);
    return this.request(`${API_DOMAIN}/${API_VER}/teams/${team_id}/styles?${queryParams}`);
}

export function getStyleApi(
    this: ApiClass,
    /** The unique identifier of the style */
    styleKey: string,
): Promise<GetStyleResult> {
    return this.request(`${API_DOMAIN}/${API_VER}/styles/${styleKey}`);
}