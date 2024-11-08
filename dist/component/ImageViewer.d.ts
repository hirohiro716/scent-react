import React, { CSSProperties, Dispatch, SetStateAction } from "react";
/**
 * 画像ビューアーのコンポーネント。
 *
 * @param src 表示する画像のURL。
 * @param dispatch 表示と非表示を切り替えるためのDispatch。
 * @param isCloseOnBackgroundClick 背景クリックで画像を閉じる場合はtrue。
 * @param closeButtonStyle 閉じるボタン要素へ渡すスタイル。
 * @param overlayBackgroundStyle 背景要素へ渡すスタイル。
 * @param props
 * @returns
 */
declare const ImageViewer: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    src: string | undefined;
    dispatch: Dispatch<SetStateAction<string | undefined>>;
    isCloseOnBackgroundClick?: boolean;
    closeButtonStyle?: CSSProperties;
    overlayBackgroundStyle?: CSSProperties;
} & React.RefAttributes<HTMLDivElement>>;
export default ImageViewer;
