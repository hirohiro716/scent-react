/**
 * フォーカスをナビゲートするクラス。
 */
export default class FocusNavigator {
    /**
     * コンストラクタ。フォーカスさせる要素のクラス名を指定する。
     *
     * @param className
     * @param isCyclic 循環する場合はtrueを指定。
     */
    constructor(className: string, isCyclic: boolean);
    private readonly className;
    private readonly isCyclic;
    /**
     * 指定された要素の次の要素にフォーカスする。
     *
     * @param currentElement
     */
    next(currentElement: HTMLElement): void;
    /**
     * 指定された要素の前の要素にフォーカスする。
     *
     * @param currentElement
     */
    previous(currentElement: HTMLElement): void;
}
