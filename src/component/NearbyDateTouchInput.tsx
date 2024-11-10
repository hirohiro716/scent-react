import React, { useState } from "react";
import { CSSProperties, Dispatch, forwardRef, HTMLAttributes, ReactElement, SetStateAction } from "react";
import { Datetime, StringObject } from "scent-typescript";

type NearbyDateTouchInputProps = HTMLAttributes<HTMLDivElement> & {
    date: Datetime | undefined,
    dispatch: Dispatch<SetStateAction<Datetime | undefined>>,
    inputStyle?: CSSProperties,
    buttonStyle?: CSSProperties,
}

/**
 * 初期値の付近の日付をタッチ入力するコンポーネント。
 * 
 * @param date 対象の日付。
 * @param dispatch ユーザーがボタンを押した際に日付を変更するためのDispatch。
 * @param inputStyle input要素へ渡すスタイル。
 * @param buttonStyle button要素へ渡すスタイル。
 * @param props 
 * @returns 
 */
const NearbyDateTouchInput = forwardRef<HTMLDivElement, NearbyDateTouchInputProps>(({date, dispatch, style, inputStyle, buttonStyle, ...props}, ref): ReactElement => {
    const internalStyle: CSSProperties = {};
    internalStyle.display = "inline-block";
    const rowStyle: CSSProperties = {};
    rowStyle.display = "flex";
    rowStyle.flexDirection = "row";
    rowStyle.alignItems = "stretch";
    rowStyle.gap = "0.3em";
    const inputInternalStyle: CSSProperties = {};
    inputInternalStyle.width = "5em";
    inputInternalStyle.textAlign = "center";
    const buttonInternalStyle: CSSProperties = {};
    buttonInternalStyle.width = "2em";
    const [currentDate] = useState<Datetime>(date ? date : new Datetime());
    const goForwardDay = () => {
        currentDate.addDay(1);
        dispatch(currentDate.clone());
    }
    const goBackDay = () => {
        currentDate.addDay(-1);
        dispatch(currentDate.clone());
    }
    return (
        <div style={{...internalStyle, ...style}} ref={ref} {...props}>
            <div style={rowStyle}>
                <input type="text" value={StringObject.join([currentDate.getMonth(), "/", currentDate.getDay()]).toString()} readOnly={true} style={{...inputInternalStyle, ...inputStyle}} />
                <button type="button" onClick={goForwardDay} style={{...buttonInternalStyle, ...buttonStyle}}>↑</button>
                <button type="button" onClick={goBackDay} style={{...buttonInternalStyle, ...buttonStyle}}>↓</button>
            </div>
        </div>
    );
});
export default NearbyDateTouchInput;
