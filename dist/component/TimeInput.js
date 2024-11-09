import { Datetime, DatetimeFormat, StringObject } from "scent-typescript";
import React, { forwardRef, useState } from "react";
/**
 * 時刻を入力するコンポーネント。内部で年月日も保持している。年月日を含む時刻を取得するには"data-datetime"属性を参照する。
 *
 * @param baseDate 基本となる日付。未指定の場合は現在の日付になる。"data-base-date"属性値でも設定可能。
 * @param defaultDatetime 時刻の初期値。
 * @param isSelectAllOnFocus フォーカス時にテキストを全選択しない場合はfalseを指定。
 * @param props
 * @returns
 */
const TimeInput = forwardRef(({ baseDate, defaultDatetime, isSelectAllOnFocus = true, value, style, onFocus, onBlur, ...props }, ref) => {
    const inputInternalStyle = {};
    inputInternalStyle.width = "5em";
    inputInternalStyle.textAlign = "center";
    const [datetime, setDatetime] = useState(StringObject.from(defaultDatetime).toDatetime());
    const inputFocusEventHandler = (event) => {
        if (isSelectAllOnFocus) {
            event.currentTarget.select();
        }
        if (onFocus) {
            onFocus(event);
        }
    };
    const inputBlurEventHandler = (event) => {
        const hoursAndMinutes = Datetime.timeStringToHoursAndMinutes(event.currentTarget.value);
        const value = new StringObject();
        if (hoursAndMinutes !== null) {
            const baseDate = StringObject.from(event.currentTarget.getAttribute("data-base-date")).toDatetime();
            const inputDatetime = baseDate ? baseDate.clone() : new Datetime();
            inputDatetime.setHour(hoursAndMinutes.hours);
            inputDatetime.setMinute(hoursAndMinutes.minutes);
            value.append(inputDatetime.toString(DatetimeFormat.hourAndMinute));
            setDatetime(inputDatetime);
        }
        else {
            setDatetime(null);
        }
        event.currentTarget.value = value.toString();
        if (onBlur) {
            onBlur(event);
        }
    };
    return (React.createElement("input", { type: "text", inputMode: "decimal", "data-base-date": baseDate, "data-datetime": datetime ? datetime.toString() : undefined, value: value, defaultValue: datetime ? datetime.toString(DatetimeFormat.hourAndMinute) : undefined, style: { ...style, ...inputInternalStyle }, onFocus: inputFocusEventHandler, onBlur: inputBlurEventHandler, ref: ref, ...props }));
});
export default TimeInput;
