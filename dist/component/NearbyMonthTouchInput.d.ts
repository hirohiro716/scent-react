import React from "react";
import { CSSProperties, Dispatch, SetStateAction } from "react";
import { Datetime } from "scent-typescript";
/**
 * 初期値の付近の年月を入力するコンポーネント。
 *
 * @param props
 * @returns
 */
declare const NearbyMonthTouchInput: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    date: Datetime | undefined;
    dispatch: Dispatch<SetStateAction<Datetime | undefined>>;
    inputStyle?: CSSProperties;
    buttonStyle?: CSSProperties;
} & React.RefAttributes<HTMLDivElement>>;
export default NearbyMonthTouchInput;
