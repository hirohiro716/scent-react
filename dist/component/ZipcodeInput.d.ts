import { InputHTMLAttributes } from "react";
import React from "react";
/**
 * 郵便番号inputのコンポーネント。
 *
 * @param addressInputRef 住所inputのref。
 * @param props
 * @returns
 */
declare const ZipcodeInput: React.ForwardRefExoticComponent<InputHTMLAttributes<HTMLInputElement> & {
    addressInputRef: React.RefObject<HTMLInputElement | null>;
} & React.RefAttributes<HTMLInputElement>>;
export default ZipcodeInput;
