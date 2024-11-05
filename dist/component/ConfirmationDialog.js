import React, { forwardRef, useEffect, useRef, useState } from "react";
import Popup from "./Popup.js";
/**
 * 確認ダイアログのコンポーネント。
 *
 * @param props
 * @returns
 */
const ConfirmationDialog = forwardRef(({ showing, dispatch, message, okFunction, cancelFunction, width, overlayBackgroundStyle, style, ...props }, ref) => {
    const preStyle = {};
    preStyle.width = "100%";
    preStyle.paddingBottom = "2em";
    preStyle.whiteSpace = "pre-wrap";
    const buttonsStyle = {};
    buttonsStyle.display = "flex";
    buttonsStyle.flexDirection = "row";
    buttonsStyle.justifyContent = "right";
    buttonsStyle.gap = "0.5em";
    const [alreadyPressed, setAlreadyPressed] = useState(false);
    const okEvent = async (e) => {
        if (alreadyPressed) {
            return;
        }
        setAlreadyPressed(true);
        const target = e.target;
        const button = target;
        button.disabled = true;
        if (okFunction) {
            try {
                await okFunction();
            }
            catch (error) {
                console.log(error);
            }
        }
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
    return (React.createElement(Popup, { showing: showing, dispatch: dispatch, width: width, isCloseOnBackgroundClick: false, closeButtonStyle: { display: "none" }, overlayBackgroundStyle: overlayBackgroundStyle, cancelFunction: cancelFunction, style: style, ref: ref, ...props },
        React.createElement("pre", { style: preStyle, tabIndex: 0, ref: preRef }, message),
        React.createElement("div", { style: buttonsStyle },
            React.createElement("button", { onClick: okEvent }, "OK"),
            React.createElement("button", { onClick: cancelEvent }, "\u30AD\u30E3\u30F3\u30BB\u30EB"))));
});
export default ConfirmationDialog;
