import React from "react";
import { CSSProperties, Dispatch, SetStateAction } from "react";
import { Datetime } from "scent-typescript";
/**
 * 初期値の付近の日付を入力するコンポーネント。
 *
 * @param props
 * @returns
 */
declare const NearbyDateInput: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    date: Datetime | undefined;
    dispatch: Dispatch<SetStateAction<Datetime | undefined>>;
    inputStyle?: CSSProperties;
    buttonStyle?: CSSProperties;
} & React.RefAttributes<HTMLDivElement>>;
export default NearbyDateInput;
