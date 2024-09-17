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
    okFunction?: () => Promise<void>;
    cancelFunction?: () => Promise<void>;
    width: string;
    overlayBackground?: string;
} & React.RefAttributes<HTMLDivElement>>;
export default ConfirmationDialog;
