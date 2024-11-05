import { CSSProperties, Dispatch, HTMLAttributes, SetStateAction } from "react";
import React from "react";
/**
 * ポップアップを表示するバナーのコンポーネント。
 *
 * @param props
 * @returns
 */
declare const Popup: React.ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & {
    showing: boolean | undefined;
    dispatch: Dispatch<SetStateAction<boolean>>;
    width: string;
    isCloseOnBackgroundClick?: boolean;
    closeButtonStyle?: CSSProperties;
    overlayBackgroundStyle?: CSSProperties;
    cancelFunction?: () => Promise<void>;
} & React.RefAttributes<HTMLDivElement>>;
export default Popup;
