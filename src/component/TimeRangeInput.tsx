import React, { ChangeEventHandler, CSSProperties, Dispatch, HTMLAttributes, SetStateAction, useRef } from "react";
import { StringObject } from "scent-typescript";

type TimeRangeInputProps = HTMLAttributes<HTMLDivElement> & {
    value: string[] | undefined,
    dispatch: Dispatch<SetStateAction<string[] | undefined>>,
}

/**
 * 時間範囲を入力するコンポーネント。
 * 
 * @param value 時数の範囲。
 * @param dispatch 時数の範囲を変更するためのDispatch。
 * @param props 
 * @returns 
 */
const TimeRangeInput = ({value, dispatch, style, ...props}: TimeRangeInputProps) => {
    const divInternalStyle: CSSProperties = {};
    divInternalStyle.display = "flex";
    divInternalStyle.flexDirection = "row";
    divInternalStyle.alignItems = "center";
    divInternalStyle.gap = "0.3em";
    const inputRef1 = useRef<HTMLInputElement>(null);
    const inputRef2 = useRef<HTMLInputElement>(null);
    const changeEventHandler: ChangeEventHandler<HTMLInputElement> = () => {
        const value1 = new StringObject(inputRef1.current ? inputRef1.current.value: undefined);
        const value2 = new StringObject(inputRef2.current ? inputRef2.current.value: undefined);
        dispatch([value1.toString(), value2.toString()]);
    }
    return (
        <div style={{...divInternalStyle, ...style}} {...props}>
            <input type="time" defaultValue={value && value[0]} onChange={changeEventHandler} ref={inputRef1} style={{width:"5em", textAlign:"center"}} />
            〜
            <input type="time" defaultValue={value && value[1]} onChange={changeEventHandler} ref={inputRef2} style={{width:"5em", textAlign:"center"}} />
        </div>
    );
}
export default TimeRangeInput;
