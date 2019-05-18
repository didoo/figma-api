import { Vector, FrameOffset, Component, Style, Node, FrameInfo, PageInfo, StyleType } from "./ast-types";
/** A comment or reply left by a user */
export interface Comment {
    /** Unique identifier for comment */
    id: string;
    /** The position of the comment. Either the absolute coordinates on the canvas or a relative offset within a frame */
    client_meta: Vector | FrameOffset;
    /** The file in which the comment lives */
    file_key: string;
    /** If present, the id of the comment to which this is the reply */
    parent_id: string;
    /** The user who left the comment */
    user: User;
    /** The UTC ISO 8601 time at which the comment was left */
    created_at: string;
    /** If set, the UTC ISO 8601 time the comment was resolved */
    resolved_at: string;
    /** Only set for top level comments. The number displayed with the comment in the UI */
    order_id?: number;
    /** Comment message */
    message: string;
}
/** A description of a user */
export interface User {
    /** Unique stable id of the user */
    id: string;
    /** Name of the user */
    handle: string;
    /** URL link to the user's profile image */
    img_url: string;
    /** Email associated with the user's account. This will only be present on the /v1/me endpoint */
    email?: string;
}
/** A version of a file */
export interface Version {
    /** Unique identifier for version */
    id: string;
    /** The UTC ISO 8601 time at which the version was created */
    created_at: string;
    /** The label given to the version in the editor */
    label: string;
    /** The description of the version as entered in the editor */
    description: string;
    /** The user that created the version */
    user: User;
}
/** A Project can be identified by both the Project name, and the ProjectID. */
export interface Project {
    /** The ID of the project */
    id: number;
    /** The name of the project */
    name: string;
}
export interface ProjectFile {
    key: string;
    name: string;
    thumbnail_url: string;
    last_modified: string;
}
/** An arrangement of published UI elements that can be instantiated across figma files */
export interface ComponentMetadata {
    /** The key of the component */
    key: string;
    /** The unique identifier of the figma file which contains the component */
    file_key: string;
    /** Id of the component node within the figma file */
    node_id: string;
    /** URL link to the component's thumbnail image */
    thumbnail_url: string;
    /** The name of the component */
    name: string;
    /** The description of the component as entered in the editor */
    description: string;
    /** The UTC ISO 8601 time at which the component was created */
    created_at: string;
    /** The UTC ISO 8601 time at which the component was updated */
    updated_at: string;
    /** The user who last updated the component */
    user: User;
    /** Data on component's containing frame, if component resides within a frame */
    containing_frame?: FrameInfo;
    /** Data on component's containing page, if component resides in a multi-page file */
    containing_page?: PageInfo;
}
export interface StyleMetadata {
    key: string;
    file_key: string;
    node_id: string;
    style_type: StyleType;
    thumbnail_url: string;
    name: string;
    description: string;
    updated_at: string;
    created_at: string;
    sort_position: string;
    user: User;
}
export interface GetCommentsResult {
    comments: Comment[];
}
export interface PostCommentResult extends Comment {
}
export interface GetFileResult {
    name: string;
    lastModified: string;
    thumbnailURL: string;
    version: string;
    document: Node<'DOCUMENT'>;
    components: {
        [nodeId: string]: Component;
    };
    schemaVersion: number;
    styles: {
        [styleName: string]: Style;
    };
}
/** The `name`, `lastModified`, `thumbnailURL`, and `version` attributes are all metadata of the specified file. */
export interface GetFileNodesResult {
    name: string;
    lastModified: string;
    thumbnailURL: string;
    version: string;
    err?: string;
    nodes: {
        [nodeId: string]: {
            document: Node<'DOCUMENT'>;
            components: {
                [nodeId: string]: Component;
            };
            schemaVersion: number;
            styles: {
                [styleName: string]: Style;
            };
        } | null;
    };
}
export interface GetImageResult {
    err?: string;
    /** { nodeId -> rendered image url } */
    images: {
        [nodeId: string]: string | null;
    };
    status?: number;
}
export interface GetImageFillsResult {
    err?: string;
    /** { nodeId -> rendered image url } */
    images: {
        [imageRef: string]: string | null;
    };
    meta?: {
        images: {
            [imageRef: string]: string | null;
        };
    };
    status?: number;
}
export interface GetVersionsResult {
    versions: Version[];
}
export interface GetTeamProjectsResult {
    projects: Project[];
}
export interface GetProjectFilesResult {
    files: ProjectFile[];
}
export interface GetTeamComponentsResult {
    components: ComponentMetadata[];
    cursor: {
        [x: string]: number;
    };
}
export interface GetTeamStylesResult {
    styles: StyleMetadata[];
    cursor: {
        [x: string]: number;
    };
}
export interface GetUserMeResult extends User {
}
export interface GetComponentResult extends ComponentMetadata {
}
export interface GetStyleResult extends StyleMetadata {
}
