import React, { CSSProperties, Dispatch, SetStateAction } from "react";
/**
 * 選択ダイアログのコンポーネント。
 *
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
