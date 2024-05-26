import { Dispatch, HTMLAttributes, SetStateAction } from "react";
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
    hideCancelButton?: boolean | undefined;
    overlayBackground?: string | undefined;
    cancelFunction?: (() => Promise<void>) | undefined;
} & React.RefAttributes<HTMLDivElement>>;
export default Popup;
