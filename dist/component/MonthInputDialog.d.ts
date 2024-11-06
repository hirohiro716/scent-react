import React, { CSSProperties, Dispatch, SetStateAction } from "react";
/**
 * 年月の入力ダイアログのコンポーネント。
 *
 * @param props
 * @returns
 */
declare const MonthInputDialog: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    showing: boolean | undefined;
    dispatch: Dispatch<SetStateAction<boolean>>;
    message: string | undefined;
    defaultValue?: string;
    okFunction: (value: string) => Promise<void>;
    cancelFunction?: () => Promise<void>;
    width: string;
    inputStyle?: CSSProperties;
    overlayBackgroundStyle?: CSSProperties;
} & React.RefAttributes<HTMLDivElement>>;
export default MonthInputDialog;
