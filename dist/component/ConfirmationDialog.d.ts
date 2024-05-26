import React, { Dispatch, SetStateAction } from "react";
/**
 * 確認ダイアログのコンポーネント。
 *
 * @param props
 * @returns
 */
declare const ConfirmationDialog: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    showing: boolean | undefined;
    dispatch: Dispatch<SetStateAction<boolean>>;
    message: string | undefined;
    okFunction?: (() => Promise<void>) | undefined;
    cancelFunction?: (() => Promise<void>) | undefined;
    width: string;
    overlayBackground?: string | undefined;
} & React.RefAttributes<HTMLDivElement>>;
export default ConfirmationDialog;
