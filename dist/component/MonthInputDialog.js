import React, { forwardRef, useEffect, useRef, useState } from "react";
import Popup from "./Popup";
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
    formStyle.gap = "1em";
    const inputInternalStyle = {};
    inputInternalStyle.width = "10em";
    inputInternalStyle.textAlign = "center";
    const buttonsStyle = {};
    buttonsStyle.paddingTop = "0.5em";
    buttonsStyle.display = "flex";
    buttonsStyle.flexDirection = "row";
    buttonsStyle.justifyContent = "right";
    buttonsStyle.gap = "0.5em";
    const inputRef = useRef(null);
    const [alreadyPressed, setAlreadyPressed] = useState(false);
    const okEvent = async (e) => {
        if (alreadyPressed || inputRef.current === null) {
            return;
        }
        setAlreadyPressed(true);
        const target = e.target;
        const button = target;
        button.disabled = true;
        await okFunction(inputRef.current.value);
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
            React.createElement("input", { type: "month", style: { ...inputInternalStyle, ...inputStyle }, ref: inputRef })),
        React.createElement("div", { style: buttonsStyle },
            React.createElement("button", { onClick: okEvent }, "OK"),
            React.createElement("button", { onClick: cancelEvent }, "\u30AD\u30E3\u30F3\u30BB\u30EB"))));
});
export default MonthInputDialog;
