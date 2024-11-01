import React, { useState } from "react";
import { CSSProperties, Dispatch, forwardRef, HTMLAttributes, ReactElement, SetStateAction, useRef } from "react";
import { Datetime, StringObject } from "scent-typescript";

type NearbyMonthTouchInputProps = HTMLAttributes<HTMLDivElement> & {
    date: Datetime | undefined,
    dispatch: Dispatch<SetStateAction<Datetime | undefined>>,
    inputStyle?: CSSProperties,
    buttonStyle?: CSSProperties,
}

/**
 * 初期値の付近の年月を入力するコンポーネント。
 * 
 * @param props 
 * @returns 
 */
const NearbyMonthTouchInput = forwardRef<HTMLDivElement, NearbyMonthTouchInputProps>(({date, dispatch, inputStyle, buttonStyle, ...props}, ref): ReactElement => {
    const internalStyle: CSSProperties = {};
    internalStyle.display = "inline-block";
    const rowStyle: CSSProperties = {};
    rowStyle.display = "flex";
    rowStyle.flexDirection = "row";
    rowStyle.alignItems = "center";
    rowStyle.gap = "0.3em";
    const inputInternalStyle: CSSProperties = {};
    inputInternalStyle.width = "5em";
    inputInternalStyle.textAlign = "center";
    const buttonInternalStyle: CSSProperties = {};
    buttonInternalStyle.width = "2em";
    const inputRef = useRef<HTMLInputElement>(null);
    const [currentMonth] = useState<Datetime>(date ? date : new Datetime());
    const goForwardMonth = () => {
        currentMonth.addMonth(1);
        dispatch(currentMonth.clone());
    }
    const goBackMonth = () => {
        currentMonth.addMonth(-1);
        dispatch(currentMonth.clone());
    }
    return (
        <div style={{...internalStyle, ...props.style}} ref={ref} {...props}>
            <div style={rowStyle}>
                <input type="text" value={StringObject.join([currentMonth.getYear(), "/", currentMonth.getMonth()]).toString()} readOnly={true} style={{...inputInternalStyle, ...inputStyle}} ref={inputRef} />
                <button onClick={goForwardMonth} style={{...buttonInternalStyle, ...buttonStyle}}>↑</button>
                <button onClick={goBackMonth} style={{...buttonInternalStyle, ...buttonStyle}}>↓</button>
            </div>
        </div>
    );
});
export default NearbyMonthTouchInput;
