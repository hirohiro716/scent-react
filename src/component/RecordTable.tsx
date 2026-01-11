import React, { HTMLAttributes, MouseEvent, MouseEventHandler, ReactElement, forwardRef, useMemo } from "react";
import { Column, StringObject } from "scent-typescript";

type RecordTableProps = HTMLAttributes<HTMLTableElement> & {
    columns: Column[],
    records: Record<string, any>[],
    identifierMaker?: (record: Record<string, any>) => string | null,
    elementMaker?: (record: Record<string, any>, column: Column) => ReactElement | undefined,
    leftFunctionButtons?: Record<string, (record: Record<string, any>) => Promise<void> | void>,
    rightFunctionButtons?: Record<string, (record: Record<string, any>) => Promise<void> | void>,
    emptyMessage?: string,
}

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
const RecordTable = forwardRef<HTMLTableElement, RecordTableProps>(({columns, identifierMaker, records, elementMaker, leftFunctionButtons, rightFunctionButtons, emptyMessage, ...props}, ref): ReactElement => {
    const defaultIdentifierMaker = (record: Record<string, any>): string | null => {
        return StringObject.from(records.indexOf(record)).toString();
    }
    const fieldElementMaker = (record: Record<string, any>, column: Column): ReactElement => {
        if (elementMaker) {
            const element = elementMaker(record, column);
            if (typeof element !== "undefined") {
                return element;
            }
        }
        return (<>{StringObject.from(record[column.physicalName]).toString()}</>);
    }
    const tableID = useMemo<StringObject>(() => {
        const id = new StringObject(props.id);
        if (id.length() === 0) {
            id.append("idless-record-table");
        }
        return id;
    }, []);
    const makeHeaderKey = (headerName: string): StringObject => {
        return tableID.clone().append("-header-").append(headerName);
    }
    return (
        <table ref={ref} {...props}>
            <thead>
                <tr>
                    {leftFunctionButtons && Object.keys(leftFunctionButtons).map((key) => {
                        return (
                            <th key={makeHeaderKey(key).toString()} className={key}>{key}</th>
                        );
                    })}
                    {Object.values(columns).map((column) => {
                        return (
                            <th key={makeHeaderKey(column.physicalName).toString()} className={column.physicalName}>{column.logicalName}</th>
                        );
                    })}
                    {rightFunctionButtons && Object.keys(rightFunctionButtons).map((key) => {
                        return (
                            <th key={makeHeaderKey(key).toString()} className={key}>{key}</th>
                        );
                    })}
                </tr>
            </thead>
            <tbody>
                {records.map((record) => {
                    const recordKey = tableID.clone().append("-").append(identifierMaker ? identifierMaker(record) : defaultIdentifierMaker(record));
                    const columnKey = recordKey.clone().append("-");
                    return (
                        <tr key={recordKey.toString()}>
                            {leftFunctionButtons && Object.keys(leftFunctionButtons).map((key) => {
                                const handler: MouseEventHandler = async (e: MouseEvent) => {
                                    const button: any = e.target;
                                    try {
                                        button.disabled = true;
                                        const result = leftFunctionButtons[key](record);
                                        if (result instanceof Promise) {
                                            await result;
                                        }
                                    } catch (error: any) {
                                        console.log(error);
                                    } finally {
                                        button.disabled = false;
                                    }
                                }
                                return (
                                    <td key={columnKey.clone().append(key).toString()} className={key}>
                                        <button type="button" onClick={handler}>
                                            {key}
                                        </button>
                                    </td>
                                );
                            })}
                            {Object.values(columns).map((column) => {
                                return (
                                    <td key={columnKey.clone().append(column.physicalName).toString()} className={column.physicalName}>
                                        {fieldElementMaker(record, column)}
                                    </td>
                                );
                            })}
                            {rightFunctionButtons && Object.keys(rightFunctionButtons).map((key) => {
                                const handler: MouseEventHandler = async (e: MouseEvent) => {
                                    const button: any = e.target;
                                    try {
                                        button.disabled = true;
                                        const result = rightFunctionButtons[key](record);
                                        if (result instanceof Promise) {
                                            await result;
                                        }
                                    } catch (error: any) {
                                        console.log(error);
                                    } finally {
                                        button.disabled = false;
                                    }
                                }
                                return (
                                    <td key={columnKey.clone().append(key).toString()} className={key}>
                                        <button type="button" onClick={handler}>
                                            {key}
                                        </button>
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
                {records.length === 0 &&
                    <tr>
                        <td colSpan={[...Object.keys({...leftFunctionButtons}), ...columns, ...Object.keys({...rightFunctionButtons})].length}>
                            <span style={{fontSize:"80%", opacity:"0.25"}}>{typeof emptyMessage !== "undefined" ? emptyMessage : "レコードが見つかりません。"}</span>
                        </td>
                    </tr>
                }
            </tbody>
        </table>
    );
});
export default RecordTable;
