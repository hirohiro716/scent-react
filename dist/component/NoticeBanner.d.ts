import { Dispatch, HTMLAttributes, SetStateAction } from "react";
import React from "react";
/**
 * 通知メッセージを表示するバナーのコンポーネント。
 *
 * @param props
 * @returns
 */
declare const NoticeBanner: React.ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & {
    message: string | undefined;
    dispatch: Dispatch<SetStateAction<string | undefined>>;
    top: string;
    width: string;
    timeoutMilliseconds: number;
} & React.RefAttributes<HTMLDivElement>>;
export default NoticeBanner;
