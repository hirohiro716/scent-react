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
        const hoursAndMinutes = Datetime.timeStringToHoursAndMinutes(timeInputRef.current.value);
        if (hoursAndMinutes === null) {
            return;
        }
        datetime.setHour(hoursAndMinutes.hours);
        datetime.setMinute(hoursAndMinutes.minutes);
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
                <input type="date" defaultValue={defaultDatetime ? defaultDatetime.toStringOnlyDate() : Datetime.from().toStringOnlyDate()} style={{...dateInputInternalStyle, ...inputStyle}} ref={dateInputRef} />
                <TimeInput defaultDatetime={defaultDatetime ? defaultDatetime.toString() : undefined} style={inputStyle} ref={timeInputRef} />
            </form>
            <div style={buttonsStyle}>
                <button type="button" onClick={okEvent}>OK</button>
                <button type="button" onClick={cancelEvent}>キャンセル</button>
            </div>
        </Popup>
    );
});
export default DatetimeInputDialog;
