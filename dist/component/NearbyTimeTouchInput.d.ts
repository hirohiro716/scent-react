import React from "react";
import { CSSProperties, Dispatch, SetStateAction } from "react";
import { Datetime } from "scent-typescript";
/**
 * 初期値の付近の時刻を入力するコンポーネント。
 *
 * @param props
 * @returns
 */
declare const NearbyTimeTouchInput: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    date: Datetime | undefined;
    dispatch: Dispatch<SetStateAction<Datetime | undefined>>;
    incrementMinutes?: number;
    selectElementStyle?: CSSProperties;
    buttonElementStyle?: CSSProperties;
} & React.RefAttributes<HTMLDivElement>>;
export default NearbyTimeTouchInput;
