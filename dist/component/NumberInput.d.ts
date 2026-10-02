import React from "react";
/**
 * 数字を入力するコンポーネント。
 *
 * @param isAllowDecimals 小数を許可する場合はtrueを指定。
 * @param isAllowNegativeNumbers 負数の入力を許可する場合はtrueを指定。
 * @param isSelectAllOnFocus フォーカス時にテキストを全選択しない場合はfalseを指定。
 * @param props
 * @returns
 */
declare const NumberInput: React.ForwardRefExoticComponent<React.InputHTMLAttributes<HTMLInputElement> & {
    isAllowDecimals?: boolean;
    isAllowNegativeNumbers?: boolean;
    isSelectAllOnFocus?: boolean;
} & React.RefAttributes<HTMLInputElement>>;
export default NumberInput;
