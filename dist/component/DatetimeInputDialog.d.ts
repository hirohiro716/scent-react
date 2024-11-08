import React, { CSSProperties, Dispatch, SetStateAction } from "react";
import { Datetime } from "scent-typescript";
/**
 * 年月日と時刻の入力ダイアログのコンポーネント。
 *
 * @param showing 表示する場合はtrueを指定する。
 * @param dispatch 表示と非表示を切り替えるためのDispatch。
 * @param message メッセージ。
 * @param defaultDatetime 日時のデフォルト値。
 * @param okFunction OKボタン押下時の処理。
 * @param cancelFunction キャンセルボタン押下時の処理。
 * @param width ダイアログの幅。
 * @param inputStyle input要素へ渡すスタイル。
 * @param overlayBackgroundStyle 背景要素へ渡すスタイル。
 * @param props
 * @returns
 */
declare const DatetimeInputDialog: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    showing: boolean | undefined;
    dispatch: Dispatch<SetStateAction<boolean>>;
    message: string | undefined;
    defaultDatetime?: Datetime | null;
    okFunction: (datetime: Datetime) => Promise<void>;
    cancelFunction?: () => Promise<void>;
    width: string;
    inputStyle?: CSSProperties;
    overlayBackgroundStyle?: CSSProperties;
} & React.RefAttributes<HTMLDivElement>>;
export default DatetimeInputDialog;
