import React, { CSSProperties, Dispatch, SetStateAction } from "react";
/**
 * 待機中のオーバーレイコンポーネント。
 *
 * @param showing 表示する場合はtrueを指定する。
 * @param dispatch 表示と非表示を切り替えるためのDispatch。
 * @param width 画像の幅。デフォルトは"4em"。
 * @param overlayBackgroundStyle 背景要素へ渡すスタイル。
 * @param props
 * @returns
 */
declare const WaitingOverlay: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    showing: boolean;
    dispatch: Dispatch<SetStateAction<boolean>>;
    width?: string;
    overlayBackgroundStyle?: CSSProperties;
} & React.RefAttributes<HTMLDivElement>>;
export default WaitingOverlay;
