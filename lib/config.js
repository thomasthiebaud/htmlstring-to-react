"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}
function deepMerge(target, source) {
    var output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(function (key) {
            var _a, _b;
            if (isObject(source[key])) {
                if (!(key in target)) {
                    Object.assign(output, (_a = {}, _a[key] = source[key], _a));
                }
                else {
                    output[key] = deepMerge(target[key], source[key]);
                }
            }
            else {
                Object.assign(output, (_b = {}, _b[key] = source[key], _b));
            }
        });
    }
    return output;
}
/**
 * Options that cannot be overidden by the user because they are used internaly by the library
 */
var mandatoryConfig = {
    dom: {
        RETURN_DOM: false,
        RETURN_DOM_FRAGMENT: true,
        RETURN_DOM_IMPORT: false,
    },
    useAsKey: ['key'],
};
/**
 * Default configuration that can be overriden by the user
 */
var defaultConfig = {
    dom: {
        ADD_ATTR: ['key'],
    },
    useAsKey: ['key'],
};
function getConfig(config) {
    if (config) {
        return deepMerge(defaultConfig, deepMerge(config, mandatoryConfig));
    }
    else {
        return deepMerge(defaultConfig, mandatoryConfig);
    }
}
exports.getConfig = getConfig;
//# sourceMappingURL=config.js.map