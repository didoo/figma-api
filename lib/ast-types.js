"use strict";
/*

Types parser from https://www.figma.com/developers/docs

var ch = [ ...$0.children ]
var types = {};

ch.forEach(c => {
    var typeName = c.querySelector('td > .developer_docs--literal--1pEvW').innerText;
    var typeDesc = c.querySelector('td > .developer_docs--desc--1p4rP').innerText;
    var typeFields = [ ...c.querySelectorAll('.developer_docs--tableProps--1_lpS > div') ];
    
    var typeFds = {};
    types[typeName] = {
        desc: typeDesc,
        fields: typeFds,
    };

    typeFields.forEach(field => {
        try {
            var fieldName = field.querySelector('.developer_docs--literal--1pEvW').innerText;
            var fieldType = field.querySelector('.developer_docs--type--3gJ4C').innerText;
            var fieldDesc = field.children[1].innerText;
            typeFds[fieldName] = {
                type: fieldType,
                desc: fieldDesc,
            };
        } catch {}
    });
});

Object.entries(types).map(([ typeName, type ]) =>
`/** ${type.desc} *
export interface ${typeName} {
    ${Object.entries(type.fields).map(([ fieldName, field ]) => (
        `/** ${(field).desc} *\n${fieldName}: ${(field).type};`
    )).join('\n')}
}`
).join('\n');

Object.entries(types).map(([ typeName, type ]) =>
`/** ${type.desc} *
${typeName}: ${typeName},`
).join('\n');

*/
Object.defineProperty(exports, "__esModule", { value: true });
var ImageType;
(function (ImageType) {
    ImageType["JPG"] = "JPG";
    ImageType["PNG"] = "PNG";
    ImageType["SVG"] = "SVG";
})(ImageType = exports.ImageType || (exports.ImageType = {}));
var ConstrainType;
(function (ConstrainType) {
    /** Scale by value */
    ConstrainType["SCALE"] = "SCALE";
    /** Scale proportionally and set width to value */
    ConstrainType["WIDTH"] = "WIDTH";
    /** Scale proportionally and set width to value */
    ConstrainType["HEIGHT"] = "HEIGHT";
})(ConstrainType = exports.ConstrainType || (exports.ConstrainType = {}));
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
})(BlendMode = exports.BlendMode || (exports.BlendMode = {}));
/**
 * Enum describing animation easing curves
 * This type is a string enum with the following possible values
 * "EASE_IN": Ease in with an animation curve similar to CSS ease-in.
 * "EASE_OUT": Ease out with an animation curve similar to CSS ease-out.
 * "EASE_IN_AND_OUT": Ease in and then out with an animation curve similar to CSS ease-in-out.
 */
var EasingType;
(function (EasingType) {
    /** Ease in with an animation curve similar to CSS ease-in. */
    EasingType["EASE_IN"] = "EASE_IN";
    /** Ease out with an animation curve similar to CSS ease-out. */
    EasingType["EASE_OUT"] = "EASE_OUT";
    /** Ease in and then out with an animation curve similar to CSS ease-in-out. */
    EasingType["EASE_IN_AND_OUT"] = "EASE_IN_AND_OUT";
})(EasingType = exports.EasingType || (exports.EasingType = {}));
var LayoutConstraintVertical;
(function (LayoutConstraintVertical) {
    LayoutConstraintVertical["TOP"] = "TOP";
    LayoutConstraintVertical["BOTTOM"] = "BOTTOM";
    LayoutConstraintVertical["CENTER"] = "CENTER";
    LayoutConstraintVertical["TOP_BOTTOM"] = "TOP_BOTTOM";
    LayoutConstraintVertical["SCALE"] = "SCALE";
})(LayoutConstraintVertical = exports.LayoutConstraintVertical || (exports.LayoutConstraintVertical = {}));
var LayoutConstraintHorizontal;
(function (LayoutConstraintHorizontal) {
    LayoutConstraintHorizontal["LEFT"] = "LEFT";
    LayoutConstraintHorizontal["RIGHT"] = "RIGHT";
    LayoutConstraintHorizontal["CENTER"] = "CENTER";
    LayoutConstraintHorizontal["LEFT_RIGHT"] = "LEFT_RIGHT";
    LayoutConstraintHorizontal["SCALE"] = "SCALE";
})(LayoutConstraintHorizontal = exports.LayoutConstraintHorizontal || (exports.LayoutConstraintHorizontal = {}));
var LayoutGridPattern;
(function (LayoutGridPattern) {
    LayoutGridPattern["COLUMNS"] = "COLUMNS";
    LayoutGridPattern["ROWS"] = "ROWS";
    LayoutGridPattern["GRID"] = "GRID";
})(LayoutGridPattern = exports.LayoutGridPattern || (exports.LayoutGridPattern = {}));
var LayoutGridAligment;
(function (LayoutGridAligment) {
    LayoutGridAligment["MIN"] = "MIN";
    LayoutGridAligment["MAX"] = "MAX";
    LayoutGridAligment["CENTER"] = "CENTER";
})(LayoutGridAligment = exports.LayoutGridAligment || (exports.LayoutGridAligment = {}));
var EffectType;
(function (EffectType) {
    EffectType["INNER_SHADOW"] = "INNER_SHADOW";
    EffectType["DROP_SHADOW"] = "DROP_SHADOW";
    EffectType["LAYER_BLUR"] = "LAYER_BLUR";
    EffectType["BACKGROUND_BLUR"] = "BACKGROUND_BLUR";
})(EffectType = exports.EffectType || (exports.EffectType = {}));
var PainType;
(function (PainType) {
    PainType["SOLID"] = "SOLID";
    PainType["GRADIENT_LINEAR"] = "GRADIENT_LINEAR";
    PainType["GRADIENT_RADIAL"] = "GRADIENT_RADIAL";
    PainType["GRADIENT_ANGULAR"] = "GRADIENT_ANGULAR";
    PainType["GRADIENT_DIAMOND"] = "GRADIENT_DIAMOND";
    PainType["IMAGE"] = "IMAGE";
    PainType["EMOJI"] = "EMOJI";
})(PainType = exports.PainType || (exports.PainType = {}));
var PainSolidScaleMode;
(function (PainSolidScaleMode) {
    PainSolidScaleMode["FILL"] = "FILL";
    PainSolidScaleMode["FIT"] = "FIT";
    PainSolidScaleMode["TILE"] = "TILE";
    PainSolidScaleMode["STRETCH"] = "STRETCH";
})(PainSolidScaleMode = exports.PainSolidScaleMode || (exports.PainSolidScaleMode = {}));
var PathWindingRule;
(function (PathWindingRule) {
    PathWindingRule["EVENODD"] = "EVENODD";
    PathWindingRule["NONZERO"] = "NONZERO";
})(PathWindingRule = exports.PathWindingRule || (exports.PathWindingRule = {}));
function isNodeType(node, type) {
    return node.type === type;
}
exports.isNodeType = isNodeType;
//# sourceMappingURL=ast-types.js.map