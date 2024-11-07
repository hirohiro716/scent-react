import React from "react";
/**
 * Buttonのコンポーネント。
 *
 * @param props
 * @returns
 */
declare const Button: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & {
    wait?: boolean;
} & React.RefAttributes<HTMLButtonElement>>;
export default Button;
