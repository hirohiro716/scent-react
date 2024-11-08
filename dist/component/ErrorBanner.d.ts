import { Dispatch, HTMLAttributes, SetStateAction } from "react";
import React from "react";
/**
 * エラーメッセージを表示するバナーのコンポーネント。
 *
 * @param message メッセージ。
 * @param dispatch 表示と非表示を切り替えるためのDispatch。
 * @param top バナーを表示する上位置。
 * @param width バナーの幅。
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
