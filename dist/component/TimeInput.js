import { Datetime, DatetimeFormat, StringObject } from "scent-typescript";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
/**
 * 時刻を入力するコンポーネント。
 *
 * @param props
 * @returns
 */
const TimeInput = forwardRef(({ defaultDatetime, ...props }, ref) => {
    const style = {};
    style.width = "5em";
    style.textAlign = "center";
    const inputRef = useRef(null);
    useImperativeHandle(ref, () => {
        return inputRef.current;
    });
    const isAlreadyInitialized = useRef(false);
    if (typeof window !== "undefined" && isAlreadyInitialized.current === false) {
        if (inputRef.current !== null) {
            isAlreadyInitialized.current = true;
            inputRef.current.addEventListener("blur", () => {
                if (inputRef.current === null) {
                    return;
                }
                const timeParts = StringObject.from(inputRef.current.value).split("[^0-9]");
                let hour = null;
                let minute = null;
                for (const timePart of timeParts) {
                    const number = timePart.toNumber();
                    if (number !== null) {
                        if (hour === null) {
                            hour = number;
                        }
                        else if (minute === null) {
                            minute = number;
                        }
                    }
                }
                const timeText = new StringObject();
                if (hour !== null && minute !== null) {
                    const datetime = defaultDatetime ? defaultDatetime.clone() : new Datetime();
                    datetime.setHour(hour);
                    datetime.setMinute(minute);
                    timeText.append(datetime.toString(DatetimeFormat.hourAndMinute));
                }
                inputRef.current.value = timeText.toString();
            });
        }
    }
    return (React.createElement("input", { type: "text", defaultValue: defaultDatetime ? defaultDatetime.toString(DatetimeFormat.hourAndMinute) : undefined, ref: inputRef, style: { ...style, ...props.style }, ...props }));
});
export default TimeInput;
