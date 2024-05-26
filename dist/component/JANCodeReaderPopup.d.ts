import React, { Dispatch, SetStateAction } from "react";
/**
 * バーコード読み取りポップアップのコンポーネント。
 *
 * @param props
 * @returns
 */
declare const JANCodeReaderPopup: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    showing: boolean;
    dispatch: Dispatch<SetStateAction<boolean>>;
    callbackAfterReading: (result: string) => Promise<void>;
    validator?: ((rawString: string) => boolean) | undefined;
    style?: React.CSSProperties | undefined;
} & React.RefAttributes<HTMLDivElement>>;
export default JANCodeReaderPopup;
