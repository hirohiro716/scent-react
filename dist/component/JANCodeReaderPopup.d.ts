import React, { Dispatch, SetStateAction } from "react";
/**
 * バーコード読み取りポップアップのコンポーネント。
 *
 * @param showing 表示する場合はtrueを指定する。
 * @param dispatch 表示と非表示を切り替えるためのDispatch。
 * @param callbackAfterReading 読み取った後の処理。
 * @param validator バーコードが正しいか判定するためのコールバック。このメソッドがtrueを返さない限り読み取りは完了しない。
 * @param props
 * @returns
 */
declare const JANCodeReaderPopup: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    showing: boolean;
    dispatch: Dispatch<SetStateAction<boolean>>;
    callbackAfterReading: (result: string) => Promise<void>;
    validator?: (rawString: string) => boolean;
} & React.RefAttributes<HTMLDivElement>>;
export default JANCodeReaderPopup;
