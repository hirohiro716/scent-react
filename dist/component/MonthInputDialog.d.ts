import React, { CSSProperties, Dispatch, SetStateAction } from "react";
/**
 * 年月の入力ダイアログのコンポーネント。
 *
 * @param showing 表示する場合はtrueを指定する。
 * @param dispatch 表示と非表示を切り替えるためのDispatch。
 * @param message メッセージ。
 * @param defaultValue 年月(YYYY-MM)の初期値。
 * @param okFunction OKボタン押下時の処理。
 * @param cancelFunction キャンセルボタン押下時の処理。
 * @param width ダイアログの幅。
 * @param inputStyle input要素へ渡すスタイル。
 * @param overlayBackgroundStyle 背景要素へ渡すスタイル。
 * @param props
 * @returns
 */
declare const MonthInputDialog: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    showing: boolean | undefined;
    dispatch: Dispatch<SetStateAction<boolean>>;
    message: string | undefined;
    defaultValue?: string;
    okFunction: (value: string) => Promise<void>;
    cancelFunction?: () => Promise<void>;
    width: string;
    inputStyle?: CSSProperties;
    overlayBackgroundStyle?: CSSProperties;
} & React.RefAttributes<HTMLDivElement>>;
export default MonthInputDialog;
