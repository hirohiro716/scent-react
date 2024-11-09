import React, { forwardRef, useEffect, useRef, useState } from "react";
import Popup from "./Popup.js";
import { Datetime, StringObject } from "scent-typescript";
import TimeInput from "./TimeInput.js";
/**
 * 年月日と時刻の入力ダイアログのコンポーネント。
 *
 * @param showing 表示する場合はtrueを指定する。
 * @param dispatch 表示と非表示を切り替えるためのDispatch。
 * @param message メッセージ。
 * @param defaultDatetime 日時のデフォルト値。
 * @param okFunction OKボタン押下時の処理。
 * @param cancelFunction キャンセルボタン押下時の処理。
 * @param width ダイアログの幅。
 * @param inputStyle input要素へ渡すスタイル。
 * @param overlayBackgroundStyle 背景要素へ渡すスタイル。
 * @param props
 * @returns
 */
const DatetimeInputDialog = forwardRef(({ showing, dispatch, message, defaultDatetime, okFunction, cancelFunction, width, inputStyle, overlayBackgroundStyle, ...props }, ref) => {
    const preStyle = {};
    preStyle.width = "100%";
    preStyle.paddingBottom = "1em";
    preStyle.whiteSpace = "pre-wrap";
    const formStyle = {};
    formStyle.padding = "1em 0.5em 2em";
    formStyle.display = "flex";
    formStyle.flexDirection = "row";
    formStyle.justifyContent = "right";
    formStyle.flexWrap = "wrap";
    formStyle.gap = "0.7em";
    const dateInputInternalStyle = {};
    dateInputInternalStyle.width = "10em";
    dateInputInternalStyle.textAlign = "center";
    const buttonsStyle = {};
    buttonsStyle.paddingTop = "0.5em";
    buttonsStyle.display = "flex";
    buttonsStyle.flexDirection = "row";
    buttonsStyle.justifyContent = "right";
    buttonsStyle.gap = "0.5em";
    const dateInputRef = useRef(null);
    const timeInputRef = useRef(null);
    const [alreadyPressed, setAlreadyPressed] = useState(false);
    const okEvent = async (e) => {
        if (alreadyPressed || dateInputRef.current === null || timeInputRef.current === null) {
            return;
        }
        const datetime = StringObject.from(dateInputRef.current.value).toDatetime();
        if (datetime === null) {
            return;
        }
        const hoursAndMinutes = Datetime.timeStringToHoursAndMinutes(timeInputRef.current.value);
        if (hoursAndMinutes === null) {
            return;
        }
        datetime.setHour(hoursAndMinutes.hours);
        datetime.setMinute(hoursAndMinutes.minutes);
        datetime.setSecond(0).setMillisecond(0);
        setAlreadyPressed(true);
        const target = e.target;
        const button = target;
        button.disabled = true;
        await okFunction(datetime);
        dispatch(false);
    };
    const cancelEvent = async (e) => {
        if (alreadyPressed) {
            return;
        }
        setAlreadyPressed(true);
        if (cancelFunction) {
            try {
                await cancelFunction();
            }
            catch (error) {
                console.log(error);
            }
        }
        dispatch(false);
    };
    const preRef = useRef(null);
    useEffect(() => {
        setAlreadyPressed(false);
        if (preRef.current) {
            preRef.current.focus();
        }
    }, [showing]);
    return (React.createElement(Popup, { showing: showing, dispatch: dispatch, width: width, isCloseOnBackgroundClick: false, closeButtonStyle: { display: "none" }, overlayBackgroundStyle: overlayBackgroundStyle, cancelFunction: cancelFunction, ref: ref, ...props },
        React.createElement("pre", { style: preStyle, tabIndex: 0, ref: preRef }, message),
        React.createElement("form", { style: formStyle, onSubmit: (e) => e.preventDefault() },
            React.createElement("input", { type: "date", defaultValue: defaultDatetime ? defaultDatetime.toStringOnlyDate() : Datetime.from().toStringOnlyDate(), style: { ...dateInputInternalStyle, ...inputStyle }, ref: dateInputRef }),
            React.createElement(TimeInput, { defaultDatetime: defaultDatetime ? defaultDatetime.toString() : undefined, style: inputStyle, ref: timeInputRef })),
        React.createElement("div", { style: buttonsStyle },
            React.createElement("button", { onClick: okEvent }, "OK"),
            React.createElement("button", { onClick: cancelEvent }, "\u30AD\u30E3\u30F3\u30BB\u30EB"))));
});
export default DatetimeInputDialog;
