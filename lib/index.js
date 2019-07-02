"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var dom = __importStar(require("./dom"));
var override_1 = require("./override");
var react_1 = require("./react");
function parse(html, userOptions, customWindow) {
    if (typeof html !== 'string') {
        return [html];
    }
    var options = config_1.getConfig(userOptions);
    var document = dom.parse(html, options, customWindow);
    if (options.overrides) {
        override_1.override(document, options.overrides);
    }
    return react_1.render(document.childNodes, options);
}
exports.parse = parse;
//# sourceMappingURL=index.js.map