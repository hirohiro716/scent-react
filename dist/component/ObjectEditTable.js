import React, { forwardRef, useState } from "react";
import { StringObject } from "scent-typescript";
/**
 * オブジェクトを編集するテーブルコンポーネント。
 *
 * @param props
 * @returns
 */
const ObjectEditTable = forwardRef(({ properties, identifierMaker, objects, elementMaker, leftFunctionButtons, rightFunctionButtons, emptyMessage, ...props }, ref) => {
    const defaultIdentifierMaker = (object) => {
        return StringObject.from(objects.indexOf(object)).toString();
    };
    const fieldElementMaker = (object, property) => {
        const [value, dispatch] = useState(StringObject.from(object[property.physicalName]).toString());
        const onChangeEventHandler = (event) => {
            switch (event.currentTarget.type) {
                case "checkbox":
                case "radio":
                    dispatch(StringObject.from(event.currentTarget.checked).toString());
                    object[property.physicalName] = event.currentTarget.checked;
                    break;
                default:
                    dispatch(event.currentTarget.value);
                    object[property.physicalName] = event.currentTarget.value;
                    break;
            }
        };
        let element = undefined;
        if (elementMaker) {
            element = elementMaker(value, dispatch, onChangeEventHandler, object, property);
        }
        if (typeof element === "undefined") {
            element = React.createElement("input", { type: "text", onChange: onChangeEventHandler, value: value, style: { width: "10em" } });
        }
        return element;
    };
    const tableID = new StringObject(props.id);
    if (tableID.length() === 0) {
        tableID.append("idless-object-edit-table");
    }
    const headerKey = tableID.clone().append("-header-");
    return (React.createElement("table", { ref: ref, ...props },
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
                        return (React.createElement("td", { key: columnKey.clone().append(property.physicalName).toString(), className: property.physicalName }, fieldElementMaker(object, property)));
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
