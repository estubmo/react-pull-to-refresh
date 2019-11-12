"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var src_1 = require("../src");
var Auto = /** @class */ (function (_super) {
    __extends(Auto, _super);
    function Auto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Auto.prototype.onRefresh = function () {
        return new Promise(function (resolve) {
            setTimeout(resolve, 2000);
        });
    };
    Auto.prototype.render = function () {
        return (React.createElement("div", { style: { overflow: "scroll" } },
            React.createElement(src_1.PullToRefresh, { pullDownContent: React.createElement(src_1.PullDownContent, null), releaseContent: React.createElement(src_1.ReleaseContent, null), refreshContent: React.createElement(src_1.RefreshContent, null), pullDownThreshold: 200, onRefresh: this.onRefresh, triggerHeight: "auto", backgroundColor: "white" },
                React.createElement("div", { id: "basic-container" },
                    React.createElement("div", { id: "basic-label" }, "PullToRefresh")),
                React.createElement("div", null,
                    React.createElement("h2", null, "Scrollable content"),
                    React.createElement("div", { id: "scrollable-content" })),
                React.createElement("style", null, "\n                        #basic-container {\n                            height: 50vh;\n                            display: flex;\n                            flex-direction: column;\n                            align-items: center;\n                            background: darkslategray;\n                        }\n                        #basic-label {\n                            user-select: none;\n                            margin-top: 20px;\n                            color: aliceblue;\n                            border: 1px solid aliceblue;\n                            border-radius: 6px;\n                            padding: 5px 2px;\n                        }\n                        #basic-label:hover {\n                            cursor: pointer;\n                        }\n                        #scrollable-content {\n                            height: 100vh;\n                            width: 100%;\n                            background: darkmagenta;\n                        }\n                    "))));
    };
    return Auto;
}(React.Component));
exports.Auto = Auto;
//# sourceMappingURL=Auto.js.map