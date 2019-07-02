"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dompurify_1 = __importDefault(require("dompurify"));
var NodeType;
(function (NodeType) {
    NodeType[NodeType["ELEMENT_NODE"] = 1] = "ELEMENT_NODE";
    NodeType[NodeType["TEXT_NODE"] = 3] = "TEXT_NODE";
    NodeType[NodeType["PROCESSING_INSTRUCTION_NODE"] = 7] = "PROCESSING_INSTRUCTION_NODE";
    NodeType[NodeType["COMMENT_NODE"] = 8] = "COMMENT_NODE";
    NodeType[NodeType["DOCUMENT_NODE"] = 9] = "DOCUMENT_NODE";
    NodeType[NodeType["DOCUMENT_TYPE_NODE"] = 10] = "DOCUMENT_TYPE_NODE";
    NodeType[NodeType["DOCUMENT_FRAGMENT_NODE"] = 11] = "DOCUMENT_FRAGMENT_NODE";
})(NodeType = exports.NodeType || (exports.NodeType = {}));
function getAttributes(elementAttributes) {
    var attributes = {};
    for (var i = 0; i < elementAttributes.length; i++) {
        var attribute = elementAttributes.item(i);
        attributes[attribute.nodeName] = attribute.nodeValue;
    }
    return attributes;
}
exports.getAttributes = getAttributes;
function parse(html, config, customWindow) {
    var dompurifyInstance = dompurify_1.default(customWindow);
    return dompurifyInstance.sanitize(html, config.dom);
}
exports.parse = parse;
//# sourceMappingURL=dom.js.map