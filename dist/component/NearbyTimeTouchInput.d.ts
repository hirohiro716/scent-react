import React from "react";
import { CSSProperties, Dispatch, SetStateAction } from "react";
import { Datetime } from "scent-typescript";
/**
 * 初期値の付近の時刻をタッチ入力するコンポーネント。
 *
 * @param date 対象の日時。
 * @param dispatch ユーザーがボタンを押した際に時刻を変更するためのDispatch。
 * @param incrementMinutes ボタン押下で加減算する分。初期値は10分。
 * @param selectElementStyle select要素へ渡すスタイル。
 * @param buttonElementStyle button要素へ渡すスタイル。
 * @param props
 * @returns
 */
declare const NearbyTimeTouchInput: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    date: Datetime | undefined;
    dispatch: Dispatch<SetStateAction<Datetime | undefined>>;
    incrementMinutes?: number;
    selectElementStyle?: CSSProperties;
    buttonElementStyle?: CSSProperties;
} & React.RefAttributes<HTMLDivElement>>;
export default NearbyTimeTouchInput;
