import React, { CSSProperties, Dispatch, HTMLAttributes, MouseEvent, ReactElement, SetStateAction, forwardRef, useEffect, useRef, useState } from "react";
import Popup from "./Popup.js";
import { Datetime, StringObject } from "scent-typescript";
import TimeInput from "./TimeInput.js";

type DatetimeInputDialogProps = HTMLAttributes<HTMLDivElement> & {
    showing: boolean | undefined,
    dispatch: Dispatch<SetStateAction<boolean>>,
    message: string | undefined,
    defaultDatetime?: Datetime | null,
    okFunction: (datetime: Datetime) => Promise<void>,
    cancelFunction?: () => Promise<void>,
    width: string,
    inputStyle?: CSSProperties,
    overlayBackgroundStyle?: CSSProperties,
}

/**
 * 年月日と時刻の入力ダイアログのコンポーネント。
 * 
 * @param props 
 * @returns 
 */
const DatetimeInputDialog = forwardRef<HTMLDivElement, DatetimeInputDialogProps>(({showing, dispatch, message, defaultDatetime, okFunction, cancelFunction, width, inputStyle, overlayBackgroundStyle, ...props}, ref): ReactElement => {
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
    const dateInputInternalStyle: CSSProperties = {};
    dateInputInternalStyle.width = "10em";
    dateInputInternalStyle.textAlign = "center";
    const buttonsStyle: CSSProperties = {};
    buttonsStyle.paddingTop = "0.5em";
    buttonsStyle.display = "flex";
    buttonsStyle.flexDirection = "row";
    buttonsStyle.justifyContent = "right";
    buttonsStyle.gap = "0.5em";
    const dateInputRef = useRef<HTMLInputElement>(null);
    const timeInputRef = useRef<HTMLInputElement>(null);
    const [alreadyPressed, setAlreadyPressed] = useState<boolean>(false);
    const okEvent = async (e: MouseEvent) => {
        if (alreadyPressed || dateInputRef.current === null || timeInputRef.current === null) {
            return;
        }
        const datetime = StringObject.from(dateInputRef.current.value).toDatetime();
        if (datetime === null) {
            return;
        }
        const timeParts = StringObject.from(timeInputRef.current.value).split("[^0-9]");
        let hour: number | null = null;
        let minute: number | null = null;
        for (const timePart of timeParts) {
            const number = timePart.toNumber();
            if (number !== null) {
                if (hour === null) {
                    hour = number;
                } else if (minute === null) {
                    minute = number;
                }
            }
        }
        if (hour === null || minute === null) {
            return;
        }
        datetime.setHour(hour);
        datetime.setMinute(minute);
        datetime.setSecond(0).setMillisecond(0);
        setAlreadyPressed(true);
        const target: any = e.target;
        const button: HTMLButtonElement = target;
        button.disabled = true;
        await okFunction(datetime);
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
    useEffect(() => {
        setAlreadyPressed(false);
        if (dateInputRef.current) {
            dateInputRef.current.focus();
        }
    }, [showing]);
    return (
        <Popup showing={showing} dispatch={dispatch} width={width} isCloseOnBackgroundClick={false} closeButtonStyle={{display:"none"}} overlayBackgroundStyle={overlayBackgroundStyle} cancelFunction={cancelFunction} ref={ref} {...props}>
            <pre style={preStyle} tabIndex={0}>{message}</pre>
            <form style={formStyle} onSubmit={(e) => e.preventDefault()}>
                <input type="date" defaultValue={defaultDatetime ? defaultDatetime.toStringOnlyDate() : Datetime.from().toStringOnlyDate()} style={{...dateInputInternalStyle, ...inputStyle}} ref={dateInputRef} />
                <TimeInput defaultDatetime={defaultDatetime} style={inputStyle} ref={timeInputRef} />
            </form>
            <div style={buttonsStyle}>
                <button onClick={okEvent}>OK</button>
                <button onClick={cancelEvent}>キャンセル</button>
            </div>
        </Popup>
    );
});
export default DatetimeInputDialog;
