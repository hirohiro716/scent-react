import React, { CSSProperties, Dispatch, HTMLAttributes, MouseEvent, ReactElement, SetStateAction, forwardRef, useEffect, useRef, useState } from "react";
import Popup from "./Popup.js";

type ConfirmationDialogProps = HTMLAttributes<HTMLDivElement> & {
    showing: boolean | undefined,
    dispatch: Dispatch<SetStateAction<boolean>>,
    message: string | undefined,
    okFunction?: () => Promise<void>,
    cancelFunction?: () => Promise<void>,
    width: string,
    overlayBackground?: string,
}

/**
 * 確認ダイアログのコンポーネント。
 * 
 * @param props 
 * @returns 
 */
const ConfirmationDialog = forwardRef<HTMLDivElement, ConfirmationDialogProps>(({showing, dispatch, message, okFunction, cancelFunction, width, overlayBackground, style, ...props}, ref): ReactElement => {
    const preStyle: CSSProperties = {};
    preStyle.width = "100%";
    preStyle.paddingBottom = "2em";
    preStyle.whiteSpace = "pre-wrap";
    const buttonsStyle: CSSProperties = {};
    buttonsStyle.display = "flex";
    buttonsStyle.flexDirection = "row";
    buttonsStyle.justifyContent = "right";
    buttonsStyle.gap = "0.5em";
    const [ alreadyPressed, setAlreadyPressed ] = useState<boolean>(false);
    const okEvent = async (e: MouseEvent) => {
        if (alreadyPressed) {
            return;
        }
        setAlreadyPressed(true);
        const target: any = e.target;
        const button: HTMLButtonElement = target;
        button.disabled = true;
        if (okFunction) {
            try {
                await okFunction();
            } catch (error: any) {
                console.log(error);
            }
        }
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
        <Popup showing={showing} dispatch={dispatch} width={width} hideCancelButton={true} overlayBackground={overlayBackground} cancelFunction={cancelFunction} style={style} ref={ref} {...props}>
            <pre style={preStyle} tabIndex={0} ref={preRef}>{message}</pre>
            <div style={buttonsStyle}>
                <button onClick={okEvent}>OK</button>
                <button onClick={cancelEvent}>キャンセル</button>
            </div>
        </Popup>
    );
});
export default ConfirmationDialog;
