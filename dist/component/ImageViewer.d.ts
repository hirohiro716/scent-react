import React, { Dispatch, SetStateAction } from "react";
/**
 * 画像ビューアーのコンポーネント。
 *
 * @param props
 * @returns
 */
declare const ImageViewer: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    src: string | undefined;
    dispatch: Dispatch<SetStateAction<string | undefined>>;
    style?: React.CSSProperties | undefined;
    overlayBackground?: string | undefined;
} & React.RefAttributes<HTMLDivElement>>;
export default ImageViewer;
