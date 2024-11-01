import React, { useState } from "react";
import { CSSProperties, Dispatch, forwardRef, HTMLAttributes, ReactElement, SetStateAction, useRef } from "react";
import { Datetime, StringObject } from "scent-typescript";

type NearbyDateTouchInputProps = HTMLAttributes<HTMLDivElement> & {
    date: Datetime | undefined,
    dispatch: Dispatch<SetStateAction<Datetime | undefined>>,
    inputStyle?: CSSProperties,
    buttonStyle?: CSSProperties,
}

/**
 * 初期値の付近の日付を入力するコンポーネント。
 * 
 * @param props 
 * @returns 
 */
const NearbyDateTouchInput = forwardRef<HTMLDivElement, NearbyDateTouchInputProps>(({date, dispatch, inputStyle, buttonStyle, ...props}, ref): ReactElement => {
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
        <div style={{...internalStyle, ...props.style}} ref={ref} {...props}>
            <div style={rowStyle}>
                <input type="text" value={StringObject.join([currentDate.getMonth(), "/", currentDate.getDay()]).toString()} readOnly={true} style={{...inputInternalStyle, ...inputStyle}} />
                <button onClick={goForwardDay} style={{...buttonInternalStyle, ...buttonStyle}}>↑</button>
                <button onClick={goBackDay} style={{...buttonInternalStyle, ...buttonStyle}}>↓</button>
            </div>
        </div>
    );
});
export default NearbyDateTouchInput;
