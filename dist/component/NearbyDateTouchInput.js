import React, { useState } from "react";
import { forwardRef, useRef } from "react";
import { Datetime, StringObject } from "scent-typescript";
/**
 * 初期値の付近の日付を入力するコンポーネント。
 *
 * @param props
 * @returns
 */
const NearbyDateTouchInput = forwardRef(({ date, dispatch, inputStyle, buttonStyle, ...props }, ref) => {
    const internalStyle = {};
    internalStyle.display = "inline-block";
    const rowStyle = {};
    rowStyle.display = "flex";
    rowStyle.flexDirection = "row";
    rowStyle.alignItems = "center";
    rowStyle.gap = "0.3em";
    const inputInternalStyle = {};
    inputInternalStyle.width = "5em";
    inputInternalStyle.textAlign = "center";
    const buttonInternalStyle = {};
    buttonInternalStyle.width = "2em";
    const inputRef = useRef(null);
    const [currentDate] = useState(date ? date : new Datetime());
    const goForwardDay = () => {
        currentDate.addDay(1);
        dispatch(currentDate.clone());
    };
    const goBackDay = () => {
        currentDate.addDay(-1);
        dispatch(currentDate.clone());
    };
    return (React.createElement("div", { style: { ...internalStyle, ...props.style }, ref: ref, ...props },
        React.createElement("div", { style: rowStyle },
            React.createElement("input", { type: "text", value: StringObject.join([currentDate.getMonth(), "/", currentDate.getDay()]).toString(), readOnly: true, style: { ...inputInternalStyle, ...inputStyle }, ref: inputRef }),
            React.createElement("button", { onClick: goForwardDay, style: { ...buttonInternalStyle, ...buttonStyle } }, "\u2191"),
            React.createElement("button", { onClick: goBackDay, style: { ...buttonInternalStyle, ...buttonStyle } }, "\u2193"))));
});
export default NearbyDateTouchInput;
