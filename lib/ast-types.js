"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineTypes = exports.PathWindingRule = exports.PaintSolidScaleMode = exports.PaintType = exports.EffectType = exports.AxisSizingMode = exports.LayoutGridAlignment = exports.LayoutGridPattern = exports.LayoutAlign = exports.LayoutConstraintHorizontal = exports.LayoutConstraintVertical = exports.EasingType = exports.BlendMode = exports.ConstrainType = exports.LineHeightUnit = exports.TextAutoResize = exports.TextDecoration = exports.TextCase = exports.BooleanOperationType = exports.ImageType = exports.StrokeJoin = exports.StrokeAlign = exports.StrokeCap = void 0;
exports.isEffectShadow = isEffectShadow;
exports.isEffectBlur = isEffectBlur;
exports.isPaintSolid = isPaintSolid;
exports.isPaintGradient = isPaintGradient;
exports.isPaintImage = isPaintImage;
exports.isNodeType = isNodeType;
/** A string enum with value, describing the end caps of vector paths. */
var StrokeCap;
(function (StrokeCap) {
    StrokeCap["NONE"] = "NONE";
    StrokeCap["ROUND"] = "ROUND";
    StrokeCap["SQUARE"] = "SQUARE";
    StrokeCap["LINE_ARROW"] = "LINE_ARROW";
    StrokeCap["TRIANGLE_ARROW"] = "TRIANGLE_ARROW";
})(StrokeCap || (exports.StrokeCap = StrokeCap = {}));
/** Where stroke is drawn relative to the vector outline as a string enum */
var StrokeAlign;
(function (StrokeAlign) {
    StrokeAlign["INSIDE"] = "INSIDE";
    StrokeAlign["OUTSIDE"] = "OUTSIDE";
    StrokeAlign["CENTER"] = "CENTER";
})(StrokeAlign || (exports.StrokeAlign = StrokeAlign = {}));
/** A string enum with value, describing how corners in vector paths are rendered. */
var StrokeJoin;
(function (StrokeJoin) {
    StrokeJoin["MITER"] = "MITER";
    StrokeJoin["BEVEL"] = "BEVEL";
    StrokeJoin["ROUND"] = "ROUND";
})(StrokeJoin || (exports.StrokeJoin = StrokeJoin = {}));
var ImageType;
(function (ImageType) {
    ImageType["JPG"] = "JPG";
    ImageType["PNG"] = "PNG";
    ImageType["SVG"] = "SVG";
    ImageType["PDF"] = "PDF";
})(ImageType || (exports.ImageType = ImageType = {}));
/** A string enum with value, indicating the type of boolean operation applied */
var BooleanOperationType;
(function (BooleanOperationType) {
    BooleanOperationType["UNION"] = "UNION";
    BooleanOperationType["INTERSECT"] = "INTERSECT";
    BooleanOperationType["SUBTRACT"] = "SUBTRACT";
    BooleanOperationType["EXCLUDE"] = "EXCLUDE";
})(BooleanOperationType || (exports.BooleanOperationType = BooleanOperationType = {}));
/** Text casing applied to the node, default is the original casing */
var TextCase;
(function (TextCase) {
    TextCase["ORIGINAL"] = "ORIGINAL";
    TextCase["UPPER"] = "UPPER";
    TextCase["LOWER"] = "LOWER";
    TextCase["TITLE"] = "TITLE";
    TextCase["SMALL_CAPS"] = "SMALL_CAPS";
    TextCase["SMALL_CAPS_FORCED"] = "SMALL_CAPS_FORCED";
})(TextCase || (exports.TextCase = TextCase = {}));
/** Text decoration applied to the node */
var TextDecoration;
(function (TextDecoration) {
    TextDecoration["NONE"] = "NONE";
    TextDecoration["STRIKETHROUGH"] = "STRIKETHROUGH";
    TextDecoration["UNDERLINE"] = "UNDERLINE";
})(TextDecoration || (exports.TextDecoration = TextDecoration = {}));
/** Dimensions along which text will auto resize, default is that the text does not auto-resize. */
var TextAutoResize;
(function (TextAutoResize) {
    TextAutoResize["NONE"] = "NONE";
    TextAutoResize["HEIGHT"] = "HEIGHT";
    TextAutoResize["WIDTH_AND_HEIGHT"] = "WIDTH_AND_HEIGHT";
    TextAutoResize["TRUNCATE"] = "TRUNCATE";
})(TextAutoResize || (exports.TextAutoResize = TextAutoResize = {}));
/** The unit of the line height value specified by the user. */
var LineHeightUnit;
(function (LineHeightUnit) {
    LineHeightUnit["PIXELS"] = "PIXELS";
    LineHeightUnit["FONT_SIZE_%"] = "FONT_SIZE_%";
    LineHeightUnit["INTRINSIC_%"] = "INTRINSIC_%";
})(LineHeightUnit || (exports.LineHeightUnit = LineHeightUnit = {}));
var ConstrainType;
(function (ConstrainType) {
    /** Scale by value */
    ConstrainType["SCALE"] = "SCALE";
    /** Scale proportionally and set width to value */
    ConstrainType["WIDTH"] = "WIDTH";
    /** Scale proportionally and set width to value */
    ConstrainType["HEIGHT"] = "HEIGHT";
})(ConstrainType || (exports.ConstrainType = ConstrainType = {}));
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
var BlendMode;
(function (BlendMode) {
    // Normal blends:
    /** (Only applicable to objects with children) */
    BlendMode["PASS_THROUGH"] = "PASS_THROUGH";
    /** (Only applicable to objects with children) */
    BlendMode["NORMAL"] = "NORMAL";
    /** Darken */
    BlendMode["DARKEN"] = "DARKEN";
    BlendMode["MULTIPLY"] = "MULTIPLY";
    BlendMode["LINEAR_BURN"] = "LINEAR_BURN";
    BlendMode["COLOR_BURN"] = "COLOR_BURN";
    /** Lighten */
    BlendMode["LIGHTEN"] = "LIGHTEN";
    BlendMode["SCREEN"] = "SCREEN";
    BlendMode["LINEAR_DODGE"] = "LINEAR_DODGE";
    BlendMode["COLOR_DODGE"] = "COLOR_DODGE";
    /** Contrast */
    BlendMode["OVERLAY"] = "OVERLAY";
    BlendMode["SOFT_LIGHT"] = "SOFT_LIGHT";
    BlendMode["HARD_LIGHT"] = "HARD_LIGHT";
    /** Inversion */
    BlendMode["DIFFERENCE"] = "DIFFERENCE";
    BlendMode["EXCLUSION"] = "EXCLUSION";
    /** Component */
    BlendMode["HUE"] = "HUE";
    BlendMode["SATURATION"] = "SATURATION";
    BlendMode["COLOR"] = "COLOR";
    BlendMode["LUMINOSITY"] = "LUMINOSITY";
})(BlendMode || (exports.BlendMode = BlendMode = {}));
/**
 * Enum describing animation easing curves
 * This type is a string enum with the following possible values
 * "EASE_IN": Ease in with an animation curve similar to CSS ease-in.
 * "EASE_OUT": Ease out with an animation curve similar to CSS ease-out.
 * "EASE_IN_AND_OUT": Ease in and then out with an animation curve similar to CSS ease-in-out.
 * "LINEAR": No easing, similar to CSS linear.
 */
var EasingType;
(function (EasingType) {
    /** Ease in with an animation curve similar to CSS ease-in. */
    EasingType["EASE_IN"] = "EASE_IN";
    /** Ease out with an animation curve similar to CSS ease-out. */
    EasingType["EASE_OUT"] = "EASE_OUT";
    /** Ease in and then out with an animation curve similar to CSS ease-in-out. */
    EasingType["EASE_IN_AND_OUT"] = "EASE_IN_AND_OUT";
    /** No easing, similar to CSS linear. */
    EasingType["LINEAR"] = "LINEAR";
    /** Gentle spring animation similar to react-spring. **/
    EasingType["GENTLE_SPRING"] = "GENTLE_SPRING";
})(EasingType || (exports.EasingType = EasingType = {}));
var LayoutConstraintVertical;
(function (LayoutConstraintVertical) {
    LayoutConstraintVertical["TOP"] = "TOP";
    LayoutConstraintVertical["BOTTOM"] = "BOTTOM";
    LayoutConstraintVertical["CENTER"] = "CENTER";
    LayoutConstraintVertical["TOP_BOTTOM"] = "TOP_BOTTOM";
    LayoutConstraintVertical["SCALE"] = "SCALE";
})(LayoutConstraintVertical || (exports.LayoutConstraintVertical = LayoutConstraintVertical = {}));
var LayoutConstraintHorizontal;
(function (LayoutConstraintHorizontal) {
    LayoutConstraintHorizontal["LEFT"] = "LEFT";
    LayoutConstraintHorizontal["RIGHT"] = "RIGHT";
    LayoutConstraintHorizontal["CENTER"] = "CENTER";
    LayoutConstraintHorizontal["LEFT_RIGHT"] = "LEFT_RIGHT";
    LayoutConstraintHorizontal["SCALE"] = "SCALE";
})(LayoutConstraintHorizontal || (exports.LayoutConstraintHorizontal = LayoutConstraintHorizontal = {}));
var LayoutAlign;
(function (LayoutAlign) {
    /** Determines if the layer should stretch along the parent’s counter axis. This property is only provided for direct children of auto-layout frames. */
    LayoutAlign["INHERIT"] = "INHERIT";
    LayoutAlign["STRETCH"] = "STRETCH";
    /** In horizontal auto-layout frames, "MIN" and "MAX" correspond to "TOP" and "BOTTOM". In vertical auto-layout frames, "MIN" and "MAX" correspond to "LEFT" and "RIGHT". */
    LayoutAlign["MIN"] = "MIN";
    LayoutAlign["CENTER"] = "CENTER";
    LayoutAlign["MAX"] = "MAX";
})(LayoutAlign || (exports.LayoutAlign = LayoutAlign = {}));
var LayoutGridPattern;
(function (LayoutGridPattern) {
    LayoutGridPattern["COLUMNS"] = "COLUMNS";
    LayoutGridPattern["ROWS"] = "ROWS";
    LayoutGridPattern["GRID"] = "GRID";
})(LayoutGridPattern || (exports.LayoutGridPattern = LayoutGridPattern = {}));
var LayoutGridAlignment;
(function (LayoutGridAlignment) {
    LayoutGridAlignment["MIN"] = "MIN";
    LayoutGridAlignment["MAX"] = "MAX";
    LayoutGridAlignment["CENTER"] = "CENTER";
})(LayoutGridAlignment || (exports.LayoutGridAlignment = LayoutGridAlignment = {}));
var AxisSizingMode;
(function (AxisSizingMode) {
    AxisSizingMode["FIXED"] = "FIXED";
    AxisSizingMode["AUTO"] = "AUTO";
})(AxisSizingMode || (exports.AxisSizingMode = AxisSizingMode = {}));
var EffectType;
(function (EffectType) {
    EffectType["INNER_SHADOW"] = "INNER_SHADOW";
    EffectType["DROP_SHADOW"] = "DROP_SHADOW";
    EffectType["LAYER_BLUR"] = "LAYER_BLUR";
    EffectType["BACKGROUND_BLUR"] = "BACKGROUND_BLUR";
})(EffectType || (exports.EffectType = EffectType = {}));
function isEffectShadow(effect) {
    return (effect.type === EffectType.DROP_SHADOW || effect.type === EffectType.INNER_SHADOW);
}
function isEffectBlur(effect) {
    return (effect.type === EffectType.BACKGROUND_BLUR || effect.type === EffectType.LAYER_BLUR);
}
var PaintType;
(function (PaintType) {
    PaintType["SOLID"] = "SOLID";
    PaintType["GRADIENT_LINEAR"] = "GRADIENT_LINEAR";
    PaintType["GRADIENT_RADIAL"] = "GRADIENT_RADIAL";
    PaintType["GRADIENT_ANGULAR"] = "GRADIENT_ANGULAR";
    PaintType["GRADIENT_DIAMOND"] = "GRADIENT_DIAMOND";
    PaintType["IMAGE"] = "IMAGE";
    PaintType["EMOJI"] = "EMOJI";
})(PaintType || (exports.PaintType = PaintType = {}));
var PaintSolidScaleMode;
(function (PaintSolidScaleMode) {
    PaintSolidScaleMode["FILL"] = "FILL";
    PaintSolidScaleMode["FIT"] = "FIT";
    PaintSolidScaleMode["TILE"] = "TILE";
    PaintSolidScaleMode["STRETCH"] = "STRETCH";
})(PaintSolidScaleMode || (exports.PaintSolidScaleMode = PaintSolidScaleMode = {}));
function isPaintSolid(paint) {
    return paint.type === PaintType.SOLID;
}
function isPaintGradient(paint) {
    return paint.type === PaintType.GRADIENT_ANGULAR || paint.type === PaintType.GRADIENT_DIAMOND || paint.type === PaintType.GRADIENT_LINEAR || paint.type === PaintType.GRADIENT_RADIAL;
}
function isPaintImage(paint) {
    return paint.type === PaintType.IMAGE;
}
var PathWindingRule;
(function (PathWindingRule) {
    PathWindingRule["EVENODD"] = "EVENODD";
    PathWindingRule["NONZERO"] = "NONZERO";
})(PathWindingRule || (exports.PathWindingRule = PathWindingRule = {}));
;
/** List types are represented as string enums with one of these possible values: ORDERED: Text is an ordered list (numbered), UNORDERED: Text is an unordered list (bulleted), NONE: Text is plain text and not part of any list */
var LineTypes;
(function (LineTypes) {
    LineTypes["ORDERED"] = "ORDERED";
    LineTypes["UNORDERED"] = "UNORDERED";
    LineTypes["NONE"] = "NONE";
})(LineTypes || (exports.LineTypes = LineTypes = {}));
function isNodeType(node, type) {
    return node.type === type;
}
//# sourceMappingURL=ast-types.js.map