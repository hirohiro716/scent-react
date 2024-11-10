import React, { CSSProperties, Dispatch, HTMLAttributes, MouseEvent, ReactElement, SetStateAction, forwardRef, useEffect, useRef, useState } from "react";
import Popup from "./Popup.js";
import { Datetime, DatetimeFormat, StringObject } from "scent-typescript";

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
 * @param showing 表示する場合はtrueを指定する。
 * @param dispatch 表示と非表示を切り替えるためのDispatch。
 * @param message メッセージ。
 * @param defaultValue 年月(YYYY-MM)の初期値。
 * @param okFunction OKボタン押下時の処理。
 * @param cancelFunction キャンセルボタン押下時の処理。
 * @param width ダイアログの幅。
 * @param inputStyle input要素へ渡すスタイル。
 * @param overlayBackgroundStyle 背景要素へ渡すスタイル。
 * @param props 
 * @returns 
 */
const MonthInputDialog = forwardRef<HTMLDivElement, MonthInputDialogProps>(({showing, dispatch, message, defaultValue, okFunction, cancelFunction, width, inputStyle, overlayBackgroundStyle, ...props}, ref): ReactElement => {
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
    formStyle.gap = "0.2em";
    const yearAndMonthInputInternalStyle: CSSProperties = {};
    yearAndMonthInputInternalStyle.width = "10em";
    yearAndMonthInputInternalStyle.textAlign = "center";
    const yearInputInternalStyle: CSSProperties = {};
    yearInputInternalStyle.width = "6em";
    yearInputInternalStyle.textAlign = "center";
    const monthInputInternalStyle: CSSProperties = {};
    monthInputInternalStyle.width = "4.5em";
    monthInputInternalStyle.textAlign = "center";
    const buttonsStyle: CSSProperties = {};
    buttonsStyle.paddingTop = "0.5em";
    buttonsStyle.display = "flex";
    buttonsStyle.flexDirection = "row";
    buttonsStyle.justifyContent = "right";
    buttonsStyle.gap = "0.5em";
    const yearAndMonthInputRef = useRef<HTMLInputElement>(null);
    const yearInputRef = useRef<HTMLInputElement>(null);
    const monthInputRef = useRef<HTMLInputElement>(null);
    const [alreadyPressed, setAlreadyPressed] = useState<boolean>(false);
    const okEvent = async (e: MouseEvent) => {
        if (alreadyPressed) {
            return;
        }
        const yearAndMonth = new StringObject();
        if (supportsMonthType) {
            if (yearAndMonthInputRef.current !== null) {
                yearAndMonth.append(yearAndMonthInputRef.current.value);
            }
        } else {
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
        const target: any = e.target;
        const button: HTMLButtonElement = target;
        button.disabled = true;
        await okFunction(yearAndMonth.toString());
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
    const [supportsMonthType, setSupportsMonthType] = useState<boolean>(true);
    const preRef = useRef<HTMLPreElement>(null);
    useEffect(() => {
        setAlreadyPressed(false);
        if (yearAndMonthInputRef.current) {
            if (StringObject.from(yearAndMonthInputRef.current.type).equals("month") === false) {
                setSupportsMonthType(false);
            }
        }
        if (preRef.current) {
            preRef.current.focus();
        }
    }, [showing, supportsMonthType]);
    return (
        <Popup showing={showing} dispatch={dispatch} width={width} isCloseOnBackgroundClick={false} closeButtonStyle={{display:"none"}} overlayBackgroundStyle={overlayBackgroundStyle} cancelFunction={cancelFunction} ref={ref} {...props}>
            <pre style={preStyle} tabIndex={0} ref={preRef}>{message}</pre>
            <form style={formStyle} onSubmit={(e) => e.preventDefault()}>
                {supportsMonthType &&
                    <input type="month" defaultValue={defaultValue ? defaultValue : Datetime.from().toString(DatetimeFormat.yearAndMonth)} style={{...yearAndMonthInputInternalStyle, ...inputStyle}} ref={yearAndMonthInputRef} />
                }
                {supportsMonthType === false &&
                    <>
                        <input type="number" min={1} max={9999} defaultValue={StringObject.from(defaultValue).toString().includes("-") ? StringObject.from(defaultValue).splitToStrings("-")[0] : Datetime.from().getYear()} style={{...yearInputInternalStyle, ...inputStyle}} ref={yearInputRef} />
                        /
                        <input type="number" min={1} max={12} defaultValue={StringObject.from(defaultValue).toString().includes("-") ? StringObject.from(defaultValue).splitToStrings("-")[1] : Datetime.from().getMonth()} style={{...monthInputInternalStyle, ...inputStyle}} ref={monthInputRef} />
                    </>
                }
            </form>
            <div style={buttonsStyle}>
                <button type="button" onClick={okEvent}>OK</button>
                <button type="button" onClick={cancelEvent}>キャンセル</button>
            </div>
        </Popup>
    );
});
export default MonthInputDialog;
