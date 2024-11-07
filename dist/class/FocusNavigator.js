/**
 * フォーカスをナビゲートするクラス。
 */
class FocusNavigator {
    /**
     * コンストラクタ。フォーカスさせる要素のクラス名を指定する。
     *
     * @param className
     * @param isCyclic 循環する場合はtrueを指定。
     */
    constructor(className, isCyclic) {
        this.className = className;
        this.isCyclic = isCyclic;
    }
    /**
     * 指定された要素の次の要素にフォーカスする。
     *
     * @param currentElement
     */
    next(currentElement) {
        const elements = window.document.getElementsByClassName(this.className);
        let foundCurrentElement = false;
        for (let index = 0; index < elements.length; index++) {
            const element = elements.item(index);
            if (foundCurrentElement) {
                element.focus();
                return;
            }
            if (currentElement.isSameNode(element)) {
                foundCurrentElement = true;
            }
        }
        if (this.isCyclic && foundCurrentElement) {
            const firstElement = elements.item(0);
            firstElement.focus();
        }
    }
    /**
     * 指定された要素の前の要素にフォーカスする。
     *
     * @param currentElement
     */
    previous(currentElement) {
        const elements = window.document.getElementsByClassName(this.className);
        let foundCurrentElement = false;
        for (let index = elements.length - 1; index >= 0; index--) {
            const element = elements.item(index);
            if (foundCurrentElement) {
                element.focus();
                return;
            }
            if (currentElement.isSameNode(element)) {
                foundCurrentElement = true;
            }
        }
        if (this.isCyclic && foundCurrentElement) {
            const lastElement = elements.item(elements.length - 1);
            lastElement.focus();
        }
    }
}
export default FocusNavigator;
