import React, { useRef } from "react";
import { StringObject } from "scent-typescript";
/**
 * 時間範囲を入力するコンポーネント。
 *
 * @param value 時数の範囲。
 * @param dispatch 時数の範囲を変更するためのDispatch。
 * @param props
 * @returns
 */
const TimeRangeInput = ({ value, dispatch, style, ...props }) => {
    const divInternalStyle = {};
    divInternalStyle.display = "flex";
    divInternalStyle.flexDirection = "row";
    divInternalStyle.alignItems = "center";
    divInternalStyle.gap = "0.3em";
    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const changeEventHandler = () => {
        const value1 = new StringObject(inputRef1.current ? inputRef1.current.value : undefined);
        const value2 = new StringObject(inputRef2.current ? inputRef2.current.value : undefined);
        dispatch([value1.toString(), value2.toString()]);
    };
    return (React.createElement("div", { style: { ...divInternalStyle, ...style }, ...props },
        React.createElement("input", { type: "time", defaultValue: value && value[0], onChange: changeEventHandler, ref: inputRef1, style: { width: "5em", textAlign: "center" } }),
        "\u301C",
        React.createElement("input", { type: "time", defaultValue: value && value[1], onChange: changeEventHandler, ref: inputRef2, style: { width: "5em", textAlign: "center" } })));
};
export default TimeRangeInput;
