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
var isScrollable_1 = require("../isScrollable");
var PullToRefresh = /** @class */ (function (_super) {
    __extends(PullToRefresh, _super);
    function PullToRefresh(props) {
        var _this = _super.call(this, props) || this;
        _this.dragging = false;
        _this.startY = 0;
        _this.currentY = 0;
        _this.state = {
            pullToRefreshThresholdBreached: false,
            maxPullDownDistance: 0,
            onRefreshing: false,
        };
        _this.containerRef = _this.containerRef.bind(_this);
        _this.pullDownRef = _this.pullDownRef.bind(_this);
        _this.onTouchStart = _this.onTouchStart.bind(_this);
        _this.onTouchMove = _this.onTouchMove.bind(_this);
        _this.onEnd = _this.onEnd.bind(_this);
        return _this;
    }
    PullToRefresh.prototype.containerRef = function (container) {
        this.container = container;
    };
    PullToRefresh.prototype.pullDownRef = function (pullDown) {
        this.pullDown = pullDown;
        var maxPullDownDistance = this.pullDown && this.pullDown.firstChild && this.pullDown.firstChild["getBoundingClientRect"]
            ? this.pullDown.firstChild["getBoundingClientRect"]().height : 0;
        this.setState({ maxPullDownDistance: maxPullDownDistance });
    };
    PullToRefresh.prototype.componentDidMount = function () {
        if (!this.container) {
            return;
        }
        this.container.addEventListener("touchstart", this.onTouchStart);
        this.container.addEventListener("touchmove", this.onTouchMove);
        this.container.addEventListener("touchend", this.onEnd);
        this.container.addEventListener("mousedown", this.onTouchStart);
        this.container.addEventListener("mousemove", this.onTouchMove);
        this.container.addEventListener("mouseup", this.onEnd);
    };
    PullToRefresh.prototype.componentWillUnmount = function () {
        if (!this.container) {
            return;
        }
        this.container.removeEventListener("touchstart", this.onTouchStart);
        this.container.removeEventListener("touchmove", this.onTouchMove);
        this.container.removeEventListener("touchend", this.onEnd);
        this.container.removeEventListener("mousedown", this.onTouchStart);
        this.container.removeEventListener("mousemove", this.onTouchMove);
        this.container.removeEventListener("mouseup", this.onEnd);
    };
    PullToRefresh.prototype.onTouchStart = function (e) {
        var _a = this.props.triggerHeight, triggerHeight = _a === void 0 ? 40 : _a;
        this.startY = e["pageY"] || e.touches[0].pageY;
        this.currentY = this.startY;
        if (triggerHeight === "auto") {
            var target = e.target;
            var container = this.container;
            if (!container) {
                return;
            }
            // an element we're touching can be scrolled up, so gesture is going to be a scroll gesture
            if (e.type === "touchstart" && isScrollable_1.isTreeScrollable(target, isScrollable_1.DIRECTION.up)) {
                return;
            }
            // even though we're not scrolling, the pull-to-refresh isn't visible to the user so cancel
            if (container.getBoundingClientRect().top < 0) {
                return;
            }
        }
        else {
            var top_1 = this.container.getBoundingClientRect().top || this.container.getBoundingClientRect().y || 0;
            if (this.startY - top_1 > triggerHeight) {
                return;
            }
        }
        this.container.style.transition = "transform 0.0s cubic-bezier(0,0,0.31,1)";
        this.dragging = true;
    };
    PullToRefresh.prototype.onTouchMove = function (e) {
        if (!this.dragging) {
            return;
        }
        this.currentY = e["pageY"] || e.touches[0].pageY;
        if (this.currentY < this.startY) {
            return;
        }
        if (e.cancelable) {
            e.preventDefault();
        }
        if ((this.currentY - this.startY) >= this.props.pullDownThreshold) {
            this.setState({
                pullToRefreshThresholdBreached: true,
            });
        }
        else {
            this.setState({
                pullToRefreshThresholdBreached: false,
            });
        }
        if (this.currentY - this.startY > this.state.maxPullDownDistance) {
            return;
        }
        this.container.style.overflow = "visible";
        this.container.style.transition = "transform 0.2s cubic-bezier(0,0,0.31,1)";
        this.container.style.transform = "translate(0px, " + (this.currentY - this.startY) + "px)";
        this.pullDown.style.visibility = "visible";
    };
    PullToRefresh.prototype.onEnd = function () {
        var _this = this;
        this.dragging = false;
        this.startY = 0;
        this.currentY = 0;
        if (!this.state.pullToRefreshThresholdBreached) {
            this.pullDown.style.visibility = this.props.startInvisible ? "hidden" : "visible";
            this.initContainer();
            return;
        }
        this.container.style.overflow = "visible";
        this.container.style.transform = "translate(0px, " + this.props.pullDownThreshold + "px)";
        this.setState({
            onRefreshing: true,
        }, function () {
            _this.props.onRefresh().then(function () {
                _this.initContainer();
                setTimeout(function () {
                    _this.setState({
                        onRefreshing: false,
                        pullToRefreshThresholdBreached: false,
                    });
                }, 200);
            });
        });
    };
    PullToRefresh.prototype.initContainer = function () {
        var _this = this;
        requestAnimationFrame(function () {
            if (_this.container) {
                _this.container.style.overflow = "auto";
                _this.container.style.transform = "none";
            }
        });
    };
    PullToRefresh.prototype.renderPullDownContent = function () {
        var _a = this.props, releaseContent = _a.releaseContent, pullDownContent = _a.pullDownContent, refreshContent = _a.refreshContent, startInvisible = _a.startInvisible;
        var _b = this.state, onRefreshing = _b.onRefreshing, pullToRefreshThresholdBreached = _b.pullToRefreshThresholdBreached;
        var content = onRefreshing ? refreshContent : pullToRefreshThresholdBreached ? releaseContent : pullDownContent;
        var contentStyle = {
            position: "absolute",
            overflow: "hidden",
            left: 0,
            right: 0,
            top: 0,
            visibility: startInvisible ? "hidden" : "visible",
        };
        return (React.createElement("div", { id: "ptr-pull-down", style: contentStyle, ref: this.pullDownRef }, content));
    };
    PullToRefresh.prototype.render = function () {
        var backgroundColor = this.props.backgroundColor;
        var containerStyle = {
            height: "auto",
            overflow: "hidden",
            WebkitOverflowScrolling: "touch",
            position: "relative",
            zIndex: 1,
        };
        if (backgroundColor) {
            containerStyle.backgroundColor = backgroundColor;
        }
        return (React.createElement("div", { id: "ptr-parent", style: containerStyle },
            this.renderPullDownContent(),
            React.createElement("div", { id: "ptr-container", ref: this.containerRef, style: containerStyle }, this.props.children)));
    };
    return PullToRefresh;
}(React.Component));
exports.PullToRefresh = PullToRefresh;
//# sourceMappingURL=PullToRefresh.js.map