import React, { Dispatch, SetStateAction } from "react";
/**
 * 静止画撮影ポップアップのコンポーネント。
 *
 * @param props mimeTypeプロパティのデフォルトは"image/png"。
 * @returns
 */
declare const StillCameraPopup: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    showing: boolean;
    dispatch: Dispatch<SetStateAction<boolean>>;
    mimeType?: string | undefined;
    maximumLongSide?: number | undefined;
    callbackAfterCapturing: (canvas: HTMLCanvasElement) => Promise<void>;
    style?: React.CSSProperties | undefined;
} & React.RefAttributes<HTMLDivElement>>;
export default StillCameraPopup;
