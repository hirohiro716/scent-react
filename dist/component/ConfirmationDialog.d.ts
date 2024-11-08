import React, { CSSProperties, Dispatch, SetStateAction } from "react";
/**
 * 確認ダイアログのコンポーネント。
 *
 * @param showing 表示する場合はtrueを指定する。
 * @param dispatch 表示と非表示を切り替えるためのDispatch。
 * @param message メッセージ。
 * @param okFunction OKボタン押下時の処理。
 * @param cancelFunction キャンセルボタン押下時の処理。
 * @param width ダイアログの幅。
 * @param overlayBackgroundStyle 背景要素へ渡すスタイル。
 * @param props
 * @returns
 */
declare const ConfirmationDialog: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    showing: boolean | undefined;
    dispatch: Dispatch<SetStateAction<boolean>>;
    message: string | undefined;
    okFunction?: () => Promise<void>;
    cancelFunction?: () => Promise<void>;
    width: string;
    overlayBackgroundStyle?: CSSProperties;
} & React.RefAttributes<HTMLDivElement>>;
export default ConfirmationDialog;
