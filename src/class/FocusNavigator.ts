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
    public constructor(className: string, isCyclic: boolean) {
        this.className = className;
        this.isCyclic = isCyclic
    }

    private readonly className: string;

    private readonly isCyclic: boolean;

    /**
     * 指定された要素の次の要素にフォーカスする。
     * 
     * @param currentElement 
     */
    public next(currentElement: HTMLElement): void {
        const elements = window.document.getElementsByClassName(this.className);
        let foundCurrentElement = false;
        for (let index = 0; index < elements.length; index++) {
            const element = elements.item(index) as HTMLElement;
            if (foundCurrentElement) {
                element.focus();
                return;
            }
            if (currentElement.isSameNode(element)) {
                foundCurrentElement = true;
            }
        }
        if (this.isCyclic && foundCurrentElement) {
            const firstElement = elements.item(0) as HTMLElement;
            firstElement.focus();
        }
    }

    /**
     * 指定された要素の前の要素にフォーカスする。
     * 
     * @param currentElement 
     */
    public previous(currentElement: HTMLElement): void {
        const elements = window.document.getElementsByClassName(this.className);
        let foundCurrentElement = false;
        for (let index = elements.length - 1; index >= 0; index--) {
            const element = elements.item(index) as HTMLElement;
            if (foundCurrentElement) {
                element.focus();
                return;
            }
            if (currentElement.isSameNode(element)) {
                foundCurrentElement = true;
            }
        }
        if (this.isCyclic && foundCurrentElement) {
            const lastElement = elements.item(elements.length - 1) as HTMLElement;
            lastElement.focus();
        }
    }
}
export default FocusNavigator;
