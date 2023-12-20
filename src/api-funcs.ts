import { API_DOMAIN, API_VER } from './config';
import { Vector, FrameOffset, Region, FrameOffsetRegion } from './ast-types';
import {
  GetFileResult,
  GetFileNodesResult,
  GetImageResult,
  GetImageFillsResult,
  GetCommentsResult,
  PostCommentResult,
  DeleteCommentsResult,
  GetUserMeResult,
  GetVersionsResult,
  GetTeamProjectsResult,
  GetProjectFilesResult,
  GetTeamComponentsResult,
  GetFileComponentsResult,
  GetComponentResult,
  GetTeamComponentSetsResult,
  GetFileComponentSetsResult,
  GetComponentSetResult,
  GetTeamStylesResult,
  GetFileStylesResult,
  GetStyleResult,
} from './api-types';
import { ApiRequestMethod, toQueryParams } from './utils';

type ApiClass = {
  request: ApiRequestMethod;
};

// FIGMA FILES
// -----------------------------------------------------------------

export function getFileApi(
  this: ApiClass,
  /**
   * File to export JSON from
   *
   * Can be found in url to file, eg:
   * https://www.figma.com/file/FILE_KEY/FILE_NAME
   */
  fileKey: string,
  opts?: {
    /** A specific version ID to get. Omitting this will get the current version of the file */
    version?: string;
    /** If specified, only a subset of the document will be returned corresponding to the nodes listed, their children, and everything between the root node and the listed nodes */
    ids?: string[];
    /** Positive integer representing how deep into the document tree to traverse. For example, setting this to 1 returns only Pages, setting it to 2 returns Pages and all top level objects on each page. Not setting this parameter returns all nodes */
    depth?: number;
    /** Set to "paths" to export vector data */
    geometry?: 'paths';
    /** A comma separated list of plugin IDs and/or the string "shared". Any data present in the document written by those plugins will be included in the result in the `pluginData` and `sharedPluginData` properties. */
    plugin_data?: string;
    /** Set to returns branch metadata for the requested file */
    branch_data?: boolean;
  },
): Promise<GetFileResult> {
  const queryParams = toQueryParams({
    ...opts,
    ids: opts && opts.ids && opts.ids.join(','),
  });
  return this.request<GetFileResult>(
    `${API_DOMAIN}/${API_VER}/files/${fileKey}?${queryParams}`,
  );
}

export function getFileNodesApi(
  this: ApiClass,
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
    version?: string;
    /** Positive integer representing how deep into the document tree to traverse. For example, setting this to 1 returns only Pages, setting it to 2 returns Pages and all top level objects on each page. Not setting this parameter returns all nodes */
    depth?: number;
    /** Set to "paths" to export vector data */
    geometry?: 'paths';
    /** A comma separated list of plugin IDs and/or the string "shared". Any data present in the document written by those plugins will be included in the result in the `pluginData` and `sharedPluginData` properties. */
    plugin_data?: string;
  },
): Promise<GetFileNodesResult> {
  const queryParams = toQueryParams({ ...opts, ids: ids.join(',') });
  return this.request<GetFileNodesResult>(
    `${API_DOMAIN}/${API_VER}/files/${fileKey}/nodes?${queryParams}`,
  );
}

export function getImageApi(
  this: ApiClass,
  fileKey: string,
  opts: {
    /** A comma separated list of node IDs to render */
    ids: string;
    /** A number between 0.01 and 4, the image scaling factor */
    scale: number;
    /** A string enum for the image output format */
    format: 'jpg' | 'png' | 'svg' | 'pdf';
    /** Whether to include id attributes for all SVG elements. `Default: false` */
    svg_include_id?: boolean;
    /** Whether to simplify inside/outside strokes and use stroke attribute if possible instead of <mask>. `Default: true` */
    svg_simplify_stroke?: boolean;
    /** Use the full dimensions of the node regardless of whether or not it is cropped or the space around it is empty. Use this to export text nodes without cropping. `Default: false` */
    use_absolute_bounds?: boolean;
    /** A specific version ID to get. Omitting this will get the current version of the file */
    version?: string;
  },
): Promise<GetImageResult> {
  const queryParams = toQueryParams(opts);
  return this.request<GetImageResult>(
    `${API_DOMAIN}/${API_VER}/images/${fileKey}?${queryParams}`,
  );
}

export function getImageFillsApi(
  this: ApiClass,
  fileKey: string,
): Promise<GetImageFillsResult> {
  return this.request<GetImageFillsResult>(
    `${API_DOMAIN}/${API_VER}/files/${fileKey}/images`,
  );
}

// COMMENTS
// -----------------------------------------------------------------

export function getCommentsApi(
  this: ApiClass,
  fileKey: string,
): Promise<GetCommentsResult> {
  return this.request<GetCommentsResult>(
    `${API_DOMAIN}/${API_VER}/files/${fileKey}/comments`,
  );
}

export function postCommentsApi(
  this: ApiClass,
  fileKey: string,
  /** The text contents of the comment to post */
  message: string,
  /** The position of where to place the comment. This can either be an absolute canvas position or the relative position within a frame. */
  client_meta: Vector | FrameOffset | Region | FrameOffsetRegion,
  /** (Optional) The comment to reply to, if any. This must be a root comment, that is, you cannot reply to a comment that is a reply itself (a reply has a parent_id). */
  comment_id?: string,
): Promise<PostCommentResult> {
  const body: any = comment_id
    ? { message, client_meta, comment_id }
    : { message, client_meta };

  /** Notice: we need to pass a custom 'Content-Type' header (as 'application-json') or the current implementation
   * (see `this.appendHeaders` in api-class.ts) will use the default 'application/x-www-form-urlencoded' content-type */
  return this.request<PostCommentResult>(
    `${API_DOMAIN}/${API_VER}/files/${fileKey}/comments`,
    {
      method: 'POST',
      data: body,
    },
  );
}

export function deleteCommentsApi(
  this: ApiClass,
  fileKey: string,
  comment_id: string,
): Promise<DeleteCommentsResult> {
  return this.request(
    `${API_DOMAIN}/${API_VER}/files/${fileKey}/comments/${comment_id}`,
    {
      method: 'DELETE',
      data: '',
    },
  );
}

// USERS
// -----------------------------------------------------------------

export function getUserMeApi(this: ApiClass): Promise<GetUserMeResult> {
  return this.request(`${API_DOMAIN}/${API_VER}/me`);
}

// VERSION HISTORY
// -----------------------------------------------------------------

export function getVersionsApi(
  this: ApiClass,
  fileKey: string,
): Promise<GetVersionsResult> {
  return this.request(`${API_DOMAIN}/${API_VER}/files/${fileKey}/versions`);
}

// PROJECTS
// -----------------------------------------------------------------

export function getTeamProjectsApi(
  this: ApiClass,
  team_id: string,
): Promise<GetTeamProjectsResult> {
  return this.request(`${API_DOMAIN}/${API_VER}/teams/${team_id}/projects`);
}

export function getProjectFilesApi(
  this: ApiClass,
  project_id: string,
  opts?: {
    /** Set to returns branch metadata for the requested file */
    branch_data?: boolean;
  },
): Promise<GetProjectFilesResult> {
  const queryParams = toQueryParams(opts);
  return this.request(
    `${API_DOMAIN}/${API_VER}/projects/${project_id}/files?${queryParams}`,
  );
}

// COMPONENTS AND STYLES
// -----------------------------------------------------------------

/** Get a paginated list of published components within a team library */
export function getTeamComponentsApi(
  this: ApiClass,
  /** Id of the team to list components from */
  team_id: string,
  opts: {
    /** Number of items in a paged list of results. Defaults to 30. */
    page_size?: number;
    /** Cursor indicating which id after which to start retrieving components for. Exclusive with before. The cursor value is an internally tracked integer that doesn't correspond to any Ids */
    after?: number;
    /** Cursor indicating which id before which to start retrieving components for. Exclusive with after. The cursor value is an internally tracked integer that doesn't correspond to any Ids */
    before?: number;
  } = {},
): Promise<GetTeamComponentsResult> {
  const queryParams = toQueryParams(opts);
  return this.request(
    `${API_DOMAIN}/${API_VER}/teams/${team_id}/components?${queryParams}`,
  );
}

export function getFileComponentsApi(
  this: ApiClass,
  fileKey: string,
): Promise<GetFileComponentsResult> {
  return this.request(`${API_DOMAIN}/${API_VER}/files/${fileKey}/components`);
}

/** Get metadata on a component by key. */
export function getComponentApi(
  this: ApiClass,
  /** The unique identifier of the component. */
  key: string,
): Promise<GetComponentResult> {
  return this.request(`${API_DOMAIN}/${API_VER}/components/${key}`);
}

export function getTeamComponentSetsApi(
  this: ApiClass,
  /** Id of the team to list component_sets from */
  team_id: string,
  opts: {
    /** Number of items in a paged list of results. Defaults to 30. */
    page_size?: number;
    /** Cursor indicating which id after which to start retrieving components for. Exclusive with before. The cursor value is an internally tracked integer that doesn't correspond to any Ids */
    after?: number;
    /** Cursor indicating which id before which to start retrieving components for. Exclusive with after. The cursor value is an internally tracked integer that doesn't correspond to any Ids */
    before?: number;
  } = {},
): Promise<GetTeamComponentSetsResult> {
  const queryParams = toQueryParams(opts);
  return this.request(
    `${API_DOMAIN}/${API_VER}/teams/${team_id}/component_sets?${queryParams}`,
  );
}

export function getFileComponentSetsApi(
  this: ApiClass,
  file_key: string,
): Promise<GetFileComponentSetsResult> {
  return this.request(
    `${API_DOMAIN}/${API_VER}/files/${file_key}/component_sets`,
  );
}

export function getComponentSetApi(
  this: ApiClass,
  /** The unique identifier of the component_set */
  key: string,
): Promise<GetComponentSetResult> {
  return this.request(`${API_DOMAIN}/${API_VER}/component_sets/${key}`);
}

export function getTeamStylesApi(
  this: ApiClass,
  team_id: string,
  opts: {
    /** Number of items in a paged list of results. Defaults to 30. */
    page_size?: number;
    /** Cursor indicating which id after which to start retrieving components for. Exclusive with before. The cursor value is an internally tracked integer that doesn't correspond to any Ids */
    after?: number;
    /** Cursor indicating which id before which to start retrieving components for. Exclusive with after. The cursor value is an internally tracked integer that doesn't correspond to any Ids */
    before?: number;
  } = {},
): Promise<GetTeamStylesResult> {
  const queryParams = toQueryParams(opts);
  return this.request(
    `${API_DOMAIN}/${API_VER}/teams/${team_id}/styles?${queryParams}`,
  );
}

export function getFileStylesApi(
  this: ApiClass,
  file_key: string,
): Promise<GetFileStylesResult> {
  return this.request(`${API_DOMAIN}/${API_VER}/files/${file_key}/styles`);
}

export function getStyleApi(
  this: ApiClass,
  /** The unique identifier of the style */
  key: string,
): Promise<GetStyleResult> {
  return this.request(`${API_DOMAIN}/${API_VER}/styles/${key}`);
}
