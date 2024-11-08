import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { StringObject } from "scent-typescript";
/**
 * オブジェクトを編集するテーブルコンポーネント。
 *
 * @param properties 列プロパティの配列。
 * @param identifierMaker 行のオブジェクトから一意の値を作成するコールバック。未指定の場合は行番号が使用される。
 * @param objects 編集する行オブジェクトの配列。
 * @param elementMaker フィールドに表示する要素を作成するコールバック。引数のクラス名とChangeEventHandlerを使用して要素を作成して返す必要がある。
 * @param leftFunctionButtons データ列の左側に表示するボタンを作成するコールバック。
 * @param rightFunctionButtons データ列の右側に表示するボタンを作成するコールバック。
 * @param emptyMessage 表示する行オブジェクトがゼロ件の場合に表示するメッセージ。
 * @param props
 * @returns
 */
const ObjectEditTable = forwardRef(({ properties, identifierMaker, objects, elementMaker, leftFunctionButtons, rightFunctionButtons, emptyMessage, ...props }, ref) => {
    const tableRef = useRef(null);
    useImperativeHandle(ref, () => {
        return tableRef.current;
    });
    const defaultIdentifierMaker = (object) => {
        return StringObject.from(objects.indexOf(object)).toString();
    };
    const fieldElementMaker = (className, object, property) => {
        const changeEventHandler = (event) => {
            switch (event.currentTarget.type) {
                case "checkbox":
                case "radio":
                    object[property.physicalName] = event.currentTarget.checked;
                    break;
                default:
                    object[property.physicalName] = event.currentTarget.value;
                    break;
            }
        };
        const elementFinder = () => {
            if (tableRef.current === null) {
                return;
            }
            for (const element of tableRef.current.getElementsByClassName(className)) {
                return element;
            }
        };
        let element = undefined;
        if (elementMaker) {
            element = elementMaker(className, changeEventHandler, object, property, elementFinder);
        }
        if (typeof element === "undefined") {
            element = React.createElement("input", { type: "text", className: className, onChange: changeEventHandler, style: { width: "10em" } });
        }
        return element;
    };
    const tableID = new StringObject(props.id);
    if (tableID.length() === 0) {
        tableID.append("idless-object-edit-table");
    }
    const headerKey = tableID.clone().append("-header-");
    return (React.createElement("table", { ref: tableRef, ...props },
        React.createElement("thead", null,
            React.createElement("tr", null,
                leftFunctionButtons && Object.keys(leftFunctionButtons).map((key) => {
                    return (React.createElement("th", { key: headerKey.clone().append(key).toString(), className: key }, key));
                }),
                Object.values(properties).map((property) => {
                    return (React.createElement("th", { key: headerKey.clone().append(property.physicalName).toString(), className: property.physicalName }, property.logicalName));
                }),
                rightFunctionButtons && Object.keys(rightFunctionButtons).map((key) => {
                    return (React.createElement("th", { key: headerKey.clone().append(key).toString(), className: key }, key));
                }))),
        React.createElement("tbody", null,
            objects.map((object) => {
                const rowKey = tableID.clone().append("-").append(identifierMaker ? identifierMaker(object) : defaultIdentifierMaker(object));
                const columnKey = rowKey.clone().append("-");
                return (React.createElement("tr", { key: rowKey.toString() },
                    leftFunctionButtons && Object.keys(leftFunctionButtons).map((key) => {
                        const handler = async (e) => {
                            const button = e.target;
                            try {
                                button.disabled = true;
                                const result = leftFunctionButtons[key](object);
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
                            React.createElement("button", { onClick: handler }, key)));
                    }),
                    Object.values(properties).map((property) => {
                        const key = columnKey.clone().append(property.physicalName);
                        return (React.createElement("td", { key: key.toString(), className: property.physicalName }, fieldElementMaker(key.toString(), object, property)));
                    }),
                    rightFunctionButtons && Object.keys(rightFunctionButtons).map((key) => {
                        const handler = async (e) => {
                            const button = e.target;
                            try {
                                button.disabled = true;
                                const result = rightFunctionButtons[key](object);
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
                            React.createElement("button", { onClick: handler }, key)));
                    })));
            }),
            objects.length === 0 &&
                React.createElement("tr", null,
                    React.createElement("td", { colSpan: [...Object.keys({ ...leftFunctionButtons }), ...objects, ...Object.keys({ ...rightFunctionButtons })].length },
                        React.createElement("span", { style: { fontSize: "80%", opacity: "0.25" } }, typeof emptyMessage !== "undefined" ? emptyMessage : "情報がありません。"))))));
});
export default ObjectEditTable;
