import React, { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { StringObject } from "scent-typescript";
/**
 * オブジェクトを編集するテーブルコンポーネント。
 *
 * @param properties 列プロパティの配列。
 * @param objects 編集する行オブジェクトの配列。
 * @param objectsTimestamp 行オブジェクトのタイムスタンプ。以前の値と異なる場合はすべてのフィールドが再マウントされる。
 * @param identifierMaker 行のオブジェクトから一意の値を作成するコールバック。未指定の場合は行番号が使用される。
 * @param elementMaker フィールドに表示する要素を作成するコールバック。引数のクラス名とChangeEventHandlerを使用して要素を作成して返す必要がある。
 * @param leftFunctionButtons データ列の左側に表示するボタンを作成するコールバック。
 * @param rightFunctionButtons データ列の右側に表示するボタンを作成するコールバック。
 * @param emptyMessage 表示する行オブジェクトがゼロ件の場合に表示するメッセージ。
 * @param props
 * @returns
 */
const ObjectEditTable = forwardRef(({ properties, objects, objectsTimestamp = 1, identifierMaker, elementMaker, leftFunctionButtons, rightFunctionButtons, emptyMessage, ...props }, ref) => {
    const tableRef = useRef(null);
    useImperativeHandle(ref, () => {
        return tableRef.current;
    });
    const defaultIdentifierMaker = (object) => {
        return StringObject.from(objects.indexOf(object)).toString();
    };
    const tableID = useMemo(() => {
        const id = new StringObject(props.id);
        if (id.length() === 0) {
            id.append("idless-object-edit-table");
        }
        return id;
    }, []);
    const makeHeaderKey = (headerName) => {
        return tableID.clone().append("-").append(objectsTimestamp).append("-header-").append(headerName);
    };
    const makeRowKey = (object) => {
        return tableID.clone().append("-").append(objectsTimestamp).append("-").append(identifierMaker ? identifierMaker(object) : defaultIdentifierMaker(object));
    };
    const makeFieldKey = (object, fieldName) => {
        return makeRowKey(object).append("-").append(fieldName);
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
        const elementFinder = (object, property) => {
            if (tableRef.current === null) {
                return;
            }
            const classNameForSearch = makeFieldKey(object, property.physicalName);
            for (const element of tableRef.current.getElementsByClassName(classNameForSearch.toString())) {
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
    return (React.createElement("table", { ref: tableRef, ...props },
        React.createElement("thead", null,
            React.createElement("tr", null,
                leftFunctionButtons && Object.keys(leftFunctionButtons).map((key) => {
                    return (React.createElement("th", { key: makeHeaderKey(key).toString(), className: key }, key));
                }),
                Object.values(properties).map((property) => {
                    return (React.createElement("th", { key: makeHeaderKey(property.physicalName).toString(), className: property.physicalName }, property.logicalName));
                }),
                rightFunctionButtons && Object.keys(rightFunctionButtons).map((key) => {
                    return (React.createElement("th", { key: makeHeaderKey(key).toString(), className: key }, key));
                }))),
        React.createElement("tbody", null,
            objects.map((object) => {
                return (React.createElement("tr", { key: makeRowKey(object).toString() },
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
                        return (React.createElement("td", { key: makeFieldKey(object, key).toString(), className: key },
                            React.createElement("button", { type: "button", onClick: handler }, key)));
                    }),
                    Object.values(properties).map((property) => {
                        const key = makeFieldKey(object, property.physicalName).toString();
                        return (React.createElement("td", { key: key, className: property.physicalName }, fieldElementMaker(key, object, property)));
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
                        return (React.createElement("td", { key: makeFieldKey(object, key).toString(), className: key },
                            React.createElement("button", { type: "button", onClick: handler }, key)));
                    })));
            }),
            objects.length === 0 &&
                React.createElement("tr", null,
                    React.createElement("td", { colSpan: [...Object.keys({ ...leftFunctionButtons }), ...properties, ...Object.keys({ ...rightFunctionButtons })].length },
                        React.createElement("span", { style: { fontSize: "80%", opacity: "0.25" } }, typeof emptyMessage !== "undefined" ? emptyMessage : "情報がありません。"))))));
});
export default ObjectEditTable;
