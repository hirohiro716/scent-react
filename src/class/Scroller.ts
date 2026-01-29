import { RefObject } from "react";

/**
 * スクロール位置を記憶するクラス。
 */
export default class Scroller {

    /**
     * コンストラクタ。スクロール可能な要素のRefObjectを指定する。
     * 
     * @param scrollable 
     */
    public constructor(scrollable?: RefObject<HTMLElement | null>) {
        this.scrollable = scrollable;
    }

    private scrollable: RefObject<HTMLElement | null> | undefined;

    private top: number = 0;

    private left: number = 0;

    /**
     * 現在のwindowのスクロール位置を記憶する。
     */
    public save(): void {
        if (typeof window === "undefined") {
            return;
        }
        if (typeof this.scrollable === "undefined") {
            this.top = window.scrollY;
            this.left = window.scrollX;
        } else {
            if (this.scrollable.current) {
                this.top = this.scrollable.current.scrollTop;
                this.left = this.scrollable.current.scrollLeft;
            }
        }
    }

    /**
     * 記憶したスクロール位置を復元する。
     */
    public restore(): void {
        if (typeof window === "undefined") {
            return;
        }
        if (typeof this.scrollable === "undefined") {
            window.scrollTo(this.left, this.top);
        } else {
            if (this.scrollable.current) {
                this.scrollable.current.scrollTo(this.left, this.top);
            }
        }
    }
}
