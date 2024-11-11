import React, { CSSProperties, Dispatch, HTMLAttributes, MouseEvent, ReactElement, SetStateAction, forwardRef, useEffect, useRef, useState } from "react";
import Popup from "./Popup.js";
import { StringObject } from "scent-typescript";

type TextareaDialogProps = HTMLAttributes<HTMLDivElement> & {
    showing: boolean | undefined,
    dispatch: Dispatch<SetStateAction<boolean>>,
    message: string | undefined,
    defaultValue?: string,
    okFunction: (valule: string) => Promise<void>,
    cancelFunction?: () => Promise<void>,
    width: string,
    height?: string,
    textareaStyle?: CSSProperties,
    overlayBackgroundStyle?: CSSProperties,
}

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
const TextareaDialog = forwardRef<HTMLDivElement, TextareaDialogProps>(({showing, dispatch, message, defaultValue, okFunction, cancelFunction, width, height = "20vh", textareaStyle, overlayBackgroundStyle, ...props}, ref): ReactElement => {
    const preStyle: CSSProperties = {};
    preStyle.width = "100%";
    preStyle.paddingBottom = "1em";
    preStyle.whiteSpace = "pre-wrap";
    const formStyle: CSSProperties = {};
    formStyle.padding = "1em 0.5em 2em";
    formStyle.display = "flex";
    formStyle.flexDirection = "row";
    formStyle.justifyContent = "right";
    formStyle.flexWrap = "wrap";
    formStyle.gap = "0.7em";
    const textareaInternalStyle: CSSProperties = {};
    textareaInternalStyle.width = "100%";
    textareaInternalStyle.height = height;
    const buttonsStyle: CSSProperties = {};
    buttonsStyle.paddingTop = "0.5em";
    buttonsStyle.display = "flex";
    buttonsStyle.flexDirection = "row";
    buttonsStyle.justifyContent = "right";
    buttonsStyle.gap = "0.5em";
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [alreadyPressed, setAlreadyPressed] = useState<boolean>(false);
    const okEvent = async (e: MouseEvent) => {
        if (alreadyPressed || textareaRef.current === null) {
            return;
        }
        setAlreadyPressed(true);
        const target: any = e.target;
        const button: HTMLButtonElement = target;
        button.disabled = true;
        await okFunction(StringObject.from(textareaRef.current.value).toString());
        dispatch(false);
    }
    const cancelEvent =  async (e: MouseEvent) => {
        if (alreadyPressed) {
            return;
        }
        setAlreadyPressed(true);
        if (cancelFunction) {
            try {
                await cancelFunction();
            } catch (error: any) {
                console.log(error);
            }
        }
        dispatch(false);
    }
    const preRef = useRef<HTMLPreElement>(null);
    useEffect(() => {
        setAlreadyPressed(false);
        if (preRef.current) {
            preRef.current.focus();
        }
    }, [showing]);
    return (
        <Popup showing={showing} dispatch={dispatch} width={width} isCloseOnBackgroundClick={false} closeButtonStyle={{display:"none"}} overlayBackgroundStyle={overlayBackgroundStyle} cancelFunction={cancelFunction} ref={ref} {...props}>
            <pre style={preStyle} tabIndex={0} ref={preRef}>{message}</pre>
            <form style={formStyle} onSubmit={(e) => e.preventDefault()}>
                <textarea defaultValue={defaultValue} style={{...textareaInternalStyle, ...textareaStyle}} ref={textareaRef} />
            </form>
            <div style={buttonsStyle}>
                <button type="button" onClick={okEvent}>OK</button>
                <button type="button" onClick={cancelEvent}>キャンセル</button>
            </div>
        </Popup>
    );
});
export default TextareaDialog;
