import React, { CSSProperties, Dispatch, SetStateAction } from "react";
import { Datetime } from "scent-typescript";
/**
 * 年月日と時刻の入力ダイアログのコンポーネント。
 *
 * @param props
 * @returns
 */
declare const DatetimeInputDialog: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    showing: boolean | undefined;
    dispatch: Dispatch<SetStateAction<boolean>>;
    message: string | undefined;
    defaultDatetime?: Datetime;
    okFunction: (datetime: Datetime) => Promise<void>;
    cancelFunction?: () => Promise<void>;
    width: string;
    inputStyle?: CSSProperties;
    overlayBackgroundStyle?: CSSProperties;
} & React.RefAttributes<HTMLDivElement>>;
export default DatetimeInputDialog;
