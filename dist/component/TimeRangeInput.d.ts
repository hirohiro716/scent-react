import React, { Dispatch, HTMLAttributes, SetStateAction } from "react";
type TimeRangeInputProps = HTMLAttributes<HTMLDivElement> & {
    value: string[] | undefined;
    dispatch: Dispatch<SetStateAction<string[] | undefined>>;
};
/**
 * 時間範囲を入力するコンポーネント。
 *
 * @param value 時数の範囲。
 * @param dispatch 時数の範囲を変更するためのDispatch。
 * @param props
 * @returns
 */
declare const TimeRangeInput: ({ value, dispatch, style, ...props }: TimeRangeInputProps) => React.JSX.Element;
export default TimeRangeInput;
