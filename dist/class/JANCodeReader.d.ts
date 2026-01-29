import { RefObject } from "react";
/**
 * バーコードリーダーのクラス。
 */
export default class JANCodeReader {
    /**
     * コンストラクタ。プレビューを表示するHTMLDivElementのRefObjectを指定する。
     *
     * @param refObject
     */
    constructor(refObject: RefObject<HTMLDivElement | null>);
    private refObject;
    private validator;
    /**
     * 読み取り結果を検証するコールバックをセットする。このコールバックの結果がtrueの場合のみ、読み取り結果が処理される。
     *
     * @param validator
     */
    setValidator(validator: (rawString: string) => boolean): void;
    private htmlVideoElement;
    private divDefaultChildNodes;
    /**
     * 読み取りを開始する。内部で生成されるHTMLVideoElementに対して処理が必要ならコールバックを指定する。
     *
     * @param callbackForVideoElement
     * @returns
     */
    start(callbackForVideoElement?: (video: HTMLVideoElement) => void): Promise<string>;
    /**
     * 読み取りを中止する。
     */
    stop(): void;
}
