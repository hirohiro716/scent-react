import React, { useState } from "react";
import { forwardRef } from "react";
import { Datetime, StringObject } from "scent-typescript";
/**
 * 初期値の付近の年月をタッチ入力するコンポーネント。
 *
 * @param date 対象の日付。
 * @param dispatch ユーザーがボタンを押した際に年月を変更するためのDispatch。
 * @param inputStyle input要素へ渡すスタイル。
 * @param buttonStyle button要素へ渡すスタイル。
 * @param props
 * @returns
 */
const NearbyMonthTouchInput = forwardRef(({ date, dispatch, style, inputStyle, buttonStyle, ...props }, ref) => {
    const internalStyle = {};
    internalStyle.display = "inline-block";
    const rowStyle = {};
    rowStyle.display = "flex";
    rowStyle.flexDirection = "row";
    rowStyle.alignItems = "stretch";
    rowStyle.gap = "0.3em";
    const inputInternalStyle = {};
    inputInternalStyle.width = "6em";
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
    return (React.createElement("div", { style: { ...internalStyle, ...style }, ref: ref, ...props },
        React.createElement("div", { style: rowStyle },
            React.createElement("input", { type: "text", value: StringObject.join([currentMonth.getYear(), "/", currentMonth.getMonth()]).toString(), readOnly: true, style: { ...inputInternalStyle, ...inputStyle } }),
            React.createElement("button", { type: "button", onClick: goForwardMonth, style: { ...buttonInternalStyle, ...buttonStyle } }, "\u2191"),
            React.createElement("button", { type: "button", onClick: goBackMonth, style: { ...buttonInternalStyle, ...buttonStyle } }, "\u2193"))));
});
export default NearbyMonthTouchInput;
