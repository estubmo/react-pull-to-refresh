"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DIRECTION = Object.freeze({
    up: -1,
    down: 1,
});
function isOverflowScrollable(element) {
    var overflowType = getComputedStyle(element).overflowY;
    if (element === document.scrollingElement && overflowType === "visible") {
        return true;
    }
    if (overflowType !== "scroll" && overflowType !== "auto") {
        return false;
    }
    return true;
}
/**
 * Returns whether a given element is scrollable in a given direction.
 * This only checks this element, not any of its ancestors.
 *
 * @param {!Element} element The DOM element to check
 * @param {!number} direction The direction (see {@link DIRECTION})
 * @returns {!boolean} Whether the element is scrollable
 */
function isScrollable(element, direction) {
    if (!isOverflowScrollable(element)) {
        return false;
    }
    if (direction === exports.DIRECTION.down) {
        var bottomScroll = element.scrollTop + element.clientHeight;
        return bottomScroll < element.scrollHeight;
    }
    if (direction === exports.DIRECTION.up) {
        return element.scrollTop > 0;
    }
    throw new Error("unsupported direction");
}
/**
 * Returns whether a given element or any of its ancestors (up to rootElement) is scrollable in a given direction.
 *
 * @param {!Element} element The leaf of the DOM tree to check
 * @param {!number} dir The direction (see {@link DIRECTION})
 * @returns {!boolean} Whether the element or one of its ancestors is scrollable.
 */
function isTreeScrollable(element, dir) {
    if (isScrollable(element, dir)) {
        return true;
    }
    // if a body is overflow: hidden, scrolling will be disabled even though scrollingElement will report that it is not.
    if (element === document.body && getComputedStyle(document.body).overflowY === "hidden") {
        return false;
    }
    if (element.parentElement == null) {
        return false;
    }
    return isTreeScrollable(element.parentElement, dir);
}
exports.isTreeScrollable = isTreeScrollable;
//# sourceMappingURL=isScrollable.js.map