import { Vector, FrameOffset, Component, Style, Node, FrameInfo, PageInfo, ContainingStateGroup, StyleType, NodeType } from "./ast-types";

/** A comment or reply left by a user */
export interface Comment {
    /** Unique identifier for comment */
    id: string,
    /** The position of the comment. Either the absolute coordinates on the canvas or a relative offset within a frame */
    client_meta: Vector|FrameOffset,
    /** The file in which the comment lives */
    file_key: string,
    /** If present, the id of the comment to which this is the reply */
    parent_id: string,
    /** The user who left the comment */
    user: User,
    /** The UTC ISO 8601 time at which the comment was left */
    created_at: string,
    /** If set, the UTC ISO 8601 time the comment was resolved */
    resolved_at: string,
    /** Only set for top level comments. The number displayed with the comment in the UI */
    order_id?: number,
    /** Comment message */
    message: string,
}

/** A description of a user */
export interface User {
    /** Unique stable id of the user */
    id: string,
    /** Name of the user */
    handle: string,
    /** URL link to the user's profile image */
    img_url: string,
    /** Email associated with the user's account. This will only be present on the /v1/me endpoint */
    email?: string,
}

/** A version of a file */
export interface Version {
    /** Unique identifier for version */
    id: string,
    /** The UTC ISO 8601 time at which the version was created */
    created_at: string,
    /** The label given to the version in the editor */
    label: string,
    /** The description of the version as entered in the editor */
    description: string,
    /** The user that created the version */
    user: User,
}

/** A Project can be identified by both the Project name, and the ProjectID. */
export interface Project {
    /** The ID of the project */
    id: number,
    /** The name of the project */
    name: string,
}

export interface BaseFile {
    key: string,
    name: string,
    thumbnail_url: string,
    last_modified: string,
}

export interface ProjectFile extends BaseFile {
    branches?: BaseFile[];
}

/** An arrangement of published UI elements that can be instantiated across figma files */
export interface ComponentMetadata {
    /** The unique identifier of the component */
    key: string,
    /** The unique identifier of the figma file which contains the component */
    file_key: string,
    /** Id of the component node within the figma file */
    node_id: string,
    /** URL link to the component's thumbnail image */
    thumbnail_url: string,
    /** The name of the component */
    name: string,
    /** The description of the component as entered in the editor */
    description: string,
    /** The UTC ISO 8601 time at which the component was created */
    created_at: string,
    /** The UTC ISO 8601 time at which the component was updated */
    updated_at: string,
    /** The user who last updated the component */
    user: User,
    /** Data on component's containing frame, if component resides within a frame, plus the optional "containingStateGroup" if is a variant of a component_set */
    containing_frame?: FrameInfo & { containingStateGroup?: ContainingStateGroup },
    /** Data on component's containing page, if component resides in a multi-page file */
    containing_page?: PageInfo,
}

/** A node containing a set of variants of a component */
export interface ComponentSetMetadata {
    /** The unique identifier of the component set */
    key: string,
    /** The unique identifier of the figma file which contains the component set */
    file_key: string,
    /** Id of the component set node within the figma file */
    node_id: string,
    /** URL link to the component set's thumbnail image */
    thumbnail_url: string,
    /** The name of the component set */
    name: string,
    /** The description of the component set as entered in the editor */
    description: string,
    /** The UTC ISO 8601 time at which the component set was created */
    created_at: string,
    /** The UTC ISO 8601 time at which the component set was updated */
    updated_at: string,
    /** The user who last updated the component set */
    user: User,
    /** Data on component set's containing frame, if component resides within a frame */
    containing_frame?: FrameInfo,
    /** Data on component set's containing page, if component resides in a multi-page file */
    containing_page?: PageInfo,
}

export interface StyleMetadata {
    /** The unique identifier of the style */
    key: string,
    /** The unique identifier of the file which contains the style */
    file_key: string,
    /** Id of the style node within the figma file */
    node_id: string,
    /** The type of style */
    style_type: StyleType,
    /** URL link to the style's thumbnail image */
    thumbnail_url: string,
    /** Name of the style */
    name: string,
    /** The description of the style as entered by the publisher */
    description: string,
    /** The UTC ISO 8601 time at which the component set was created */
    created_at: string,
    /** The UTC ISO 8601 time at which the style was updated */
    updated_at: string,
    /** The user who last updated the style */
    sort_position: string,
    /** A user specified order number by which the style can be sorted */
    user: User,
}

// -----------------------------------------------------------------


// FIGMA FILES
// -----------------------------------------------------------------

export interface GetFileResult {
    name: string,
    lastModified: string,
    thumbnailUrl: string,
    version: string,
    document: Node<'DOCUMENT'>,
    components: { [nodeId: string]: Component },
    schemaVersion: number,
    styles: { [styleName: string]: Style },
    mainFileKey?: string;
    branches?: ProjectFile[]
}

/** The `name`, `lastModified`, `thumbnailUrl`, and `version` attributes are all metadata of the specified file. */
export interface GetFileNodesResult<NType extends NodeType = NodeType> {
    name: string,
    lastModified: string,
    thumbnailUrl: string,
    version: string,
    err?: string,
    nodes: {
        [nodeId: string]: {
            document: Node<NType>,
            components: { [nodeId: string]: Component },
            schemaVersion: number,
            styles: { [styleName: string]: Style },
        }|null
    },
}

export interface GetImageResult {
    err?: string,
    /** { nodeId -> rendered image url } */
    images: { [nodeId: string]: string|null },
    status?: number,
};

export interface GetImageFillsResult {
    err?: string,
    /** { nodeId -> rendered image url } */
    images: { [imageRef: string]: string|null },
    meta?: { images: { [imageRef: string]: string|null }, },
    status?: number,
};

// COMMENTS
// -----------------------------------------------------------------

export interface GetCommentsResult {
    comments: Comment[]
}

// This returns the Comment that was successfully posted (see: https://www.figma.com/developers/api#post-comments-endpoint)
export interface PostCommentResult extends Comment { }

// Nothing is returned from this endpoint (see: https://www.figma.com/developers/api#delete-comments-endpoint)
export interface DeleteCommentsResult { }

// USERS
// -----------------------------------------------------------------

export interface GetUserMeResult extends User { }

// VERSION HISTORY
// -----------------------------------------------------------------

export interface GetVersionsResult {
    versions: Version[],
};

// PROJECTS
// -----------------------------------------------------------------

export interface GetTeamProjectsResult {
    projects: Project[],
};

export interface GetProjectFilesResult {
    files: ProjectFile[],
};

// COMPONENTS AND STYLES
// -----------------------------------------------------------------

export interface GetTeamComponentsResult {
    status?: number,
    error?: Boolean,
    meta?: {
        components: ComponentMetadata[],
        cursor: { [x: string]: number },
    },
}

export interface GetFileComponentsResult {
    status?: number,
    error?: Boolean,
    meta?: {
        components: ComponentMetadata[],
    },
}

export interface GetComponentResult {
    status?: number,
    error?: Boolean,
    meta?: ComponentMetadata,
}

export interface GetTeamComponentSetsResult {
    component_sets: ComponentSetMetadata[],
    cursor: { [x: string]: number },
}

export interface GetFileComponentSetsResult {
    status?: number,
    error?: Boolean,
    meta?: {
        component_sets: ComponentSetMetadata[],
        cursor: { [x: string]: number },
    },
}

export interface GetComponentSetResult {
    status?: number,
    error?: Boolean,
    meta?: ComponentSetMetadata,
}

export interface GetTeamStylesResult {
    status?: number,
    error?: Boolean,
    meta?: {
        styles: StyleMetadata[],
        cursor: { [x: string]: number },
    },
}

export interface GetFileStylesResult {
    status?: number,
    error?: Boolean,
    meta?: {
        styles: StyleMetadata[],
    },
}

export interface GetStyleResult {
    status?: number,
    error?: Boolean,
    meta?: StyleMetadata,
}
