import React, { CSSProperties, Dispatch, SetStateAction } from "react";
/**
 * 静止画撮影ポップアップのコンポーネント。
 *
 * @param props mimeTypeプロパティ。"image/png"がデフォルト。
 * @returns
 */
declare const StillCameraPopup: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    showing: boolean;
    dispatch: Dispatch<SetStateAction<boolean>>;
    mimeType?: string;
    maximumLongSide?: number;
    callbackAfterCapturing: (canvas: HTMLCanvasElement) => Promise<void>;
    style?: CSSProperties;
} & React.RefAttributes<HTMLDivElement>>;
export default StillCameraPopup;
