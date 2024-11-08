import React, { HTMLAttributes, MouseEvent, MouseEventHandler, ReactElement, ReactEventHandler, forwardRef, useImperativeHandle, useRef } from "react";
import { Property, StringObject } from "scent-typescript";

type ObjectEditTableProps = HTMLAttributes<HTMLTableElement> & {
    properties: Property[],
    identifierMaker?: (record: Record<string, any>) => string | null,
    objects: Record<string, any>[],
    elementMaker?: (className: string, changeEventHandler: ReactEventHandler<any>, object: Record<string, any>, property: Property, elementFinder: () => HTMLElement | undefined) => ReactElement | undefined,
    leftFunctionButtons?: Record<string, (object: Record<string, any>) => Promise<void> | void>,
    rightFunctionButtons?: Record<string, (object: Record<string, any>) => Promise<void> | void>,
    emptyMessage?: string,
}

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
const ObjectEditTable = forwardRef<HTMLTableElement, ObjectEditTableProps>(({properties, identifierMaker, objects, elementMaker, leftFunctionButtons, rightFunctionButtons, emptyMessage, ...props}, ref): ReactElement => {
    const tableRef = useRef<HTMLTableElement>(null);
    useImperativeHandle(ref, () => {
        return tableRef.current!;
    });
    const defaultIdentifierMaker = (object: Record<string, any>): string | null => {
        return StringObject.from(objects.indexOf(object)).toString();
    }
    const fieldElementMaker = (className: string, object: Record<string, any>, property: Property): ReactElement => {
        const changeEventHandler: ReactEventHandler<any> = (event) => {
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
        const elementFinder = (): HTMLElement | undefined => {
            if (tableRef.current === null) {
                return;
            }
            for (const element of tableRef.current.getElementsByClassName(className)) {
                return element as HTMLElement;
            }
        }
        let element: ReactElement | undefined = undefined;
        if (elementMaker) {
            element = elementMaker(className, changeEventHandler, object, property, elementFinder);
        }
        if (typeof element === "undefined") {
            element = <input type="text" className={className} onChange={changeEventHandler} style={{width:"10em"}} />;
        }
        return element;
    }
    const tableID = new StringObject(props.id);
    if (tableID.length() === 0) {
        tableID.append("idless-object-edit-table");
    }
    const headerKey = tableID.clone().append("-header-");
    return (
        <table ref={tableRef} {...props}>
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
                                const key = columnKey.clone().append(property.physicalName);
                                return (
                                    <td key={key.toString()} className={property.physicalName}>
                                        {fieldElementMaker(key.toString(), object, property)}
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
