/**
 * スクロール位置を記憶するクラス。
 */
class Scroller {
    /**
     * コンストラクタ。スクロール可能な要素のRefObjectを指定する。
     *
     * @param scrollable
     */
    constructor(scrollable) {
        this.top = 0;
        this.left = 0;
        this.scrollable = scrollable;
    }
    /**
     * 現在のwindowのスクロール位置を記憶する。
     */
    save() {
        if (typeof window === "undefined") {
            return;
        }
        if (typeof this.scrollable === "undefined") {
            this.top = window.scrollY;
            this.left = window.scrollX;
        }
        else {
            if (this.scrollable.current) {
                this.top = this.scrollable.current.scrollTop;
                this.left = this.scrollable.current.scrollLeft;
            }
        }
    }
    /**
     * 記憶したスクロール位置を復元する。
     */
    restore() {
        if (typeof window === "undefined") {
            return;
        }
        if (typeof this.scrollable === "undefined") {
            window.scrollTo(this.left, this.top);
        }
        else {
            if (this.scrollable.current) {
                this.scrollable.current.scrollTo(this.left, this.top);
            }
        }
    }
}
export default Scroller;
