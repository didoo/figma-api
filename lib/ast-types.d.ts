/** An RGBA color */
export declare type Color = {
    /** Red channel value, between 0 and 1 */
    r: number;
    /** Green channel value, between 0 and 1 */
    g: number;
    /** Blue channel value, between 0 and 1 */
    b: number;
    /** Alpha channel value, between 0 and 1 */
    a: number;
};
/** Format and size to export an asset at */
export declare type ExportSetting = {
    /** File suffix to append to all filenames */
    suffix: string;
    /** Image type, string enum that supports values "JPG", "PNG", and "SVG" */
    format: 'JPG' | 'PNG' | 'SVG';
    /** Constraint that determines sizing of exported asset */
    constraint: Constrain;
};
/** Sizing constraint for exports */
export declare type Constrain = {
    /**
     * Type of constraint to apply; string enum with potential values below
     * "SCALE": Scale by value
     * "WIDTH": Scale proportionally and set width to value
     * "HEIGHT": Scale proportionally and set height to value
     */
    type: 'SCALE' | 'WIDTH' | 'HEIGHT';
    /** See type property for effect of this field */
    value: number;
};
/** A rectangle that expresses a bounding box in absolute coordinates */
export declare type Rectangle = {
    /** X coordinate of top left corner of the rectangle */
    x: number;
    /** Y coordinate of top left corner of the rectangle */
    y: number;
    /** Width of the rectangle */
    width: number;
    /** Height of the rectangle */
    height: number;
};
/**
 * This type is a string enum with the following possible values
 * Normal blends:
 * "PASS_THROUGH" (Only applicable to objects with children)
 * "NORMAL"
 *
 * Darken:
 * "DARKEN"
 * "MULTIPLY"
 * "LINEAR_BURN"
 * "COLOR_BURN"
 *
 * Lighten:
 * "LIGHTEN"
 * "SCREEN"
 * "LINEAR_DODGE"
 * "COLOR_DODGE"
 *
 * Contrast:
 * "OVERLAY"
 * "SOFT_LIGHT"
 * "HARD_LIGHT"
 *
 * Inversion:
 * "DIFFERENCE"
 * "EXCLUSION"
 *
 * Component:
 * "HUE"
 * "SATURATION"
 * "COLOR"
 * "LUMINOSITY"
 */
export declare type BlendMode = string;
/**
 * Enum describing animation easing curves
 * This type is a string enum with the following possible values
 * "EASE_IN": Ease in with an animation curve similar to CSS ease-in.
 * "EASE_OUT": Ease out with an animation curve similar to CSS ease-out.
 * "EASE_IN_AND_OUT": Ease in and then out with an animation curve similar to CSS ease-in-out.
 */
export declare type EasingType = 'EASE_IN' | 'EASE_OUT' | 'EASE_IN_AND_OUT';
/** Layout constraint relative to containing Frame */
export declare type LayoutConstraint = {
    /**
     * Vertical constraint as an enum
     * "TOP": Node is laid out relative to top of the containing frame
     * "BOTTOM": Node is laid out relative to bottom of the containing frame
     * "CENTER": Node is vertically centered relative to containing frame
     * "TOP_BOTTOM": Both top and bottom of node are constrained relative to containing frame (node stretches with frame)
     * "SCALE": Node scales vertically with containing frame
     */
    vertical: 'TOP' | 'BOTTOM' | 'CENTER' | 'TOP_BOTTOM' | 'SCALE';
    /**
     * Horizontal constraint as an enum
     * "LEFT": Node is laid out relative to left of the containing frame
     * "RIGHT": Node is laid out relative to right of the containing frame
     * "CENTER": Node is horizontally centered relative to containing frame
     * "LEFT_RIGHT": Both left and right of node are constrained relative to containing frame (node stretches with frame)
     * "SCALE": Node scales horizontally with containing frame
     */
    horizontal: 'LEFT' | 'RIGHT' | 'CENTER' | 'LEFT_RIGHT' | 'SCALE';
};
/** Guides to align and place objects within a frame */
export declare type LayoutGrid = {
    /**
     * Orientation of the grid as a string enum
     * "COLUMNS": Vertical grid
     * "ROWS": Horizontal grid
     * "GRID": Square grid
     */
    pattern: 'COLUMNS' | 'ROWS' | 'GRID';
    /** Width of column grid or height of row grid or square grid spacing */
    sectionSize: number;
    /** Is the grid currently visible? */
    visible: boolean;
    /** Color of the grid */
    color: Color;
    /**
     * Positioning of grid as a string enum
     * "MIN": Grid starts at the left or top of the frame
     * "MAX": Grid starts at the right or bottom of the frame
     * "CENTER": Grid is center aligned
     */
    alignment: 'MIN' | 'MAX' | 'CENTER';
    /** Spacing in between columns and rows */
    gutterSize: number;
    /** Spacing before the first column or row */
    offset: number;
    /** Number of columns or rows */
    count: number;
};
/** A visual effect such as a shadow or blur */
export declare type Effect = {
    /**
     * Type of effect as a string enum
     * "INNER_SHADOW"
     * "DROP_SHADOW"
     * "LAYER_BLUR"
     * "BACKGROUND_BLUR"
     */
    type: 'INNER_SHADOW' | 'DROP_SHADOW' | 'LAYER_BLUR' | 'BACKGROUND_BLUR';
    /** Is the effect active? */
    visible: boolean;
    /** Radius of the blur effect (applies to shadows as well) */
    radius: number;
    /** The color of the shadow */
    color: Color;
    /** Blend mode of the shadow */
    blendMode: BlendMode;
    /** How far the shadow is projected in the x and y directions */
    offset: Vector;
};
/** A solid color, gradient, or image texture that can be applied as fills or strokes */
export declare type Paint = {
    /** Type of paint as a string enum */
    type: 'SOLID' | 'GRADIENT_LINEAR' | 'GRADIENT_RADIAL' | 'GRADIENT_ANGULAR' | 'GRADIENT_DIAMOND' | 'IMAGE' | 'EMOJI';
    /** `default: true` Is the paint enabled? */
    visible: boolean;
    /** `default: 1` Overall opacity of paint (colors within the paint can also have opacity values which would blend with this) */
    opacity: number;
    /** Solid color of the paint */
    color: Color;
    /**
     * This field contains three vectors, each of which are a position in normalized object space (normalized object space is if the top left corner of the bounding box of the object is (0, 0) and the bottom right is (1,1)). The first position corresponds to the start of the gradient (value 0 for the purposes of calculating gradient stops), the second position is the end of the gradient (value 1), and the third handle position determines the width of the gradient (only relevant for non-linear gradients).
     */
    gradientHandlePositions: Vector[];
    /**
     * Positions of key points along the gradient axis with the colors anchored there. Colors along the gradient are interpolated smoothly between neighboring gradient stops.
     */
    gradientStops: ColorStop[];
    /** Image scaling mode */
    scaleMode: 'FILL' | 'FIT' | 'TILE' | 'STRETCH';
};
/** A 2d vector */
export declare type Vector = {
    /** X coordinate of the vector */
    x: number;
    /** Y coordinate of the vector */
    y: number;
};
/** A 2x3 2D affine transformation matrix */
export declare type Transform = number[][];
/** A vector path */
export declare type Path = {
    /** A sequence of path commands in SVG notation */
    path: string;
    /** Winding rule for the path, either "EVENODD" or "NONZERO" */
    windingRule: 'EVENODD' | 'NONZERO';
};
/** A relative offset within a frame */
export declare type FrameOffset = {
    /** Unique id specifying the frame */
    node_id: string;
    /** 2d vector offset within the frame */
    node_offset: Vector;
};
/** A position color pair representing a gradient stop */
export declare type ColorStop = {
    /** Value between 0 and 1 representing position along gradient axis */
    position: number;
    /** Color attached to corresponding position */
    color: Color;
};
/** Metadata for character formatting */
export declare type TypeStyle = {
    /** Font family of text (standard name) */
    fontFamily: string;
    /** PostScript font name */
    fontPostScriptName: string;
    /** Is text italicized? */
    italic: boolean;
    /** Numeric font weight */
    fontWeight: number;
    /** Font size in px */
    fontSize: number;
    /** Horizontal text alignment as string enum */
    textAlignHorizontal: 'LEFT' | 'RIGHT' | 'CENTER' | 'JUSTIFIED';
    /** Vertical text alignment as string enum */
    textAlignVertical: 'TOP' | 'CENTER' | 'BOTTOM';
    /** Space between characters in px */
    letterSpacing: number;
    /** Paints applied to characters */
    fills: Paint[];
    /** Line height in px */
    lineHeightPx: number;
    /** Line height as a percentage of normal line height */
    lineHeightPercent: number;
};
export declare type StyleType = 'FILL' | 'TEXT' | 'EFFECT' | 'GRID';
/** A description of a master component. Helps you identify which component instances are attached to */
export interface Component {
    /** The name of the component */
    name: string;
    /** The description of the component as entered in the editor */
    description: string;
}
/** A set of properties that can be applied to nodes and published. Styles for a property can be created in the corresponding property's panel while editing a file */
export interface Style {
    /** The name of the style */
    name: string;
    style_type: StyleType;
}
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
    order_id: number;
}
/** A description of a user */
export interface User {
    /** Name of the user */
    handle: string;
    /** URL link to the user's profile image */
    img_url: string;
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
/** The root node */
export interface DOCUMENT {
    /** An array of canvases attached to the document */
    children: Node[];
}
/** Represents a single page */
export interface CANVAS {
    /** An array of top level layers on the canvas */
    children: Node[];
    /** Background color of the canvas */
    backgroundColor: Color;
    /** default: [] An array of export settings representing images to export from the canvas */
    exportSettings: ExportSetting[];
}
/** A node of fixed size containing other nodes */
export interface FRAME {
    /** An array of nodes that are direct children of this node */
    children: Node[];
    /** Background color of the node */
    backgroundColor: Color;
    /** default: [] An array of export settings representing images to export from node */
    exportSettings: ExportSetting[];
    /** How this node blends with nodes behind it in the scene (see blend mode section for more details) */
    blendMode: BlendMode;
    /** default: false Keep height and width constrained to same ratio */
    preserveRatio: Boolean;
    /** Horizontal and vertical layout constraints for node */
    constraints: LayoutConstraint;
    /** default: null Node ID of node to transition to in prototyping */
    transitionNodeID: string;
    /** default: null The duration of the prototyping transition on this node (in milliseconds). */
    transitionDuration: number;
    /** default: null The easing curve used in the prototyping transition on this node. */
    transitionEasing: EasingType;
    /** default: 1 Opacity of the node */
    opacity: number;
    /** Bounding box of the node in absolute space coordinates */
    absoluteBoundingBox: Rectangle;
    /** Width and height of element. This is different from the width and height of the bounding box in that the absolute bounding box represents the element after scaling and rotation. Only present if geometry=paths is passed */
    size: Vector;
    /** The top two rows of a matrix that represents the 2D transform of this node relative to its parent. The bottom row of the matrix is implicitly always (0, 0, 1). Use to transform coordinates in geometry. Only present if geometry=paths is passed */
    relativeTransform: Transform;
    /** Does this node clip content outside of its bounds? */
    clipsContent: Boolean;
    /** default: [] An array of layout grids attached to this node (see layout grids section for more details). GROUP nodes do not have this attribute */
    layoutGrids: LayoutGrid[];
    /** default: [] An array of effects attached to this node (see effects section for more details) */
    effects: Effect[];
    /** default: false Does this node mask sibling nodes in front of it? */
    isMask: Boolean;
}
/** A logical grouping of nodes */
export interface GROUP {
}
/** A vector network, consisting of vertices and edges */
export interface VECTOR {
    /** default: [] An array of export settings representing images to export from node */
    exportSettings: ExportSetting[];
    /** How this node blends with nodes behind it in the scene (see blend mode section for more details) */
    blendMode: BlendMode;
    /** default: false Keep height and width constrained to same ratio */
    preserveRatio: Boolean;
    /** Horizontal and vertical layout constraints for node */
    constraints: LayoutConstraint;
    /** default: null Node ID of node to transition to in prototyping */
    transitionNodeID: string;
    /** default: null The duration of the prototyping transition on this node (in milliseconds). */
    transitionDuration: number;
    /** default: null The easing curve used in the prototyping transition on this node. */
    transitionEasing: EasingType;
    /** default: 1 Opacity of the node */
    opacity: number;
    /** Bounding box of the node in absolute space coordinates */
    absoluteBoundingBox: Rectangle;
    /** Width and height of element. This is different from the width and height of the bounding box in that the absolute bounding box represents the element after scaling and rotation. Only present if geometry=paths is passed */
    size: Vector;
    /** The top two rows of a matrix that represents the 2D transform of this node relative to its parent. The bottom row of the matrix is implicitly always (0, 0, 1). Use to transform coordinates in geometry. Only present if geometry=paths is passed */
    relativeTransform: Transform;
    /** default: [] An array of effects attached to this node (see effects section for more details) */
    effects: Effect[];
    /** default: false Does this node mask sibling nodes in front of it? */
    isMask: Boolean;
    /** default: [] An array of fill paints applied to the node */
    fills: Paint[];
    /** Only specified if parameter geometry=paths is used. An array of paths representing the object fill */
    fillGeometry: Path[];
    /** default: [] An array of stroke paints applied to the node */
    strokes: Paint[];
    /** The weight of strokes on the node */
    strokeWeight: number;
    /** Only specified if parameter geometry=paths is used. An array of paths representing the object stroke */
    strokeGeometry: Path[];
    /** Where stroke is drawn relative to the vector outline as a string enum
    "INSIDE": draw stroke inside the shape boundary
    "OUTSIDE": draw stroke outside the shape boundary
    "CENTER": draw stroke centered along the shape boundary */
    strokeAlign: string;
    /** A mapping of a StyleType to style ID (see Style) of styles present on this node. The style ID can be used to look up more information about the style in the top-level styles field. */
    styles: {
        [styleType in StyleType]: string;
    };
}
/** A group that has a boolean operation applied to it */
export interface BOOLEAN {
    /** An array of nodes that are being boolean operated on */
    children: Node[];
}
/** A regular star shape */
export interface STAR {
}
/** A straight line */
export interface LINE {
}
/** An ellipse */
export interface ELLIPSE {
}
/** A regular n-sided polygon */
export interface REGULAR_POLYGON {
}
/** A rectangle */
export interface RECTANGLE {
    /** Radius of each corner of the rectangle */
    cornerRadius: number;
}
/** A text box */
export interface TEXT {
    /** Text contained within text box */
    characters: string;
    /** Style of text including font family and weight (see type style section for more information) */
    style: TypeStyle;
    /** Array with same number of elements as characeters in text box, each element is a reference to the styleOverrideTable defined below and maps to the corresponding character in the characters field. Elements with value 0 have the default type style */
    characterStyleOverrides: number[];
    /** Map from ID to TypeStyle for looking up style overrides */
    styleOverrideTable: {
        [mapId: number]: TypeStyle;
    };
}
/** A rectangular region of the canvas that can be exported */
export interface SLICE {
    /** An array of export settings representing images to export from this node */
    exportSettings: ExportSetting[];
    /** Bounding box of the node in absolute space coordinates */
    absoluteBoundingBox: Rectangle;
    /** Width and height of element. This is different from the width and height of the bounding box in that the absolute bounding box represents the element after scaling and rotation. Only present if geometry=paths is passed */
    size: Vector;
    /** The top two rows of a matrix that represents the 2D transform of this node relative to its parent. The bottom row of the matrix is implicitly always (0, 0, 1). Use to transform coordinates in geometry. Only present if geometry=paths is passed */
    relativeTransform: Transform;
}
/** A node that can have instances created of it that share the same properties */
export interface COMPONENT {
}
/** An instance of a component, changes to the component result in the same changes applied to the instance */
export interface INSTANCE {
    /** ID of component that this instance came from, refers to components table (see endpoints section below) */
    componentId: string;
}
export declare type NodeTypes = {
    /** The root node */
    DOCUMENT: DOCUMENT;
    /** Represents a single page */
    CANVAS: CANVAS;
    /** A node of fixed size containing other nodes */
    FRAME: FRAME;
    /** A logical grouping of nodes */
    GROUP: GROUP;
    /** A vector network, consisting of vertices and edges */
    VECTOR: VECTOR;
    /** A group that has a boolean operation applied to it */
    BOOLEAN: BOOLEAN;
    /** A regular star shape */
    STAR: STAR;
    /** A straight line */
    LINE: LINE;
    /** An ellipse */
    ELLIPSE: ELLIPSE;
    /** A regular n-sided polygon */
    REGULAR_POLYGON: REGULAR_POLYGON;
    /** A rectangle */
    RECTANGLE: RECTANGLE;
    /** A text box */
    TEXT: TEXT;
    /** A rectangular region of the canvas that can be exported */
    SLICE: SLICE;
    /** A node that can have instances created of it that share the same properties */
    COMPONENT: COMPONENT;
    /** An instance of a component, changes to the component result in the same changes applied to the instance */
    INSTANCE: INSTANCE;
};
export declare type NodeType = keyof NodeTypes;
export declare type Node<NType extends NodeType = NodeType> = {
    id: string;
    name: string;
    visible: boolean;
    type: NType;
} & NodeTypes[NType];
export declare function isNodeType<NType extends NodeType, R = Node<NType>>(node: Node<any>, type: NType): node is R;
