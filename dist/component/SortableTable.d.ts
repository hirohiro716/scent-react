import React, { CSSProperties, Dispatch, ReactElement, SetStateAction } from "react";
import { Column } from "scent-typescript";
/**
 * 並び替え可能なテーブルコンポーネント。
 *
 * @param columns カラムの配列。
 * @param records 並び替えるレコードオブジェクトの配列。
 * @param dispatch 並び替えた際にレコードオブジェクトの配列を変更するためのDispatch。
 * @param identifierMaker レコードのオブジェクトから一意の値を作成するコールバック。未指定の場合は行番号が使用される。
 * @param elementMaker 行に表示する要素を作成するコールバック。
 * @param emptyMessage 表示するレコードがゼロ件の場合に表示するメッセージ。
 * @param wrapperElementStyle ラッパー要素のスタイル。
 * @param dragElementStyle ドラッグ中の要素のスタイル。
 * @param props
 * @returns
 */
declare const SortableTable: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableElement> & {
    columns: Column[];
    records: Record<string, any>[] | undefined;
    dispatch: Dispatch<SetStateAction<Record<string, any>[] | undefined>>;
    identifierMaker?: (record: Record<string, any>) => string | null;
    elementMaker?: (record: Record<string, any>, column: Column) => ReactElement | undefined;
    emptyMessage?: string;
    wrapperElementStyle?: CSSProperties;
    dragElementStyle?: CSSProperties;
} & React.RefAttributes<HTMLTableElement>>;
export default SortableTable;
