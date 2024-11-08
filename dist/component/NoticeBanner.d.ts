import { Dispatch, HTMLAttributes, SetStateAction } from "react";
import React from "react";
/**
 * 通知メッセージを表示するバナーのコンポーネント。
 *
 * @param message メッセージ。
 * @param dispatch 表示と非表示を切り替えるためのDispatch。
 * @param top バナーを表示する上位置。
 * @param width バナーの幅。
 * @param timeoutMilliseconds メッセージを自動で閉じるまでのミリ秒数。
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
