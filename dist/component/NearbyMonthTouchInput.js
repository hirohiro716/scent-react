import React, { useState } from "react";
import { forwardRef } from "react";
import { Datetime, StringObject } from "scent-typescript";
/**
 * 初期値の付近の年月を入力するコンポーネント。
 *
 * @param props
 * @returns
 */
const NearbyMonthTouchInput = forwardRef(({ date, dispatch, inputStyle, buttonStyle, ...props }, ref) => {
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
    const [currentMonth] = useState(date ? date : new Datetime());
    const goForwardMonth = () => {
        currentMonth.addMonth(1);
        dispatch(currentMonth.clone());
    };
    const goBackMonth = () => {
        currentMonth.addMonth(-1);
        dispatch(currentMonth.clone());
    };
    return (React.createElement("div", { style: { ...internalStyle, ...props.style }, ref: ref, ...props },
        React.createElement("div", { style: rowStyle },
            React.createElement("input", { type: "text", value: StringObject.join([currentMonth.getYear(), "/", currentMonth.getMonth()]).toString(), readOnly: true, style: { ...inputInternalStyle, ...inputStyle } }),
            React.createElement("button", { onClick: goForwardMonth, style: { ...buttonInternalStyle, ...buttonStyle } }, "\u2191"),
            React.createElement("button", { onClick: goBackMonth, style: { ...buttonInternalStyle, ...buttonStyle } }, "\u2193"))));
});
export default NearbyMonthTouchInput;
