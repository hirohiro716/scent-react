import React, { forwardRef, useEffect, useRef, useState } from "react";
import Popup from "./Popup.js";
import { StringObject } from "scent-typescript";
/**
 * テキストエリアの入力ダイアログのコンポーネント。
 *
 * @param showing 表示する場合はtrueを指定する。
 * @param dispatch 表示と非表示を切り替えるためのDispatch。
 * @param message メッセージ。
 * @param defaultValue 値のデフォルト値。
 * @param okFunction OKボタン押下時の処理。
 * @param cancelFunction キャンセルボタン押下時の処理。
 * @param width ダイアログの幅。
 * @param textareaStyle textarea要素へ渡すスタイル。
 * @param overlayBackgroundStyle 背景要素へ渡すスタイル。
 * @param props
 * @returns
 */
const TextareaDialog = forwardRef(({ showing, dispatch, message, defaultValue, okFunction, cancelFunction, width, height = "20vh", textareaStyle, overlayBackgroundStyle, ...props }, ref) => {
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
    const textareaInternalStyle = {};
    textareaInternalStyle.width = "100%";
    textareaInternalStyle.height = height;
    const buttonsStyle = {};
    buttonsStyle.paddingTop = "0.5em";
    buttonsStyle.display = "flex";
    buttonsStyle.flexDirection = "row";
    buttonsStyle.justifyContent = "right";
    buttonsStyle.gap = "0.5em";
    const textareaRef = useRef(null);
    const [alreadyPressed, setAlreadyPressed] = useState(false);
    const okEvent = async (e) => {
        if (alreadyPressed || textareaRef.current === null) {
            return;
        }
        setAlreadyPressed(true);
        const target = e.target;
        const button = target;
        button.disabled = true;
        await okFunction(StringObject.from(textareaRef.current.value).toString());
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
            React.createElement("textarea", { defaultValue: defaultValue, style: { ...textareaInternalStyle, ...textareaStyle }, ref: textareaRef })),
        React.createElement("div", { style: buttonsStyle },
            React.createElement("button", { type: "button", onClick: okEvent }, "OK"),
            React.createElement("button", { type: "button", onClick: cancelEvent }, "\u30AD\u30E3\u30F3\u30BB\u30EB"))));
});
export default TextareaDialog;
