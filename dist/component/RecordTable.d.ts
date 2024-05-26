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
    identifierMaker?: ((record: Record<string, any>) => string | null) | undefined;
    records: Record<string, any>[];
    elementMaker?: ((record: Record<string, any>, column: Column) => ReactElement | undefined) | undefined;
    leftFunctionButtons?: Record<string, (record: Record<string, any>) => Promise<void> | void> | undefined;
    rightFunctionButtons?: Record<string, (record: Record<string, any>) => Promise<void> | void> | undefined;
} & React.RefAttributes<HTMLTableElement>>;
export default RecordTable;
