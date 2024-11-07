import React, { Dispatch, HTMLAttributes, MouseEvent, MouseEventHandler, ReactElement, ReactEventHandler, SetStateAction, forwardRef, useState } from "react";
import { Property, StringObject } from "scent-typescript";

type ObjectEditTableProps = HTMLAttributes<HTMLTableElement> & {
    properties: Property[],
    identifierMaker?: (record: Record<string, any>) => string | null,
    objects: Record<string, any>[],
    elementMaker?: (value: string, dispatch: Dispatch<SetStateAction<string>>, onChangeEventHandler: ReactEventHandler<any>, object: Record<string, any>, property: Property) => ReactElement | undefined,
    leftFunctionButtons?: Record<string, (object: Record<string, any>) => Promise<void> | void>,
    rightFunctionButtons?: Record<string, (object: Record<string, any>) => Promise<void> | void>,
    emptyMessage?: string,
}

/**
 * オブジェクトを編集するテーブルコンポーネント。
 * 
 * @param props 
 * @returns 
 */
const ObjectEditTable = forwardRef<HTMLTableElement, ObjectEditTableProps>(({properties, identifierMaker, objects, elementMaker, leftFunctionButtons, rightFunctionButtons, emptyMessage, ...props}, ref): ReactElement => {
    const defaultIdentifierMaker = (object: Record<string, any>): string | null => {
        return StringObject.from(objects.indexOf(object)).toString();
    }
    const fieldElementMaker = (object: Record<string, any>, property: Property): ReactElement => {
        const [value, dispatch] = useState<string>(StringObject.from(object[property.physicalName]).toString());
        const onChangeEventHandler: ReactEventHandler<any> = (event) => {
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
        }
        let element: ReactElement | undefined = undefined;
        if (elementMaker) {
            element = elementMaker(value, dispatch, onChangeEventHandler, object, property);
        }
        if (typeof element === "undefined") {
            element = <input type="text" onChange={onChangeEventHandler} value={value} style={{width:"10em"}} />;
        }
        return element;
    }
    const tableID = new StringObject(props.id);
    if (tableID.length() === 0) {
        tableID.append("idless-object-edit-table");
    }
    const headerKey = tableID.clone().append("-header-");
    return (
        <table ref={ref} {...props}>
            <thead>
                <tr>
                    {leftFunctionButtons && Object.keys(leftFunctionButtons).map((key) => {
                        return (
                            <th key={headerKey.clone().append(key).toString()} className={key}>{key}</th>
                        );
                    })}
                    {Object.values(properties).map((property) => {
                        return (
                            <th key={headerKey.clone().append(property.physicalName).toString()} className={property.physicalName}>{property.logicalName}</th>
                        );
                    })}
                    {rightFunctionButtons && Object.keys(rightFunctionButtons).map((key) => {
                        return (
                            <th key={headerKey.clone().append(key).toString()} className={key}>{key}</th>
                        );
                    })}
                </tr>
            </thead>
            <tbody>
                {objects.map((object) => {
                    const rowKey = tableID.clone().append("-").append(identifierMaker ? identifierMaker(object) : defaultIdentifierMaker(object));
                    const columnKey = rowKey.clone().append("-");
                    return (
                        <tr key={rowKey.toString()}>
                            {leftFunctionButtons && Object.keys(leftFunctionButtons).map((key) => {
                                const handler: MouseEventHandler = async (e: MouseEvent) => {
                                    const button: any = e.target;
                                    try {
                                        button.disabled = true;
                                        const result = leftFunctionButtons[key](object);
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
                                        <button onClick={handler}>
                                            {key}
                                        </button>
                                    </td>
                                );
                            })}
                            {Object.values(properties).map((property) => {
                                return (
                                    <td key={columnKey.clone().append(property.physicalName).toString()} className={property.physicalName}>
                                        {fieldElementMaker(object, property)}
                                    </td>
                                );
                            })}
                            {rightFunctionButtons && Object.keys(rightFunctionButtons).map((key) => {
                                const handler: MouseEventHandler = async (e: MouseEvent) => {
                                    const button: any = e.target;
                                    try {
                                        button.disabled = true;
                                        const result = rightFunctionButtons[key](object);
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
                                        <button onClick={handler}>
                                            {key}
                                        </button>
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
                {objects.length === 0 &&
                    <tr>
                        <td colSpan={[...Object.keys({...leftFunctionButtons}), ...objects, ...Object.keys({...rightFunctionButtons})].length}>
                            <span style={{fontSize:"80%", opacity:"0.25"}}>{typeof emptyMessage !== "undefined" ? emptyMessage : "情報がありません。"}</span>
                        </td>
                    </tr>
                }
            </tbody>
        </table>
    );
});
export default ObjectEditTable;
