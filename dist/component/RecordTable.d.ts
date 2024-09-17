import React, { ReactElement } from "react";
import { Column } from "scent-typescript";
/**
 * レコードを表示するテーブルコンポーネント。
 *
 * @param props
 * @returns
 */
declare const RecordTable: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableElement> & {
    columns: Column[];
    identifierMaker?: (record: Record<string, any>) => string | null;
    records: Record<string, any>[];
    elementMaker?: (record: Record<string, any>, column: Column) => ReactElement | undefined;
    leftFunctionButtons?: Record<string, (record: Record<string, any>) => Promise<void> | void>;
    rightFunctionButtons?: Record<string, (record: Record<string, any>) => Promise<void> | void>;
    emptyMessage?: string;
} & React.RefAttributes<HTMLTableElement>>;
export default RecordTable;
