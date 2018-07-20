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
//# sourceMappingURL=ast-types.js.map