"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function override(document, selectorsToElement) {
    Object.keys(selectorsToElement).forEach(function (selector) {
        var reactElement = selectorsToElement[selector];
        var elements = document.querySelectorAll(selector);
        for (var i = 0; i < elements.length; i++) {
            var element = elements.item(i);
            element.override = reactElement;
        }
    });
}
exports.override = override;
//# sourceMappingURL=override.js.map