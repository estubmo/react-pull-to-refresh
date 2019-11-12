export declare const DIRECTION: Readonly<{
    up: number;
    down: number;
}>;
/**
 * Returns whether a given element or any of its ancestors (up to rootElement) is scrollable in a given direction.
 *
 * @param {!Element} element The leaf of the DOM tree to check
 * @param {!number} dir The direction (see {@link DIRECTION})
 * @returns {!boolean} Whether the element or one of its ancestors is scrollable.
 */
export declare function isTreeScrollable(element: Element, dir: number): boolean;
