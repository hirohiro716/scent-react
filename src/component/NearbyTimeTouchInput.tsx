import React, { ReactEventHandler, useState } from "react";
import { CSSProperties, Dispatch, forwardRef, HTMLAttributes, ReactElement, SetStateAction } from "react";
import { Datetime, StringObject } from "scent-typescript";

type NearbyTimeTouchInputProps = HTMLAttributes<HTMLDivElement> & {
    date: Datetime | undefined,
    dispatch: Dispatch<SetStateAction<Datetime | undefined>>,
    incrementMinutes?: number,
    selectElementStyle?: CSSProperties,
    buttonElementStyle?: CSSProperties,
}

/**
 * 初期値の付近の時刻をタッチ入力するコンポーネント。
 * 
 * @param date 対象の日時。
 * @param dispatch ユーザーがボタンを押した際に時刻を変更するためのDispatch。
 * @param incrementMinutes ボタン押下で加減算する分。初期値は10分。
 * @param selectElementStyle select要素へ渡すスタイル。
 * @param buttonElementStyle button要素へ渡すスタイル。
 * @param props 
 * @returns 
 */
const NearbyTimeTouchInput = forwardRef<HTMLDivElement, NearbyTimeTouchInputProps>(({date, dispatch, incrementMinutes = 10, style, selectElementStyle: inputStyle, buttonElementStyle: buttonStyle, ...props}, ref): ReactElement => {
    const internalStyle: CSSProperties = {};
    internalStyle.display = "inline-block";
    const rowStyle: CSSProperties = {};
    rowStyle.display = "flex";
    rowStyle.flexDirection = "row";
    rowStyle.alignItems = "stretch";
    rowStyle.gap = "0.3em";
    const selectElementInternalStyle: CSSProperties = {};
    selectElementInternalStyle.width = "5em";
    selectElementInternalStyle.textAlign = "center";
    const buttonElementInternalStyle: CSSProperties = {};
    buttonElementInternalStyle.width = "2em";
    const [currentTime] = useState<Datetime>(date ? date : new Datetime());
    const hourChangeEventHandler: ReactEventHandler<HTMLSelectElement> = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const hour = StringObject.from(event.currentTarget.value).toNumber();
        if (hour !== null) {
            currentTime.setHour(hour);
            dispatch(currentTime.clone());
        }
    }
    const minuteChangeEventHandler: ReactEventHandler<HTMLSelectElement> = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const minute = StringObject.from(event.currentTarget.value).toNumber();
        if (minute !== null) {
            currentTime.setMinute(minute);
            dispatch(currentTime.clone());
        }
    }
    const goForwardMinute = () => {
        currentTime.addMinute(incrementMinutes);
        dispatch(currentTime.clone());
    }
    const goBackMinute = () => {
        currentTime.addMinute(incrementMinutes * -1);
        dispatch(currentTime.clone());
    }
    const dialogID = new StringObject(props.id);
    if (dialogID.length() === 0) {
        dialogID.append("nearby-time-touch-input");
    }
    return (
        <div style={{...internalStyle, ...style}} ref={ref} {...props}>
            <div style={rowStyle}>
                <select onChange={hourChangeEventHandler} value={currentTime.getHour()}>
                    {[...Array(24)].map((value, hour) => {
                        return (
                            <option key={dialogID.append("-hour-option").append(hour).toString()} value={hour}>{hour}時</option>
                        );
                    })}
                </select>
                <select onChange={minuteChangeEventHandler} value={currentTime.getMinute()}>
                    {[...Array(60)].map((value, minute) => {
                        return (
                            <option key={dialogID.append("-minute-option").append(minute).toString()} value={minute}>{minute}分</option>
                        );
                    })}
                </select>
                <button type="button" onClick={goForwardMinute} style={{...buttonElementInternalStyle, ...buttonStyle}}>↑</button>
                <button type="button" onClick={goBackMinute} style={{...buttonElementInternalStyle, ...buttonStyle}}>↓</button>
            </div>
        </div>
    );
});
export default NearbyTimeTouchInput;
