import { Datetime } from "scent-typescript";
import React from "react";
/**
 * 時刻を入力するコンポーネント。
 *
 * @param props
 * @returns
 */
declare const TimeInput: React.ForwardRefExoticComponent<React.InputHTMLAttributes<HTMLInputElement> & {
    defaultDatetime: Datetime | undefined | null;
} & React.RefAttributes<HTMLInputElement>>;
export default TimeInput;
