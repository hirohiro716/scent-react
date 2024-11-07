/**
 * フォーカスを循環させるクラス。
 */
declare class FocusCycler {
    /**
     * コンストラクタ。フォーカスを循環させる要素のクラス名を指定する。
     *
     * @param className
     */
    constructor(className: string);
    private readonly className;
    /**
     * 指定された要素の次の要素にフォーカスする。
     *
     * @param currentElement
     */
    next(currentElement: HTMLElement): void;
    previous(currentElement: HTMLElement): void;
}
export default FocusCycler;
