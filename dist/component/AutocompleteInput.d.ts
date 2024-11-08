import React from "react";
/**
 * オートコンプリート機能付きのinputコンポーネント。
 *
 * @param items 選択可能なリストアイテム。
 * @param displayTextMaker リストアイテムの表示値を作成するコールバック。
 * @param keywordMaker リストアイテムの検索キーワードを作成するコールバック。
 * @param callbackAfterAutocomplete リストアイテムを選択した際のコールバック。
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
