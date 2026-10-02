import { StringObject } from "scent-typescript";
import React, { forwardRef } from "react";
/**
 * 数字を入力するコンポーネント。
 *
 * @param isAllowDecimals 小数を許可する場合はtrueを指定。
 * @param isAllowNegativeNumbers 負数の入力を許可する場合はtrueを指定。
 * @param isSelectAllOnFocus フォーカス時にテキストを全選択しない場合はfalseを指定。
 * @param props
 * @returns
 */
const NumberInput = forwardRef(({ isAllowDecimals = true, isAllowNegativeNumbers = true, isSelectAllOnFocus = true, style, onFocus, onBlur, onChange, ...props }, ref) => {
    const inputInternalStyle = {};
    inputInternalStyle.textAlign = "right";
    const inputFocusEventHandler = (event) => {
        if (isSelectAllOnFocus) {
            event.currentTarget.select();
        }
        if (onFocus) {
            onFocus(event);
        }
    };
    const inputBlurEventHandler = (event) => {
        const input = event.target;
        const value = new StringObject(input.value);
        if (value.clone().extract(-1).equals(".")) {
            value.extract(0, -1);
        }
        input.value = value.toString();
        if (onBlur) {
            onBlur(event);
        }
    };
    const inpuChangeEventHandler = (event) => {
        const input = event.target;
        const value = new StringObject();
        for (const one of StringObject.from(input.value)) {
            one.narrow();
            if (one.toString().match("[0-9]")) {
                value.append(one);
                continue;
            }
            if (isAllowDecimals && value.clone().extract("[0-9]").length() > 0 && value.toString().includes(".") === false && one.equals(".")) {
                value.append(one);
                continue;
            }
            if (isAllowNegativeNumbers && value.length() === 0 && one.equals("-")) {
                value.append(one);
                continue;
            }
        }
        const selectionStart = (input.selectionStart ? input.selectionStart : 0) - input.value.length + value.length();
        const selectionEnd = (input.selectionEnd ? input.selectionEnd : 0) - input.value.length + value.length();
        input.value = value.toString();
        if (selectionStart >= 0 && selectionEnd >= 0) {
            input.selectionStart = selectionStart;
            input.selectionEnd = selectionEnd;
        }
        if (onChange) {
            onChange(event);
        }
    };
    return (React.createElement("input", { type: "text", inputMode: "decimal", autoComplete: "tel-extension", style: { ...inputInternalStyle, ...style }, onFocus: inputFocusEventHandler, onBlur: inputBlurEventHandler, onChange: inpuChangeEventHandler, ref: ref, ...props }));
});
NumberInput.displayName = "NumberInput";
export default NumberInput;
