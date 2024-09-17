import React, { Dispatch, SetStateAction } from "react";
/**
 * Buttonのコンポーネント。
 *
 * @param props
 * @returns
 */
declare const Button: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & {
    wait?: boolean;
    dispatch: Dispatch<SetStateAction<boolean>>;
} & React.RefAttributes<HTMLButtonElement>>;
export default Button;
