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
/** A string enum with value, describing the end caps of vector paths. */
export declare enum StrokeCap {
    NONE = "NONE",
    ROUND = "ROUND",
    SQUARE = "SQUARE",
    LINE_ARROW = "LINE_ARROW",
    TRIANGLE_ARROW = "TRIANGLE_ARROW"
}
/** Where stroke is drawn relative to the vector outline as a string enum */
export declare enum StrokeAlign {
    INSIDE = "INSIDE",
    OUTSIDE = "OUTSIDE",
    CENTER = "CENTER"
}
/** A string enum with value, describing how corners in vector paths are rendered. */
export declare enum StrokeJoin {
    MITER = "MITER",
    BEVEL = "BEVEL",
    ROUND = "ROUND"
}
export declare enum ImageType {
    JPG = "JPG",
    PNG = "PNG",
    SVG = "SVG",
    PDF = "PDF"
}
/** A string enum with value, indicating the type of boolean operation applied */
export declare enum BooleanOperationType {
    UNION = "UNION",
    INTERSECT = "INTERSECT",
    SUBTRACT = "SUBTRACT",
    EXCLUDE = "EXCLUDE"
}
/** Text casing applied to the node, default is the original casing */
export declare enum TextCase {
    ORIGINAL = "ORIGINAL",
    UPPER = "UPPER",
    LOWER = "LOWER",
    TITLE = "TITLE",
    SMALL_CAPS = "SMALL_CAPS",
    SMALL_CAPS_FORCED = "SMALL_CAPS_FORCED"
}
/** Text decoration applied to the node */
export declare enum TextDecoration {
    NONE = "NONE",
    STRIKETHROUGH = "STRIKETHROUGH",
    UNDERLINE = "UNDERLINE"
}
/** Dimensions along which text will auto resize, default is that the text does not auto-resize. */
export declare enum TextAutoResize {
    NONE = "NONE",
    HEIGHT = "HEIGHT",
    WIDTH_AND_HEIGHT = "WIDTH_AND_HEIGHT",
    TRUNCATE = "TRUNCATE"
}
/** The unit of the line height value specified by the user. */
export declare enum LineHeightUnit {
    PIXELS = "PIXELS",
    'FONT_SIZE_%' = "FONT_SIZE_%",
    'INTRINSIC_%' = "INTRINSIC_%"
}
/**
 * Map<StyleType, String>
 * A mapping of a StyleType to style ID (see Style) of styles present on this node. The style ID can be used to look up more information about the style in the top-level styles field.
*/
export declare type StylesMap = {
    [styleType in StyleType]: string;
};
/** Format and size to export an asset at */
export declare type ExportSetting = {
    /** File suffix to append to all filenames */
    suffix: string;
    /** Image type, string enum that supports values "JPG", "PNG", "SVG" and "PDF" */
    format: ImageType;
    /** Constraint that determines sizing of exported asset */
    constraint: Constrain;
};
export declare enum ConstrainType {
    /** Scale by value */
    SCALE = "SCALE",
    /** Scale proportionally and set width to value */
    WIDTH = "WIDTH",
    /** Scale proportionally and set width to value */
    HEIGHT = "HEIGHT"
}
/** Sizing constraint for exports */
export declare type Constrain = {
    /**
     * Type of constraint to apply; string enum with potential values below
     * "SCALE": Scale by value
     * "WIDTH": Scale proportionally and set width to value
     * "HEIGHT": Scale proportionally and set height to value
     */
    type: ConstrainType;
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
export declare enum BlendMode {
    /** (Only applicable to objects with children) */
    PASS_THROUGH = "PASS_THROUGH",
    /** (Only applicable to objects with children) */
    NORMAL = "NORMAL",
    /** Darken */
    DARKEN = "DARKEN",
    MULTIPLY = "MULTIPLY",
    LINEAR_BURN = "LINEAR_BURN",
    COLOR_BURN = "COLOR_BURN",
    /** Lighten */
    LIGHTEN = "LIGHTEN",
    SCREEN = "SCREEN",
    LINEAR_DODGE = "LINEAR_DODGE",
    COLOR_DODGE = "COLOR_DODGE",
    /** Contrast */
    OVERLAY = "OVERLAY",
    SOFT_LIGHT = "SOFT_LIGHT",
    HARD_LIGHT = "HARD_LIGHT",
    /** Inversion */
    DIFFERENCE = "DIFFERENCE",
    EXCLUSION = "EXCLUSION",
    /** Component */
    HUE = "HUE",
    SATURATION = "SATURATION",
    COLOR = "COLOR",
    LUMINOSITY = "LUMINOSITY"
}
/**
 * Enum describing animation easing curves
 * This type is a string enum with the following possible values
 * "EASE_IN": Ease in with an animation curve similar to CSS ease-in.
 * "EASE_OUT": Ease out with an animation curve similar to CSS ease-out.
 * "EASE_IN_AND_OUT": Ease in and then out with an animation curve similar to CSS ease-in-out.
 * "LINEAR": No easing, similar to CSS linear.
 */
export declare enum EasingType {
    /** Ease in with an animation curve similar to CSS ease-in. */
    EASE_IN = "EASE_IN",
    /** Ease out with an animation curve similar to CSS ease-out. */
    EASE_OUT = "EASE_OUT",
    /** Ease in and then out with an animation curve similar to CSS ease-in-out. */
    EASE_IN_AND_OUT = "EASE_IN_AND_OUT",
    /** No easing, similar to CSS linear. */
    LINEAR = "LINEAR"
}
export declare enum LayoutConstraintVertical {
    TOP = "TOP",
    BOTTOM = "BOTTOM",
    CENTER = "CENTER",
    TOP_BOTTOM = "TOP_BOTTOM",
    SCALE = "SCALE"
}
export declare enum LayoutConstraintHorizontal {
    LEFT = "LEFT",
    RIGHT = "RIGHT",
    CENTER = "CENTER",
    LEFT_RIGHT = "LEFT_RIGHT",
    SCALE = "SCALE"
}
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
    vertical: LayoutConstraintVertical;
    /**
     * Horizontal constraint as an enum
     * "LEFT": Node is laid out relative to left of the containing frame
     * "RIGHT": Node is laid out relative to right of the containing frame
     * "CENTER": Node is horizontally centered relative to containing frame
     * "LEFT_RIGHT": Both left and right of node are constrained relative to containing frame (node stretches with frame)
     * "SCALE": Node scales horizontally with containing frame
     */
    horizontal: LayoutConstraintHorizontal;
};
export declare enum LayoutAlign {
    /** Determines if the layer should stretch along the parent’s counter axis. This property is only provided for direct children of auto-layout frames. */
    INHERIT = "INHERIT",
    STRETCH = "STRETCH",
    /** In horizontal auto-layout frames, "MIN" and "MAX" correspond to "TOP" and "BOTTOM". In vertical auto-layout frames, "MIN" and "MAX" correspond to "LEFT" and "RIGHT". */
    MIN = "MIN",
    CENTER = "CENTER",
    MAX = "MAX"
}
export declare enum LayoutGridPattern {
    COLUMNS = "COLUMNS",
    ROWS = "ROWS",
    GRID = "GRID"
}
export declare enum LayoutGridAlignment {
    MIN = "MIN",
    MAX = "MAX",
    CENTER = "CENTER"
}
/** Guides to align and place objects within a frame */
export declare type LayoutGrid = {
    /**
     * Orientation of the grid as a string enum
     * "COLUMNS": Vertical grid
     * "ROWS": Horizontal grid
     * "GRID": Square grid
     */
    pattern: LayoutGridPattern;
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
    alignment: LayoutGridAlignment;
    /** Spacing in between columns and rows */
    gutterSize: number;
    /** Spacing before the first column or row */
    offset: number;
    /** Number of columns or rows */
    count: number;
};
export declare enum AxisSizingMode {
    FIXED = "FIXED",
    AUTO = "AUTO"
}
export declare enum EffectType {
    INNER_SHADOW = "INNER_SHADOW",
    DROP_SHADOW = "DROP_SHADOW",
    LAYER_BLUR = "LAYER_BLUR",
    BACKGROUND_BLUR = "BACKGROUND_BLUR"
}
declare type Effect_ = {
    /** Is the effect active? */
    visible: boolean;
    /** Radius of the blur effect (applies to shadows as well) */
    radius: number;
};
declare type EffectShadow_ = {
    /** The color of the shadow */
    color: Color;
    /** Blend mode of the shadow */
    blendMode: BlendMode;
    /** How far the shadow is projected in the x and y directions */
    offset: Vector;
    /** How far the shadow spreads */
    spread: number;
};
export declare type EffectShadow = {
    type: EffectType.DROP_SHADOW | EffectType.INNER_SHADOW;
} & Effect_ & EffectShadow_;
export declare type EffectBlur = {
    type: EffectType.BACKGROUND_BLUR | EffectType.LAYER_BLUR;
} & Effect_;
/** A visual effect such as a shadow or blur */
export declare type Effect = {
    type: EffectType;
} & Effect_ & Partial<EffectShadow_>;
export declare function isEffectShadow(effect: Effect): effect is EffectShadow;
export declare function isEffectBlur(effect: Effect): effect is EffectBlur;
export declare type Hyperlink = {
    /** Type of hyperlink */
    type: 'URL' | 'NODE';
    /** URL being linked to, if URL type */
    url: string;
    /** ID of frame hyperlink points to, if NODE type */
    nodeID: string;
};
export declare enum PaintType {
    SOLID = "SOLID",
    GRADIENT_LINEAR = "GRADIENT_LINEAR",
    GRADIENT_RADIAL = "GRADIENT_RADIAL",
    GRADIENT_ANGULAR = "GRADIENT_ANGULAR",
    GRADIENT_DIAMOND = "GRADIENT_DIAMOND",
    IMAGE = "IMAGE",
    EMOJI = "EMOJI"
}
export declare enum PaintSolidScaleMode {
    FILL = "FILL",
    FIT = "FIT",
    TILE = "TILE",
    STRETCH = "STRETCH"
}
export declare type Paint_ = {
    /** `default: true` Is the paint enabled? */
    visible?: boolean;
    /** `default: 1` Overall opacity of paint (colors within the paint can also have opacity values which would blend with this) */
    opacity?: number;
};
declare type PaintSolid_ = {
    /** Solid color of the paint */
    color: Color;
};
declare type PaintGradient_ = {
    /**
     * How this node blends with nodes behind it in the scene (see blend mode section for more details)
     */
    blendMode: BlendMode;
    /**
     * This field contains three vectors, each of which are a position in normalized object space (normalized object space is if the top left corner of the bounding box of the object is (0, 0) and the bottom right is (1,1)). The first position corresponds to the start of the gradient (value 0 for the purposes of calculating gradient stops), the second position is the end of the gradient (value 1), and the third handle position determines the width of the gradient (only relevant for non-linear gradients).
     */
    gradientHandlePositions: Vector[];
    /**
     * Positions of key points along the gradient axis with the colors anchored there. Colors along the gradient are interpolated smoothly between neighboring gradient stops.
     */
    gradientStops: ColorStop[];
};
declare type PaintImage_ = {
    /** Image scaling mode */
    scaleMode: PaintSolidScaleMode;
    /** Image reference, get it with `Api.getImage` */
    imageRef: string;
    /** Affine transform applied to the image, only present if scaleMode is STRETCH */
    imageTransform?: Transform;
    /** Amount image is scaled by in tiling, only present if scaleMode is TILE */
    scalingFactor?: number;
    /** Image rotation, in degrees. */
    rotation: number;
    /** A reference to the GIF embedded in this node, if the image is a GIF. To download the image using this reference, use the GET file images endpoint to retrieve the mapping from image references to image URLs */
    gifRef: string;
};
export declare type PaintSolid = {
    type: PaintType.SOLID;
} & PaintSolid_ & Paint_;
export declare type PaintGradient = {
    type: PaintType.GRADIENT_ANGULAR | PaintType.GRADIENT_DIAMOND | PaintType.GRADIENT_LINEAR | PaintType.GRADIENT_RADIAL;
} & PaintGradient_ & Paint_;
export declare type PaintImage = {
    type: PaintType.IMAGE;
} & PaintImage_ & Paint_;
/** A solid color, gradient, or image texture that can be applied as fills or strokes */
export declare type Paint = {
    type: PaintType;
} & Paint_ & Partial<PaintSolid_> & Partial<PaintGradient_> & Partial<PaintImage_>;
export declare function isPaintSolid(paint: Paint): paint is PaintSolid;
export declare function isPaintGradient(paint: Paint): paint is PaintGradient;
export declare function isPaintImage(paint: Paint): paint is PaintImage;
/** A 2d vector */
export declare type Vector = {
    /** X coordinate of the vector */
    x: number;
    /** Y coordinate of the vector */
    y: number;
};
/** A 2x3 2D affine transformation matrix */
export declare type Transform = [[number, number, number], [number, number, number]];
export declare enum PathWindingRule {
    EVENODD = "EVENODD",
    NONZERO = "NONZERO"
}
/** A vector svg path */
export declare type Path = {
    /** A sequence of path commands in SVG notation */
    path: string;
    /** Winding rule for the path, either "EVENODD" or "NONZERO" */
    windingRule: PathWindingRule;
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
    /** Space between paragraphs in px, 0 if not present */
    paragraphSpacing?: number;
    /** Paragraph indentation in px, 0 if not present */
    paragraphIndent?: number;
    /** Is text italicized? */
    italic: boolean;
    /** Numeric font weight */
    fontWeight: number;
    /** Font size in px */
    fontSize: number;
    /** Text casing applied to the node, default is the `ORIGINAL` casing */
    textCase?: TextCase;
    /** Text decoration applied to the node, default is `NONE` */
    textDecoration?: TextDecoration;
    /** Dimensions along which text will auto resize, default is that the text does not auto-resize. Default is `NONE` */
    textAutoResize?: TextAutoResize;
    /** Horizontal text alignment as string enum */
    textAlignHorizontal: 'LEFT' | 'RIGHT' | 'CENTER' | 'JUSTIFIED';
    /** Vertical text alignment as string enum */
    textAlignVertical: 'TOP' | 'CENTER' | 'BOTTOM';
    /** Space between characters in px */
    letterSpacing: number;
    /** Paints applied to characters */
    fills: Paint[];
    /** Link to a URL or frame */
    hyperlink: Hyperlink;
    /** A map of OpenType feature flags to 1 or 0, 1 if it is enabled and 0 if it is disabled. Note that some flags aren't reflected here. For example, SMCP (small caps) is still represented by the textCase field. */
    opentypeFlags: {
        [flag: string]: number;
    };
    /** Line height in px */
    lineHeightPx: number;
    /** @deprecated Line height as a percentage of normal line height. This is deprecated; in a future version of the API only lineHeightPx and lineHeightPercentFontSize will be returned. */
    lineHeightPercent?: number;
    /** Line height as a percentage of the font size. Only returned when lineHeightPercent is not 100 */
    lineHeightPercentFontSize?: number;
    /** The unit of the line height value specified by the user. */
    lineHeightUnit: LineHeightUnit;
};
export declare type StyleType = 'FILL' | 'TEXT' | 'EFFECT' | 'GRID';
/** Data on the frame a component resides in */
export interface FrameInfo {
    /** Id of the frame node within the figma file */
    nodeId: string;
    /** Name of the frame */
    name: string;
    /** Background color of the frame */
    backgroundColor: string;
    /** Id of the frame's residing page */
    pageId: string;
    /** Name of the frame's residing page */
    pageName: string;
}
/** Data on the "containingStateGroup" a component resides in */
/** Notice: at the moment is not documented in the REST API documentation. I have raised the issue
 *  (https://forum.figma.com/t/missing-containingstategroup-parameter-in-documentation-for-frameinfo/2558)
 *  and filed a bug with the support, but no one replied. From what I understand, this extra parameters are
 *  added when a component is a variant within a component_set (the name/nodeId are of the parent component_set)
*/
export interface ContainingStateGroup {
    /** Name of the element's residing "state group" (likely, a component_set) */
    name: string;
    /** Id of the element's residing "state group" (likely, a component_set) */
    nodeId: string;
}
/**
 * NOT DOCUMENTED
 *
 * Data on component's containing page, if component resides in a multi-page file
 */
export interface PageInfo {
}
/** An arrangement of published UI elements that can be instantiated across figma files */
export interface Component {
    /** The key of the component */
    key: string;
    /** The name of the component */
    name: string;
    /** The description of the component as entered in the editor */
    description: string;
    /** The ID of the component set if the component belongs to one  */
    componentSetId: string | null;
    /** The documentation links for this component */
    documentationLinks: DocumentationLinks[];
}
/** Represents a link to documentation for a component. */
export interface DocumentationLinks {
    /** Should be a valid URI (e.g. https://www.figma.com). */
    uri: string;
}
/** A set of properties that can be applied to nodes and published. Styles for a property can be created in the corresponding property's panel while editing a file */
export interface Style {
    /** The key of the style */
    key: string;
    /** The name of the style */
    name: string;
    /** The description of the style */
    description: string;
    /** The type of style */
    styleType: StyleType;
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
    /** Node ID that corresponds to the start frame for prototypes */
    prototypeStartNodeID?: string | null;
}
/** A node of fixed size containing other nodes */
export interface FRAME {
    /** An array of nodes that are direct children of this node */
    children: Node[];
    /** If true, layer is locked and cannot be edited, default `false` */
    locked?: boolean;
    /** @deprecated Background of the node. This is deprecated, as backgrounds for frames are now in the fills field. */
    background: Paint[];
    /** @deprecated Background color of the node. This is deprecated, as frames now support more than a solid color as a background. Please use the background field instead. */
    backgroundColor?: Color;
    /** An array of fill paints applied to the node */
    fills: Paint[];
    /** An array of stroke paints applied to the node */
    strokes: Paint[];
    /** The weight of strokes on the node */
    strokeWeight: number;
    /** The weight of strokes on different side of the node */
    individualStrokeWeights?: {
        top: number;
        right: number;
        left: number;
        bottom: number;
    };
    /** Position of stroke relative to vector outline, as a string enum */
    strokeAlign: StrokeAlign;
    /** Radius of each corner of the frame if a single radius is set for all corners */
    cornerRadius: number;
    /** Array of length 4 of the radius of each corner of the rectangle, starting in the top left and proceeding clockwise */
    rectangleCornerRadii: [number, number, number, number];
    /** default: [] An array of export settings representing images to export from node */
    exportSettings: ExportSetting[];
    /** How this node blends with nodes behind it in the scene (see blend mode section for more details) */
    blendMode: BlendMode;
    /** default: false Keep height and width constrained to same ratio */
    preserveRatio: boolean;
    /** Horizontal and vertical layout constraints for node */
    constraints: LayoutConstraint;
    /** Determines if the layer should stretch along the parent’s counter axis. This property is only provided for direct children of auto-layout frames. */
    layoutAlign: LayoutAlign;
    /** default: 0. This property is applicable only for direct children of auto-layout frames, ignored otherwise. Determines whether a layer should stretch along the parent’s primary axis. A 0 corresponds to a fixed size and 1 corresponds to stretch. */
    layoutGrow?: number;
    /** default: null Node ID of node to transition to in prototyping */
    transitionNodeID?: string | null;
    /** default: null The duration of the prototyping transition on this node (in milliseconds). */
    transitionDuration?: number | null;
    /** default: null The easing curve used in the prototyping transition on this node. */
    transitionEasing?: EasingType | null;
    /** default: 1 Opacity of the node */
    opacity: number;
    /** Bounding box of the node in absolute space coordinates */
    absoluteBoundingBox: Rectangle;
    /** Width and height of element. This is different from the width and height of the bounding box in that the absolute bounding box represents the element after scaling and rotation. Only present if geometry=paths is passed */
    size?: Vector;
    /** The top two rows of a matrix that represents the 2D transform of this node relative to its parent. The bottom row of the matrix is implicitly always (0, 0, 1). Use to transform coordinates in geometry. Only present if geometry=paths is passed */
    relativeTransform?: Transform;
    /** Does this node clip content outside of its bounds? */
    clipsContent: boolean;
    /** Whether this layer uses auto-layout to position its children. default NONE */
    layoutMode: 'NONE' | 'HORIZONTAL' | 'VERTICAL';
    /** Whether the primary axis has a fixed length (determined by the user) or an automatic length (determined by the layout engine). This property is only applicable for auto-layout frames. Default AUTO */
    primaryAxisSizingMode: AxisSizingMode;
    /** Whether the counter axis has a fixed length (determined by the user) or an automatic length (determined by the layout engine). This property is only applicable for auto-layout frames. Default AUTO */
    counterAxisSizingMode: AxisSizingMode;
    /** Determines how the auto-layout frame’s children should be aligned in the primary axis direction. This property is only applicable for auto-layout frames. Default MIN */
    primaryAxisAlignItems: 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN';
    /** Determines how the auto-layout frame’s children should be aligned in the counter axis direction. This property is only applicable for auto-layout frames. Default MIN */
    counterAxisAlignItems: 'MIN' | 'CENTER' | 'MAX' | 'BASELINE';
    /** default: 0. The padding between the left border of the frame and its children. This property is only applicable for auto-layout frames. */
    paddingLeft: number;
    /** default: 0. The padding between the right border of the frame and its children. This property is only applicable for auto-layout frames. */
    paddingRight: number;
    /** default: 0. The padding between the top border of the frame and its children. This property is only applicable for auto-layout frames. */
    paddingTop: number;
    /** default: 0. The padding between the bottom border of the frame and its children. This property is only applicable for auto-layout frames. */
    paddingBottom: number;
    /** @deprecated default: 0. The horizontal padding between the borders of the frame and its children. This property is only applicable for auto-layout frames. Deprecated in favor of setting individual paddings. */
    horizontalPadding: number;
    /** @deprecated default: 0. The vertical padding between the borders of the frame and its children. This property is only applicable for auto-layout frames. Deprecated in favor of setting individual paddings. */
    verticalPadding: number;
    /** default: 0. The distance between children of the frame. This property is only applicable for auto-layout frames. */
    itemSpacing: number;
    /**default: false. Applicable only if layoutMode != "NONE". */
    itemReverseZIndex: boolean;
    /**default: false. Applicable only if layoutMode != "NONE". */
    strokesIncludedInLayout: boolean;
    /** Defines the scrolling behavior of the frame, if there exist contents outside of the frame boundaries. The frame can either scroll vertically, horizontally, or in both directions to the extents of the content contained within it. This behavior can be observed in a prototype. Default NONE */
    overflowDirection: 'NONE' | 'HORIZONTAL_SCROLLING' | 'VERTICAL_SCROLLING' | 'HORIZONTAL_AND_VERTICAL_SCROLLING';
    /** default: [] An array of layout grids attached to this node (see layout grids section for more details). GROUP nodes do not have this attribute */
    layoutGrids?: LayoutGrid[];
    /** default: [] An array of effects attached to this node (see effects section for more details) */
    effects: Effect[];
    /** default: false Does this node mask sibling nodes in front of it? */
    isMask: boolean;
    /** default: false Does this mask ignore fill style (like gradients) and effects? */
    isMaskOutline: boolean;
    /** default: AUTO */
    layoutPositioning: 'AUTO' | 'ABSOLUTE';
}
/** A logical grouping of nodes */
export declare type GROUP = FRAME;
/** A vector network, consisting of vertices and edges */
export interface VECTOR {
    /** default: [] An array of export settings representing images to export from node */
    exportSettings: ExportSetting[];
    /** If true, layer is locked and cannot be edited, default `false` */
    locked?: boolean;
    /** How this node blends with nodes behind it in the scene (see blend mode section for more details) */
    blendMode: BlendMode;
    /** default: false Keep height and width constrained to same ratio */
    preserveRatio?: boolean;
    /** Determines if the layer should stretch along the parent’s counter axis. This property is only provided for direct children of auto-layout frames. */
    layoutAlign: LayoutAlign;
    /** default: 0. This property is applicable only for direct children of auto-layout frames, ignored otherwise. Determines whether a layer should stretch along the parent’s primary axis. A 0 corresponds to a fixed size and 1 corresponds to stretch. */
    layoutGrow?: number;
    /** Horizontal and vertical layout constraints for node */
    constraints: LayoutConstraint;
    /** default: null Node ID of node to transition to in prototyping */
    transitionNodeID?: string | null;
    /** default: null The duration of the prototyping transition on this node (in milliseconds). */
    transitionDuration?: number | null;
    /** default: null The easing curve used in the prototyping transition on this node. */
    transitionEasing?: EasingType | null;
    /** default: 1 Opacity of the node */
    opacity?: number;
    /** Bounding box of the node in absolute space coordinates */
    absoluteBoundingBox: Rectangle;
    /** Width and height of element. This is different from the width and height of the bounding box in that the absolute bounding box represents the element after scaling and rotation. Only present if geometry=paths is passed */
    size?: Vector;
    /** The top two rows of a matrix that represents the 2D transform of this node relative to its parent. The bottom row of the matrix is implicitly always (0, 0, 1). Use to transform coordinates in geometry. Only present if geometry=paths is passed */
    relativeTransform?: Transform;
    /** default: [] An array of effects attached to this node (see effects section for more details) */
    effects?: Effect[];
    /** default: false Does this node mask sibling nodes in front of it? */
    isMask?: boolean;
    /** default: [] An array of fill paints applied to the node */
    fills: Paint[];
    /** Only specified if parameter geometry=paths is used. An array of paths representing the object fill */
    fillGeometry?: Path[];
    /** default: [] An array of stroke paints applied to the node */
    strokes: Paint[];
    /** The weight of strokes on the node */
    strokeWeight: number;
    /** The weight of strokes on different side of the node */
    individualStrokeWeights?: {
        top: number;
        right: number;
        left: number;
        bottom: number;
    };
    /** default: NONE. A string enum with value of "NONE", "ROUND", "SQUARE", "LINE_ARROW", or "TRIANGLE_ARROW", describing the end caps of vector paths. */
    strokeCap?: StrokeCap;
    /** Only specified if parameter geometry=paths is used. An array of paths representing the object stroke */
    strokeGeometry?: Path[];
    /** Where stroke is drawn relative to the vector outline as a string enum
    "INSIDE": draw stroke inside the shape boundary
    "OUTSIDE": draw stroke outside the shape boundary
    "CENTER": draw stroke centered along the shape boundary */
    strokeAlign: StrokeAlign;
    /** A string enum with value of "MITER", "BEVEL", or "ROUND", describing how corners in vector paths are rendered. */
    strokeJoin?: StrokeJoin;
    /** An array of floating point numbers describing the pattern of dash length and gap lengths that the vector path follows. For example a value of [1, 2] indicates that the path has a dash of length 1 followed by a gap of length 2, repeated. */
    strokeDashes?: number[];
    /** Only valid if strokeJoin is "MITER". The corner angle, in degrees, below which strokeJoin will be set to "BEVEL" to avoid super sharp corners. By default this is 28.96 degrees. */
    strokeMiterAngle?: number;
    /** A mapping of a StyleType to style ID (see Style) of styles present on this node. The style ID can be used to look up more information about the style in the top-level styles field. */
    styles?: StylesMap;
    /** default: AUTO */
    layoutPositioning: 'AUTO' | 'ABSOLUTE';
}
/** A group that has a boolean operation applied to it */
export declare type BOOLEAN = VECTOR & {
    /** An array of nodes that are being boolean operated on */
    children: Node[];
};
/** A group that has a boolean operation applied to it */
export declare type BOOLEAN_OPERATION = VECTOR & {
    /** An array of nodes that are being boolean operated on */
    children: Node[];
    /** A string enum with value of "UNION", "INTERSECT", "SUBTRACT", or "EXCLUDE" indicating the type of boolean operation applied */
    booleanOperation: BooleanOperationType;
};
/** A regular star shape */
export declare type STAR = VECTOR;
/** A straight line */
export declare type LINE = VECTOR;
/** An ellipse */
export declare type ELLIPSE = VECTOR;
/** A regular n-sided polygon */
export declare type REGULAR_POLYGON = VECTOR;
/** A rectangle */
export declare type RECTANGLE = VECTOR & {
    /** Radius of each corner of the rectangle */
    cornerRadius: number;
    /** Array of length 4 of the radius of each corner of the rectangle, starting in the top left and proceeding clockwise */
    rectangleCornerRadii: [number, number, number, number];
};
/** List types are represented as string enums with one of these possible values: ORDERED: Text is an ordered list (numbered), UNORDERED: Text is an unordered list (bulleted), NONE: Text is plain text and not part of any list */
export declare enum LineTypes {
    ORDERED = "ORDERED",
    UNORDERED = "UNORDERED",
    NONE = "NONE"
}
/** A text box */
export declare type TEXT = VECTOR & {
    /** Text contained within text box */
    characters: string;
    /** Style of text including font family and weight (see type style section for more information) */
    style: TypeStyle;
    /** Array with same number of elements as characters in text box, each element is a reference to the styleOverrideTable defined below and maps to the corresponding character in the characters field. Elements with value 0 have the default type style */
    characterStyleOverrides: number[];
    /** Map from ID to TypeStyle for looking up style overrides */
    styleOverrideTable: {
        [mapId: number]: TypeStyle;
    };
    /** An array with the same number of elements as lines in the text node, where lines are delimited by newline or paragraph separator characters. Each element in the array corresponds to the list type of a specific line. */
    lineTypes: LineTypes[];
    /** An array with the same number of elements as lines in the text node, where lines are delimited by newline or paragraph separator characters. Each element in the array corresponds to the indentation level of a specific line. */
    lineIndentations: number[];
};
/** A rectangular region of the canvas that can be exported */
export interface SLICE {
    /** An array of export settings representing images to export from this node */
    exportSettings: ExportSetting[];
    /** Bounding box of the node in absolute space coordinates */
    absoluteBoundingBox: Rectangle;
    /** Width and height of element. This is different from the width and height of the bounding box in that the absolute bounding box represents the element after scaling and rotation. Only present if geometry=paths is passed */
    size?: Vector;
    /** The top two rows of a matrix that represents the 2D transform of this node relative to its parent. The bottom row of the matrix is implicitly always (0, 0, 1). Use to transform coordinates in geometry. Only present if geometry=paths is passed */
    relativeTransform?: Transform;
}
/** A node that can have instances created of it that share the same properties */
export declare type COMPONENT = FRAME;
/** A node that can have instances created of it that share the same properties */
export declare type COMPONENT_SET = FRAME;
/** An instance of a component, changes to the component result in the same changes applied to the instance */
export declare type INSTANCE<ComponentID = string> = FRAME & {
    /** ID of component that this instance came from, refers to components table (see endpoints section below) */
    componentId: ComponentID;
};
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
    BOOLEAN_OPERATION: BOOLEAN_OPERATION;
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
    /** A node that can have instances created of it that share the same properties */
    COMPONENT_SET: COMPONENT_SET;
    /** An instance of a component, changes to the component result in the same changes applied to the instance */
    INSTANCE: INSTANCE;
};
export declare type NodeType = keyof NodeTypes;
export declare type Node<NType extends NodeType = NodeType> = {
    id: string;
    name: string;
    visible: boolean;
    type: NType;
    pluginData: any;
    sharedPluginData: any;
    isFixed?: boolean;
} & NodeTypes[NType];
export declare function isNodeType<NType extends NodeType, R = Node<NType>>(node: Node<any>, type: NType): node is R;
export {};
