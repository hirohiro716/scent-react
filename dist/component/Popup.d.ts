import { CSSProperties, Dispatch, HTMLAttributes, SetStateAction } from "react";
import React from "react";
/**
 * ポップアップを表示するバナーのコンポーネント。
 *
 * @param showing 表示する場合はtrueを指定する。
 * @param dispatch 表示と非表示を切り替えるためのDispatch。
 * @param width ダイアログの幅。
 * @param isCloseOnBackgroundClick 背景クリックで画像を閉じる場合はtrue。
 * @param closeButtonStyle 閉じるボタン要素へ渡すスタイル。
 * @param overlayBackgroundStyle 背景要素へ渡すスタイル。
 * @param cancelFunction キャンセル時の処理。
 * @param props
 * @returns
 */
declare const Popup: React.ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & {
    showing: boolean | undefined;
    dispatch: Dispatch<SetStateAction<boolean>>;
    width: string;
    isCloseOnBackgroundClick?: boolean;
    closeButtonStyle?: CSSProperties;
    overlayBackgroundStyle?: CSSProperties;
    cancelFunction?: () => Promise<void>;
} & React.RefAttributes<HTMLDivElement>>;
export default Popup;
