import React, { useState } from "react";
import { forwardRef } from "react";
import { Datetime, StringObject } from "scent-typescript";
/**
 * 初期値の付近の時刻をタッチ入力するコンポーネント。
 *
 * @param date 対象の日時。
 * @param dispatch ユーザーがボタンを押した際に時刻を変更するためのDispatch。
 * @param incrementMinutes ボタン押下で加減算する分。初期値は10分。
 * @param selectElementStyle select要素へ渡すスタイル。
 * @param buttonElementStyle button要素へ渡すスタイル。
 * @param props
 * @returns
 */
const NearbyTimeTouchInput = forwardRef(({ date, dispatch, incrementMinutes = 10, style, selectElementStyle: inputStyle, buttonElementStyle: buttonStyle, ...props }, ref) => {
    const internalStyle = {};
    internalStyle.display = "inline-block";
    const rowStyle = {};
    rowStyle.display = "flex";
    rowStyle.flexDirection = "row";
    rowStyle.alignItems = "stretch";
    rowStyle.gap = "0.3em";
    const selectElementInternalStyle = {};
    selectElementInternalStyle.width = "5em";
    selectElementInternalStyle.textAlign = "center";
    const buttonElementInternalStyle = {};
    buttonElementInternalStyle.width = "2em";
    const [currentTime] = useState(date ? date : new Datetime());
    const hourChangeEventHandler = (event) => {
        const hour = StringObject.from(event.currentTarget.value).toNumber();
        if (hour !== null) {
            currentTime.setHour(hour);
            dispatch(currentTime.clone());
        }
    };
    const minuteChangeEventHandler = (event) => {
        const minute = StringObject.from(event.currentTarget.value).toNumber();
        if (minute !== null) {
            currentTime.setMinute(minute);
            dispatch(currentTime.clone());
        }
    };
    const goForwardMinute = () => {
        currentTime.addMinute(incrementMinutes);
        dispatch(currentTime.clone());
    };
    const goBackMinute = () => {
        currentTime.addMinute(incrementMinutes * -1);
        dispatch(currentTime.clone());
    };
    const dialogID = new StringObject(props.id);
    if (dialogID.length() === 0) {
        dialogID.append("nearby-time-touch-input");
    }
    return (React.createElement("div", { style: { ...internalStyle, ...style }, ref: ref, ...props },
        React.createElement("div", { style: rowStyle },
            React.createElement("select", { onChange: hourChangeEventHandler, value: currentTime.getHour() }, [...Array(24)].map((value, hour) => {
                return (React.createElement("option", { key: dialogID.append("-hour-option").append(hour).toString(), value: hour },
                    hour,
                    "\u6642"));
            })),
            React.createElement("select", { onChange: minuteChangeEventHandler, value: currentTime.getMinute() }, [...Array(60)].map((value, minute) => {
                return (React.createElement("option", { key: dialogID.append("-minute-option").append(minute).toString(), value: minute },
                    minute,
                    "\u5206"));
            })),
            React.createElement("button", { onClick: goForwardMinute, style: { ...buttonElementInternalStyle, ...buttonStyle } }, "\u2191"),
            React.createElement("button", { onClick: goBackMinute, style: { ...buttonElementInternalStyle, ...buttonStyle } }, "\u2193"))));
});
export default NearbyTimeTouchInput;
