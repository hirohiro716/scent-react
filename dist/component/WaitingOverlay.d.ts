import React, { Dispatch, SetStateAction } from "react";
/**
 * 待機中のオーバーレイコンポーネント。
 *
 * @param props
 * @returns
 */
declare const WaitingOverlay: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    showing: boolean;
    dispatch: Dispatch<SetStateAction<boolean>>;
    width?: string;
    overlayBackground?: string;
} & React.RefAttributes<HTMLDivElement>>;
export default WaitingOverlay;
