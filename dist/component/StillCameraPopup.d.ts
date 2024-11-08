import React, { Dispatch, SetStateAction } from "react";
/**
 * 静止画撮影ポップアップのコンポーネント。
 *
 * @param showing 表示する場合はtrueを指定する。
 * @param dispatch 表示と非表示を切り替えるためのDispatch。
 * @param mimeType メディア種別。"image/png"がデフォルト。
 * @param maximumLongSide 画像の最大長辺サイズ。
 * @param callbackAfterCapturing キャプチャ後の処理。
 * @param props
 * @returns
 */
declare const StillCameraPopup: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    showing: boolean;
    dispatch: Dispatch<SetStateAction<boolean>>;
    mimeType?: string;
    maximumLongSide?: number;
    callbackAfterCapturing: (canvas: HTMLCanvasElement) => Promise<void>;
} & React.RefAttributes<HTMLDivElement>>;
export default StillCameraPopup;
