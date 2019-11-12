"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-implicit-dependencies */
var React = require("react");
var react_dom_1 = require("react-dom");
var react_hot_loader_1 = require("react-hot-loader");
var Basic_1 = require("../examples/Basic");
var renderExample = function () {
    var root = document.getElementById("sample");
    react_dom_1.render(React.createElement(react_hot_loader_1.AppContainer, null,
        React.createElement(Basic_1.Basic, null)), root);
};
renderExample();
if (module.hot) {
    module.hot.accept("./components/PullToRefresh", function () {
        renderExample();
    });
}
//# sourceMappingURL=dev.js.map