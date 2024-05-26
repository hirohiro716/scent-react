import React from "react";
/**
 * オートコンプリート機能付きのinputコンポーネント。
 *
 * @param props
 * @returns
 */
declare const AutocompleteInput: React.ForwardRefExoticComponent<React.InputHTMLAttributes<HTMLInputElement> & {
    items: any[];
    displayTextMaker?: ((item: any) => string) | undefined;
    keywordMaker?: ((item: any) => string) | undefined;
    callbackAfterAutocomplete?: ((item: any) => void) | undefined;
} & React.RefAttributes<HTMLInputElement>>;
export default AutocompleteInput;
