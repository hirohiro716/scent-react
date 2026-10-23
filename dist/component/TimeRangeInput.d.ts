import React, { Dispatch, SetStateAction } from "react";
/**
 * 時間範囲を入力するコンポーネント。
 *
 * @param value 時数の範囲。
 * @param dispatch 時数の範囲を変更するためのDispatch。
 * @param props
 * @returns
 */
declare const TimeRangeInput: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    value: string[] | undefined;
    dispatch: Dispatch<SetStateAction<string[] | undefined>>;
} & React.RefAttributes<HTMLDivElement>>;
export default TimeRangeInput;
