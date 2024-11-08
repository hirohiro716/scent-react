import { Datetime, DatetimeFormat, StringObject } from "scent-typescript";
import React, { CSSProperties, forwardRef, InputHTMLAttributes, ReactElement, ReactEventHandler, useEffect, useImperativeHandle, useRef, useState } from "react";

type TimeInputProps = InputHTMLAttributes<HTMLInputElement> & {
    baseDate?: string | null,
    defaultDatetime?: string | null,
}

/**
 * 時刻を入力するコンポーネント。内部で年月日も保持している。年月日を含む時刻を取得するには"data-datetime"属性を参照する。
 * 
 * @param baseDate 基本となる日付。未指定の場合は現在の日付になる。"data-base-date"属性値でも設定可能。
 * @param defaultDatetime 時刻の初期値。
 * @param props 
 * @returns 
 */
const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(({baseDate, defaultDatetime, value, style, onBlur, ...props}: TimeInputProps, ref): ReactElement => {
    const inputInternalStyle: CSSProperties = {};
    inputInternalStyle.width = "5em";
    inputInternalStyle.textAlign = "center";
    const [datetime, setDatetime] = useState<Datetime | null>(StringObject.from(defaultDatetime).toDatetime());
    const inputBlurEventHandler: ReactEventHandler<HTMLInputElement> = (event: React.FocusEvent<HTMLInputElement>) => {
        const timeParts = StringObject.from(event.currentTarget.value).split("[^0-9]");
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
        const value = new StringObject();
        if (hour !== null && minute !== null) {
            const baseDate = StringObject.from(event.currentTarget.getAttribute("data-base-date")).toDatetime();
            const inputDatetime = baseDate ? baseDate.clone() : new Datetime();
            inputDatetime.setHour(hour);
            inputDatetime.setMinute(minute);
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
    return (
        <input type="text" data-base-date={baseDate} data-datetime={datetime ? datetime.toString() : undefined} value={value} defaultValue={datetime ? datetime.toString(DatetimeFormat.hourAndMinute) : undefined} style={{...style, ...inputInternalStyle}} onBlur={inputBlurEventHandler} ref={ref} {...props} />
    );
});
export default TimeInput;
