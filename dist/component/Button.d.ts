import React from "react";
/**
 * Buttonのコンポーネント。
 *
 * @param wait ボタンを待機中にする場合はtrueを指定する。
 * @param props
 * @returns
 */
declare const Button: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & {
    wait?: boolean;
} & React.RefAttributes<HTMLButtonElement>>;
export default Button;
