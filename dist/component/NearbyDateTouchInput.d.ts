import React from "react";
import { CSSProperties, Dispatch, SetStateAction } from "react";
import { Datetime } from "scent-typescript";
/**
 * 初期値の付近の日付をタッチ入力するコンポーネント。
 *
 * @param date 対象の日付。
 * @param dispatch ユーザーがボタンを押した際に日付を変更するためのDispatch。
 * @param inputStyle input要素へ渡すスタイル。
 * @param buttonStyle button要素へ渡すスタイル。
 * @param props
 * @returns
 */
declare const NearbyDateTouchInput: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    date: Datetime | undefined;
    dispatch: Dispatch<SetStateAction<Datetime | undefined>>;
    inputStyle?: CSSProperties;
    buttonStyle?: CSSProperties;
} & React.RefAttributes<HTMLDivElement>>;
export default NearbyDateTouchInput;
