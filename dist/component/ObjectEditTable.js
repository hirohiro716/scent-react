import React, { forwardRef } from "react";
import { StringObject } from "scent-typescript";
/**
 * オブジェクトを編集するテーブルコンポーネント。
 *
 * @param props
 * @returns
 */
const ObjectEditTable = forwardRef(({ properties, identifierMaker, objects, elementMaker, objectValueGetter, elementValueGetter, leftFunctionButtons, rightFunctionButtons, emptyMessage, ...props }, ref) => {
    const defaultIdentifierMaker = (object) => {
        return StringObject.from(objects.indexOf(object)).toString();
    };
    const fieldElementMaker = (object, property) => {
        const onChangeEventHandler = (event) => {
            if (elementValueGetter) {
                const value = elementValueGetter(property, object, event.currentTarget);
                object[property.physicalName] = value;
            }
            else {
                switch (event.currentTarget.type) {
                    case "checkbox":
                    case "radio":
                        object[property.physicalName] = event.currentTarget.checked;
                        break;
                    default:
                        object[property.physicalName] = event.currentTarget.value;
                        break;
                }
            }
        };
        let element = undefined;
        if (elementMaker) {
            element = elementMaker(object, property, onChangeEventHandler);
        }
        if (typeof element === "undefined") {
            element = React.createElement("input", { type: "text", defaultValue: objectValueGetter ? objectValueGetter(property, object) : StringObject.from(object[property.physicalName]).toString(), onChange: onChangeEventHandler, style: { width: "10em" } });
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
