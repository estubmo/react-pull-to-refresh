"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
exports.ReleaseContent = function (_a) {
    var _b = _a.height, height = _b === void 0 ? "200px" : _b, _c = _a.background, background = _c === void 0 ? "none" : _c, _d = _a.label, label = _d === void 0 ? "Release to refresh" : _d;
    return (React.createElement("div", { id: "container" },
        React.createElement("div", { id: "arrow" }),
        React.createElement("span", null, label),
        React.createElement("style", null, "\n            #container {\n                background: " + (background || "none") + ";\n                height: " + (height || "200px") + ";\n                text-align: center;\n            }\n            #arrow {\n                margin: 10px auto;\n                border-left: 15px solid transparent;\n                border-right: 15px solid transparent;\n                border-bottom: 15px solid #666666;\n                height: 0;\n                width: 0;\n\n                -webkit-animation: fadein 1.5s infinite;\n                animation: fadein 1.5s infinite;\n            }\n            @keyframes fadein {\n                0%, 100% {\n                    opacity: 0;\n                }\n                45%, 55% {\n                    opacity: 1;\n                }\n            }\n        ")));
};
//# sourceMappingURL=ReleaseContent.js.map