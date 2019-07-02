"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var possible_standard_names_1 = __importDefault(require("./possible-standard-names"));
var dom_1 = require("./dom");
function transformAttributes(attributesMap, options) {
    var attributes = dom_1.getAttributes(attributesMap);
    var transformedAttributes = {};
    Object.keys(attributes).forEach(function (key) {
        if (possible_standard_names_1.default[key]) {
            transformedAttributes[possible_standard_names_1.default[key]] = attributes[key];
        }
        else {
            transformedAttributes[key] = attributes[key];
        }
        if (!transformedAttributes.key) {
            var isKey = options.useAsKey.some(function (possibleKey) { return possibleKey === key; });
            if (isKey) {
                transformedAttributes.key = attributes[key];
            }
        }
    });
    return transformedAttributes;
}
function renderTextNode(node) {
    return node.nodeValue;
}
function transform(element, options) {
    return {
        attributes: transformAttributes(element.attributes, options),
        childNodes: element.childNodes,
        nodeName: element.nodeName.toLowerCase(),
        nodeType: element.nodeType,
        nodeValue: element.nodeValue,
        override: element.override,
    };
}
function renderElementNode(node, options) {
    var element = transform(node, options);
    var hasChildren = element.childNodes && element.childNodes.length > 0;
    if (element.override) {
        var attributesForOverride = element.attributes;
        if (hasChildren) {
            attributesForOverride = __assign({}, attributesForOverride, { 
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                children: render(element.childNodes, options) });
        }
        return React.cloneElement(element.override(attributesForOverride, node.textContent));
    }
    if (hasChildren) {
        return React.createElement(element.nodeName, element.attributes, 
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        render(element.childNodes, options));
    }
    return React.createElement(element.nodeName, element.attributes);
}
function render(nodes, options) {
    var elements = [];
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes.item(i);
        if (node.nodeType === dom_1.NodeType.TEXT_NODE) {
            elements.push(renderTextNode(node));
        }
        else if (node.nodeType === dom_1.NodeType.ELEMENT_NODE) {
            elements.push(renderElementNode(node, options));
        }
    }
    return elements;
}
exports.render = render;
//# sourceMappingURL=react.js.map