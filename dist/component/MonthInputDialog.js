import React, { forwardRef, useEffect, useRef, useState } from "react";
import Popup from "./Popup";
import { StringObject } from "scent-typescript";
/**
 * 年月の入力ダイアログのコンポーネント。
 *
 * @param props
 * @returns
 */
const MonthInputDialog = forwardRef(({ showing, dispatch, message, defaultValue, okFunction, cancelFunction, width, inputStyle, overlayBackgroundStyle, ...props }, ref) => {
    const preStyle = {};
    preStyle.width = "100%";
    preStyle.paddingBottom = "1em";
    preStyle.whiteSpace = "pre-wrap";
    const formStyle = {};
    formStyle.maxHeight = "calc(100vh - 20em)";
    formStyle.marginBottom = "1em";
    formStyle.padding = "1em 0.5em";
    formStyle.display = "flex";
    formStyle.flexDirection = "row";
    formStyle.justifyContent = "right";
    formStyle.flexWrap = "wrap";
    formStyle.gap = "0.2em";
    const yearAndMonthInputInternalStyle = {};
    yearAndMonthInputInternalStyle.width = "10em";
    yearAndMonthInputInternalStyle.textAlign = "center";
    const yearInputInternalStyle = {};
    yearInputInternalStyle.width = "6em";
    yearInputInternalStyle.textAlign = "center";
    const monthInputInternalStyle = {};
    monthInputInternalStyle.width = "4.5em";
    monthInputInternalStyle.textAlign = "center";
    const buttonsStyle = {};
    buttonsStyle.paddingTop = "0.5em";
    buttonsStyle.display = "flex";
    buttonsStyle.flexDirection = "row";
    buttonsStyle.justifyContent = "right";
    buttonsStyle.gap = "0.5em";
    const yearAndMonthInputRef = useRef(null);
    const yearInputRef = useRef(null);
    const monthInputRef = useRef(null);
    const [alreadyPressed, setAlreadyPressed] = useState(false);
    const okEvent = async (e) => {
        if (alreadyPressed) {
            return;
        }
        const yearAndMonth = new StringObject();
        if (supportsMonthType) {
            if (yearAndMonthInputRef.current !== null) {
                yearAndMonth.append(yearAndMonthInputRef.current.value);
            }
        }
        else {
            if (yearInputRef.current !== null && monthInputRef.current !== null) {
                const year = StringObject.from(yearInputRef.current.value).toNumber();
                const month = StringObject.from(monthInputRef.current.value).toNumber();
                if (year !== null && year > 0 && month !== null && month >= 1 && month <= 12) {
                    yearAndMonth.append(year).paddingLeft(4, "0");
                    yearAndMonth.append("-");
                    yearAndMonth.append(StringObject.from(month).paddingLeft(2, "0"));
                }
            }
        }
        if (yearAndMonth.length() === 0) {
            return;
        }
        setAlreadyPressed(true);
        const target = e.target;
        const button = target;
        button.disabled = true;
        await okFunction(yearAndMonth.toString());
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
    const [supportsMonthType, setSupportsMonthType] = useState(true);
    useEffect(() => {
        setAlreadyPressed(false);
        if (yearAndMonthInputRef.current) {
            yearAndMonthInputRef.current.focus();
            if (StringObject.from(yearAndMonthInputRef.current.type).equals("month") === false) {
                setSupportsMonthType(false);
            }
        }
        if (yearInputRef.current) {
            yearInputRef.current.focus();
        }
    }, [showing, supportsMonthType]);
    return (React.createElement(Popup, { showing: showing, dispatch: dispatch, width: width, isCloseOnBackgroundClick: false, closeButtonStyle: { display: "none" }, overlayBackgroundStyle: overlayBackgroundStyle, cancelFunction: cancelFunction, ref: ref, ...props },
        React.createElement("pre", { style: preStyle, tabIndex: 0 }, message),
        React.createElement("form", { style: formStyle, onSubmit: (e) => e.preventDefault() },
            supportsMonthType &&
                React.createElement("input", { type: "month", defaultValue: defaultValue, style: { ...yearAndMonthInputInternalStyle, ...inputStyle }, ref: yearAndMonthInputRef }),
            supportsMonthType === false &&
                React.createElement(React.Fragment, null,
                    React.createElement("input", { type: "number", min: 1, max: 9999, defaultValue: StringObject.from(defaultValue).toString().includes("-") ? StringObject.from(defaultValue).splitToStrings("-")[0] : "", style: { ...yearInputInternalStyle, ...inputStyle }, ref: yearInputRef }),
                    "/",
                    React.createElement("input", { type: "number", min: 1, max: 12, defaultValue: StringObject.from(defaultValue).toString().includes("-") ? StringObject.from(defaultValue).splitToStrings("-")[1] : "", style: { ...monthInputInternalStyle, ...inputStyle }, ref: monthInputRef }))),
        React.createElement("div", { style: buttonsStyle },
            React.createElement("button", { onClick: okEvent }, "OK"),
            React.createElement("button", { onClick: cancelEvent }, "\u30AD\u30E3\u30F3\u30BB\u30EB"))));
});
export default MonthInputDialog;
