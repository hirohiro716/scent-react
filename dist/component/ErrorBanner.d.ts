import { Dispatch, HTMLAttributes, SetStateAction } from "react";
import React from "react";
/**
 * エラーメッセージを表示するバナーのコンポーネント。
 *
 * @param props
 * @returns
 */
declare const ErrorBanner: React.ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & {
    message: string | undefined;
    dispatch: Dispatch<SetStateAction<string | undefined>>;
    top: string;
    width: string;
} & React.RefAttributes<HTMLDivElement>>;
export default ErrorBanner;
