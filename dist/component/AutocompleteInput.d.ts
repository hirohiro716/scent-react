import React from "react";
/**
 * オートコンプリート機能付きのinputコンポーネント。
 *
 * @param props
 * @returns
 */
declare const AutocompleteInput: React.ForwardRefExoticComponent<React.InputHTMLAttributes<HTMLInputElement> & {
    items: any[];
    displayTextMaker?: (item: any) => string;
    keywordMaker?: (item: any) => string;
    callbackAfterAutocomplete?: (item: any) => void;
} & React.RefAttributes<HTMLInputElement>>;
export default AutocompleteInput;
