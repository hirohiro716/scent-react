import React, { CSSProperties, Dispatch, SetStateAction } from "react";
/**
 * 選択ダイアログのコンポーネント。
 *
 * @param showing 表示する場合はtrueを指定する。
 * @param dispatch 表示と非表示を切り替えるためのDispatch。
 * @param message メッセージ。
 * @param selectableItems 選択可能なアイテムの配列。
 * @param displayTextMaker アイテムの表示値を作成するコールバック。
 * @param isMultipleSelectionAllowed アイテムの複数選択を許可する場合はtrueを指定する。
 * @param defaultSelections デフォルトで選択するアイテムの配列。
 * @param selectFunction OKボタン押下時の処理。
 * @param cancelFunction キャンセルボタン押下時の処理。
 * @param width ダイアログの幅。
 * @param overlayBackgroundStyle 背景要素へ渡すスタイル。
 * @param props
 * @returns
 */
declare const SelectionDialog: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    showing: boolean | undefined;
    dispatch: Dispatch<SetStateAction<boolean>>;
    message: string | undefined;
    selectableItems: string[];
    displayTextMaker?: (selectableItem: string) => string | undefined;
    isMultipleSelectionAllowed?: boolean;
    defaultSelections?: string[];
    selectFunction?: (selectedItems: string[]) => Promise<void>;
    cancelFunction?: () => Promise<void>;
    width: string;
    overlayBackgroundStyle?: CSSProperties;
} & React.RefAttributes<HTMLDivElement>>;
export default SelectionDialog;
