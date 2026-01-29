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
    constructor(scrollable?: RefObject<HTMLElement | null>);
    private scrollable;
    private top;
    private left;
    /**
     * 現在のwindowのスクロール位置を記憶する。
     */
    save(): void;
    /**
     * 記憶したスクロール位置を復元する。
     */
    restore(): void;
}
