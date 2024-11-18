import React from "react";
/**
 * 時刻を入力するコンポーネント。内部で年月日も保持している。年月日を含む時刻を取得するには"data-datetime"属性を参照する。
 *
 * @param baseDate 基本となる日付。未指定の場合は現在の日付になる。"data-base-date"属性値でも設定可能。
 * @param defaultDatetime 時刻の初期値。
 * @param isSelectAllOnFocus フォーカス時にテキストを全選択しない場合はfalseを指定。
 * @param changeWithUpAndDownKeys 上下キー押下時に時刻を変更する場合に指定。
 * @param props
 * @returns
 */
declare const TimeInput: React.ForwardRefExoticComponent<React.InputHTMLAttributes<HTMLInputElement> & {
    baseDate?: string | null;
    defaultDatetime?: string | null;
    isSelectAllOnFocus?: boolean;
    changeWithUpAndDownKeys?: "hours" | "minutes" | "none";
} & React.RefAttributes<HTMLInputElement>>;
export default TimeInput;
