import * as React from "react";
export interface PullToRefreshProps {
    pullDownContent: JSX.Element;
    releaseContent: JSX.Element;
    refreshContent: JSX.Element;
    pullDownThreshold: number;
    onRefresh: () => Promise<any>;
    triggerHeight?: number | "auto";
    backgroundColor?: string;
    startInvisible?: boolean;
}
export interface PullToRefreshState {
    pullToRefreshThresholdBreached: boolean;
    maxPullDownDistance: number;
    onRefreshing: boolean;
}
export declare class PullToRefresh extends React.Component<PullToRefreshProps, PullToRefreshState> {
    private container;
    private containerRef;
    private pullDown;
    private pullDownRef;
    private dragging;
    private startY;
    private currentY;
    constructor(props: Readonly<PullToRefreshProps>);
    componentDidMount(): void;
    componentWillUnmount(): void;
    private onTouchStart;
    private onTouchMove;
    private onEnd;
    private initContainer;
    private renderPullDownContent;
    render(): JSX.Element;
}
