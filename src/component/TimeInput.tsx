import { Datetime, DatetimeFormat, StringObject } from "scent-typescript";
import React, { CSSProperties, forwardRef, InputHTMLAttributes, ReactElement, ReactEventHandler, useState } from "react";

type TimeInputProps = InputHTMLAttributes<HTMLInputElement> & {
    baseDate?: string | null,
    defaultDatetime?: string | null,
    isSelectAllOnFocus?: boolean,
    changeWithUpAndDownKeys?: "hours" | "minutes" | "none",
}

/**
 * 時刻を入力するコンポーネント。内部で年月日も保持している。年月日を含む時刻を取得するには"data-datetime"属性を参照する。
 * 
 * @param baseDate 基本となる日付。未指定の場合は現在の日付になる。"data-base-date"属性値でも設定可能。
 * @param defaultDatetime 時刻の初期値。
 * @param isSelectAllOnFocus フォーカス時にテキストを全選択しない場合はfalseを指定。
 * @param changeWithUpAndDownKeys 上下キー押下時に時刻を変更する場合に指定。
 * @param props 
 * @returns 
 */
const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(({baseDate, defaultDatetime, isSelectAllOnFocus = true, changeWithUpAndDownKeys = "none", value, style, onFocus, onBlur, onKeyDown, ...props}: TimeInputProps, ref): ReactElement => {
    const inputInternalStyle: CSSProperties = {};
    inputInternalStyle.width = "5em";
    inputInternalStyle.textAlign = "center";
    const [datetime, setDatetime] = useState<Datetime | null>(StringObject.from(defaultDatetime).toDatetime());
    const inputFocusEventHandler: ReactEventHandler<HTMLInputElement> = (event: React.FocusEvent<HTMLInputElement>) => {
        if (isSelectAllOnFocus) {
            event.currentTarget.select()
        }
        if (onFocus) {
            onFocus(event);
        }
    }
    const inputBlurEventHandler: ReactEventHandler<HTMLInputElement> = (event: React.FocusEvent<HTMLInputElement>) => {
        const hoursAndMinutes = Datetime.timeStringToHoursAndMinutes(event.currentTarget.value);
        const value = new StringObject();
        if (hoursAndMinutes !== null) {
            const baseDate = StringObject.from(event.currentTarget.getAttribute("data-base-date")).toDatetime();
            const inputDatetime = baseDate ? baseDate.clone() : new Datetime();
            inputDatetime.setHour(hoursAndMinutes.hours);
            inputDatetime.setMinute(hoursAndMinutes.minutes);
            value.append(inputDatetime.toString(DatetimeFormat.hourAndMinute));
            setDatetime(inputDatetime);
        } else {
            setDatetime(null);
        }
        event.currentTarget.value = value.toString();
        if (onBlur) {
            onBlur(event);
        }
    }
    const inputKeyDownEventHandler: ReactEventHandler<HTMLInputElement> = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const hoursAndMinutes = Datetime.timeStringToHoursAndMinutes(event.currentTarget.value);
        if (hoursAndMinutes !== null && typeof changeWithUpAndDownKeys !== "undefined") {
            const baseDate = StringObject.from(event.currentTarget.getAttribute("data-base-date")).toDatetime();
            const inputDatetime = baseDate ? baseDate.clone() : new Datetime();
            inputDatetime.setHour(hoursAndMinutes.hours);
            inputDatetime.setMinute(hoursAndMinutes.minutes);
            let changed = false;
            switch (changeWithUpAndDownKeys) {
                case "hours":
                    switch (event.key) {
                        case "ArrowUp":
                            inputDatetime.addHour(1);
                            changed = true;
                            break;
                        case "ArrowDown":
                            inputDatetime.addHour(-1);
                            changed = true;
                            break;
                    }
                    break;
                case "minutes":
                    switch (event.key) {
                        case "ArrowUp":
                            inputDatetime.addMinute(1);
                            changed = true;
                            break;
                        case "ArrowDown":
                            inputDatetime.addMinute(-1);
                            changed = true;
                            break;
                    }
                    break;
                default:
                    break;
            }
            if (changed) {
                setDatetime(inputDatetime);
                event.currentTarget.value = inputDatetime.toString(DatetimeFormat.hourAndMinute);
                event.currentTarget.select()
                event.preventDefault();
            }
        }
        if (onKeyDown) {
            onKeyDown(event);
        }
    }
    return (
        <input type="text" inputMode="decimal" data-base-date={baseDate} data-datetime={datetime ? datetime.toString() : undefined} value={value} defaultValue={datetime ? datetime.toString(DatetimeFormat.hourAndMinute) : undefined} style={{...style, ...inputInternalStyle}} onFocus={inputFocusEventHandler} onBlur={inputBlurEventHandler} onKeyDown={inputKeyDownEventHandler} ref={ref} {...props} />
    );
});
export default TimeInput;
