import React, { forwardRef } from "react";
import { StringObject } from "scent-typescript";
/**
 * レコードを表示するテーブルコンポーネント。
 *
 * @param columns カラムの配列。
 * @param identifierMaker
 * @param records レコードのオブジェクトから一意の値を作成するコールバック。未指定の場合は行番号が使用される。
 * @param elementMaker フィールドに表示する要素を作成するコールバック。
 * @param leftFunctionButtons データ列の左側に表示するボタンを作成するコールバック。
 * @param rightFunctionButtons データ列の右側に表示するボタンを作成するコールバック。
 * @param emptyMessage 表示するレコードがゼロ件の場合に表示するメッセージ。
 * @param props
 * @returns
 */
const RecordTable = forwardRef(({ columns, identifierMaker, records, elementMaker, leftFunctionButtons, rightFunctionButtons, emptyMessage, ...props }, ref) => {
    const defaultIdentifierMaker = (record) => {
        return StringObject.from(records.indexOf(record)).toString();
    };
    const fieldElementMaker = (record, column) => {
        if (elementMaker) {
            const element = elementMaker(record, column);
            if (typeof element !== "undefined") {
                return element;
            }
        }
        return (React.createElement(React.Fragment, null, StringObject.from(record[column.physicalName]).toString()));
    };
    const tableID = new StringObject(props.id);
    if (tableID.length() === 0) {
        tableID.append("idless-record-table");
    }
    const headerKey = tableID.clone().append("-header-");
    return (React.createElement("table", { ref: ref, ...props },
        React.createElement("thead", null,
            React.createElement("tr", null,
                leftFunctionButtons && Object.keys(leftFunctionButtons).map((key) => {
                    return (React.createElement("th", { key: headerKey.clone().append(key).toString(), className: key }, key));
                }),
                Object.values(columns).map((column) => {
                    return (React.createElement("th", { key: headerKey.clone().append(column.physicalName).toString(), className: column.physicalName }, column.logicalName));
                }),
                rightFunctionButtons && Object.keys(rightFunctionButtons).map((key) => {
                    return (React.createElement("th", { key: headerKey.clone().append(key).toString(), className: key }, key));
                }))),
        React.createElement("tbody", null,
            records.map((record) => {
                const recordKey = tableID.clone().append("-").append(identifierMaker ? identifierMaker(record) : defaultIdentifierMaker(record));
                const columnKey = recordKey.clone().append("-");
                return (React.createElement("tr", { key: recordKey.toString() },
                    leftFunctionButtons && Object.keys(leftFunctionButtons).map((key) => {
                        const handler = async (e) => {
                            const button = e.target;
                            try {
                                button.disabled = true;
                                const result = leftFunctionButtons[key](record);
                                if (result instanceof Promise) {
                                    await result;
                                }
                            }
                            catch (error) {
                                console.log(error);
                            }
                            finally {
                                button.disabled = false;
                            }
                        };
                        return (React.createElement("td", { key: columnKey.clone().append(key).toString(), className: key },
                            React.createElement("button", { type: "button", onClick: handler }, key)));
                    }),
                    Object.values(columns).map((column) => {
                        return (React.createElement("td", { key: columnKey.clone().append(column.physicalName).toString(), className: column.physicalName }, fieldElementMaker(record, column)));
                    }),
                    rightFunctionButtons && Object.keys(rightFunctionButtons).map((key) => {
                        const handler = async (e) => {
                            const button = e.target;
                            try {
                                button.disabled = true;
                                const result = rightFunctionButtons[key](record);
                                if (result instanceof Promise) {
                                    await result;
                                }
                            }
                            catch (error) {
                                console.log(error);
                            }
                            finally {
                                button.disabled = false;
                            }
                        };
                        return (React.createElement("td", { key: columnKey.clone().append(key).toString(), className: key },
                            React.createElement("button", { type: "button", onClick: handler }, key)));
                    })));
            }),
            records.length === 0 &&
                React.createElement("tr", null,
                    React.createElement("td", { colSpan: [...Object.keys({ ...leftFunctionButtons }), ...columns, ...Object.keys({ ...rightFunctionButtons })].length },
                        React.createElement("span", { style: { fontSize: "80%", opacity: "0.25" } }, typeof emptyMessage !== "undefined" ? emptyMessage : "レコードが見つかりません。"))))));
});
export default RecordTable;
