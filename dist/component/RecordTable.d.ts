import React, { ReactElement } from "react";
import { Column } from "scent-typescript";
/**
 * レコードを表示するテーブルコンポーネント。
 *
 * @param columns カラムの配列。
 * @param records 行オブジェクトの配列。
 * @param identifierMaker レコードのオブジェクトから一意の値を作成するコールバック。未指定の場合は行番号が使用される。
 * @param elementMaker フィールドに表示する要素を作成するコールバック。
 * @param leftFunctionButtons データ列の左側に表示するボタンを作成するコールバック。
 * @param rightFunctionButtons データ列の右側に表示するボタンを作成するコールバック。
 * @param emptyMessage 表示するレコードがゼロ件の場合に表示するメッセージ。
 * @param props
 * @returns
 */
declare const RecordTable: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableElement> & {
    columns: Column[];
    records: Record<string, any>[];
    identifierMaker?: (record: Record<string, any>) => string | null;
    elementMaker?: (record: Record<string, any>, column: Column) => ReactElement | undefined;
    leftFunctionButtons?: Record<string, (record: Record<string, any>) => Promise<void> | void>;
    rightFunctionButtons?: Record<string, (record: Record<string, any>) => Promise<void> | void>;
    emptyMessage?: string;
} & React.RefAttributes<HTMLTableElement>>;
export default RecordTable;
