import React, { CSSProperties, Dispatch, SetStateAction } from "react";
/**
 * 画像ビューアーのコンポーネント。
 *
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
