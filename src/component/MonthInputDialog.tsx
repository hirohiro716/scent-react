import React, { CSSProperties, Dispatch, HTMLAttributes, MouseEvent, ReactElement, SetStateAction, forwardRef, useEffect, useRef, useState } from "react";
import Popup from "./Popup";

type MonthInputDialogProps = HTMLAttributes<HTMLDivElement> & {
    showing: boolean | undefined,
    dispatch: Dispatch<SetStateAction<boolean>>,
    message: string | undefined,
    defaultValue?: string,
    okFunction: (value: string) => Promise<void>,
    cancelFunction?: () => Promise<void>,
    width: string,
    inputStyle?: CSSProperties,
    overlayBackgroundStyle?: CSSProperties,
}

/**
 * 年月の入力ダイアログのコンポーネント。
 * 
 * @param props 
 * @returns 
 */
const MonthInputDialog = forwardRef<HTMLDivElement, MonthInputDialogProps>(({showing, dispatch, message, defaultValue, okFunction, cancelFunction, width, inputStyle, overlayBackgroundStyle, ...props}, ref): ReactElement => {
    const preStyle: CSSProperties = {};
    preStyle.width = "100%";
    preStyle.paddingBottom = "1em";
    preStyle.whiteSpace = "pre-wrap";
    const formStyle: CSSProperties = {};
    formStyle.maxHeight = "calc(100vh - 20em)";
    formStyle.marginBottom = "1em";
    formStyle.padding = "1em 0.5em";
    formStyle.display = "flex";
    formStyle.flexDirection = "row";
    formStyle.justifyContent = "right";
    formStyle.flexWrap = "wrap";
    formStyle.gap = "1em";
    const inputInternalStyle: CSSProperties = {};
    inputInternalStyle.width = "10em";
    inputInternalStyle.textAlign = "center";
    const buttonsStyle: CSSProperties = {};
    buttonsStyle.paddingTop = "0.5em";
    buttonsStyle.display = "flex";
    buttonsStyle.flexDirection = "row";
    buttonsStyle.justifyContent = "right";
    buttonsStyle.gap = "0.5em";
    const inputRef = useRef<HTMLInputElement>(null);
    const [alreadyPressed, setAlreadyPressed] = useState<boolean>(false);
    const okEvent = async (e: MouseEvent) => {
        if (alreadyPressed || inputRef.current === null) {
            return;
        }
        setAlreadyPressed(true);
        const target: any = e.target;
        const button: HTMLButtonElement = target;
        button.disabled = true;
        await okFunction(inputRef.current.value);
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
                <input type="month" style={{...inputInternalStyle, ...inputStyle}} ref={inputRef} />
            </form>
            <div style={buttonsStyle}>
                <button onClick={okEvent}>OK</button>
                <button onClick={cancelEvent}>キャンセル</button>
            </div>
        </Popup>
    );
});
export default MonthInputDialog;
