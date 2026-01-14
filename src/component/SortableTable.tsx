import React, { CSSProperties, Dispatch, HTMLAttributes, MouseEventHandler, PointerEventHandler, ReactElement, SetStateAction, TouchEventHandler, forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Column, DeviceInformation, StringObject } from "scent-typescript";
import RecordTable from "./RecordTable";

type SortableListProps = HTMLAttributes<HTMLTableElement> & {
    columns: Column[],
    records: Record<string, any>[] | undefined,
    dispatch: Dispatch<SetStateAction<Record<string, any>[] | undefined>>,
    identifierMaker?: (record: Record<string, any>) => string | null,
    elementMaker?: (record: Record<string, any>, column: Column) => ReactElement | undefined,
    emptyMessage?: string,
    wrapperElementStyle?: CSSProperties,
    dragElementStyle?: CSSProperties,
}

/**
 * 並び替え可能なテーブルコンポーネント。
 * 
 * @param columns カラムの配列。
 * @param records 並び替えるレコードオブジェクトの配列。
 * @param dispatch 並び替えた際にレコードオブジェクトの配列を変更するためのDispatch。
 * @param identifierMaker レコードのオブジェクトから一意の値を作成するコールバック。未指定の場合は行番号が使用される。
 * @param elementMaker 行に表示する要素を作成するコールバック。
 * @param emptyMessage 表示するレコードがゼロ件の場合に表示するメッセージ。
 * @param wrapperElementStyle ラッパー要素のスタイル。
 * @param dragElementStyle ドラッグ中の要素のスタイル。
 * @param props 
 * @returns 
 */
const SortableTable = forwardRef<HTMLTableElement, SortableListProps>(({columns, records, dispatch, identifierMaker, elementMaker, emptyMessage, wrapperElementStyle, dragElementStyle, ...props}, ref): ReactElement => {
    const isSafari = useMemo<boolean>(() => DeviceInformation.from().isSafari, []);
    const tableRef = useRef<HTMLTableElement>(null);
    useImperativeHandle(ref, () => {
        return tableRef.current!;
    });
    const defaultDragStyle: CSSProperties = {};
    defaultDragStyle.position = "fixed";
    defaultDragStyle.display = "none";
    defaultDragStyle.pointerEvents = "none";
    defaultDragStyle.backgroundColor = "rgba(240,240,240,0.9)";
    const dragStyle: CSSProperties = {...defaultDragStyle, ...dragElementStyle};
    const tableID = useMemo<StringObject>(() => {
        const id = new StringObject(props.id);
        if (id.length() === 0) {
            id.append("idless-sortable-table");
        }
        return id;
    }, [props.id]);
    // Sort
    const dragElementRef = useRef<HTMLTableRowElement>(null);
    const copyToDragElement = (event: React.MouseEvent | React.PointerEvent): void => {
        const target: HTMLElement = event.target as HTMLElement;
        const tr: HTMLTableRowElement = target.closest("tr")!;
        const dragElement: HTMLTableRowElement = dragElementRef.current!;
        for (const childElement of Array.from(dragElement.children)) {
            childElement.remove();
        }
        for (const childElement of Array.from(tr.children)) {
            const clone = childElement.cloneNode(true) as HTMLElement;
            clone.style.width = childElement.clientWidth + "px";
            dragElement.append(clone);
        }
        dragElement.style.display = "";
        dragElement.style.top = event.clientY - tr.clientHeight / 2 + "px";
    }
    const moveTableRowClone = (tableRowElement: HTMLTableRowElement, clientY: number): void => {
        const top: number = clientY - tableRowElement.clientHeight / 2;
        tableRowElement.style.top = top + "px";
    }
    const changeTableRowStyleOnDragOver = (x: number, y: number): void => {
        if (tableRef.current === null) {
            return;
        }
        for (const tr of tableRef.current.querySelectorAll("tr")) {
            tr.style.opacity = "";
        }
        if (dragElementRef.current === null || dragElementRef.current.style.display === "none") {
            return;
        }
        const element: Element | null = window.document.elementFromPoint(x, y);
        if (element === null) {
            return;
        }
        const maybeTableRowElement: Element | null = element.closest("tr");
        if (maybeTableRowElement === null) {
            return;
        }
        const tr = maybeTableRowElement as HTMLTableRowElement;
        tr.style.opacity = "0.2";
    }
    const changeSortNumber = (destinationElement: HTMLElement): void => {
        if (typeof records === "undefined" || dragElementRef.current === null) {
            return;
        }
        const sourceElement = dragElementRef.current;
        let destinationDivElement: HTMLElement = destinationElement;
        if (destinationDivElement instanceof HTMLDivElement === false) {
            destinationDivElement = destinationElement.closest("div")!;
        }
        const destinationID: string = destinationDivElement.getAttribute("data-id")!;
        const sourceID: string = sourceElement.querySelector("div")!.getAttribute("data-id")!;
        const idAndRecord: Map<string, Record<string, any>> = new Map();
        for (const record of records) {
            const id = new StringObject(identifierMaker ? identifierMaker(record) : defaultIdentifierMaker(record));
            idAndRecord.set(id.toString(), record);
        }
        const sourceRow = idAndRecord.get(sourceID);
        const destinationRow = idAndRecord.get(destinationID);
        if (typeof sourceRow === "undefined" || typeof destinationRow === "undefined" || sourceRow === destinationRow) {
            return;
        }
        const sortedRows: Record<string, any>[] = [];
        let isUp: boolean = true;
        for (const record of records) {
            if (record === sourceRow) {
                isUp = false;
                continue;
            }
            if (isUp && record === destinationRow) {
                sortedRows.push(sourceRow);
            }
            sortedRows.push(record);
            if (isUp === false && record === destinationRow) {
                sortedRows.push(sourceRow);
            }
        }
        dispatch(sortedRows);
        changeTableRowStyleOnDragOver(0, 0);
    }
    // Sort at mouse
    const tableRowMouseDownEventHandler: MouseEventHandler = (event: React.MouseEvent) => {
        if (dragElementRef.current === null || event.button !== 0 || event.target instanceof HTMLImageElement) {
            return;
        }
        event.preventDefault();
        const dragElement = dragElementRef.current;
        copyToDragElement(event);
        const mouseMoveEventHandler = (event: MouseEvent) => {
            event.preventDefault();
            moveTableRowClone(dragElement, event.clientY);
            changeTableRowStyleOnDragOver(event.clientX, event.clientY);
        }
        window.document.body.onmousemove = mouseMoveEventHandler;
        const mouseUpEventHandler = () => {
            dragElement.style.display = "none";
            changeTableRowStyleOnDragOver(0, 0);
            window.document.body.removeEventListener("mousemove", mouseMoveEventHandler);
            window.document.body.removeEventListener("mouseup", mouseUpEventHandler);
        }
        window.document.body.onmouseup = mouseUpEventHandler;
    }
    const tableRowMouseUpEventHandler: MouseEventHandler = (event: React.MouseEvent) => {
        if (typeof records === "undefined" || dragElementRef.current === null) {
            return;
        }
        event.preventDefault();
        changeSortNumber(event.target as HTMLDivElement);
    }
    // Sort at touch
    const [touchTimeoutHandle, setTouchTimeoutHandle] = useState<NodeJS.Timeout>();
    const touchPointX = useRef<number>();
    const touchPointY = useRef<number>();
    const defaultParentOverflowStyle = useRef<string>("");
    const tableRowPointerDownEventHandler: PointerEventHandler = (event: React.PointerEvent) => {
        if (navigator.maxTouchPoints === 0) {
            return;
        }
        event.preventDefault();
        const x = event.clientX;
        const y = event.clientY;
        touchPointX.current = x;
        touchPointY.current = y;
        const handle = setTimeout(() => {
            if (typeof touchPointX.current === "undefined" || typeof touchPointY.current === "undefined") {
                return;
            }
            const differenceX = Math.abs(x - touchPointX.current);
            const differenceY = Math.abs(y - touchPointY.current);
            if (differenceX > 20 || differenceY > 20) {
                return;
            }
            setTouchTimeoutHandle(undefined);
            if (tableRef.current === null || tableRef.current.parentElement === null) {
                return;
            }
            defaultParentOverflowStyle.current = tableRef.current.parentElement.style.overflow;
            tableRef.current.parentElement.style.overflow = "hidden";
            if (isSafari) {
                window.document.body.style.width = "calc(100% + 0.5em)";
            }
            copyToDragElement(event);
        }, 500);
        setTouchTimeoutHandle(handle);
    }
    const tableRowTouchMoveEventHandler: TouchEventHandler = (event: React.TouchEvent) => {
        touchPointX.current = event.touches.item(0).clientX;
        touchPointY.current = event.touches.item(0).clientY;
        if (dragElementRef.current !== null) {
            moveTableRowClone(dragElementRef.current, event.touches.item(0).clientY);
            changeTableRowStyleOnDragOver(event.touches.item(0).clientX, event.touches.item(0).clientY);
        }
    }
    const tableRowTouchEndEventHandler: TouchEventHandler = (event: React.TouchEvent) => {
        if (typeof touchTimeoutHandle !== "undefined") {
            clearTimeout(touchTimeoutHandle);
        }
        if (typeof touchPointX.current !== "undefined" && typeof touchPointY.current !== "undefined") {
            if (dragElementRef.current !== null) {
                if (tableRef.current !== null && tableRef.current.parentElement !== null && dragElementRef.current.style.display !== "none") {
                    tableRef.current.parentElement.style.overflow = defaultParentOverflowStyle.current;
                    if (isSafari) {
                        window.document.body.style.width = "";
                    }
                    const element: Element | null = window.document.elementFromPoint(touchPointX.current, touchPointY.current);
                    if (element !== null) {
                        changeSortNumber(element as HTMLDivElement);
                    }
                }
                dragElementRef.current.style.display = "none";
            }
            changeTableRowStyleOnDragOver(touchPointX.current, touchPointY.current);
        }
    }
    // Make elements
    const defaultIdentifierMaker = (record: Record<string, any>): string | null => {
        if (typeof records === "undefined") {
            return null;
        }
        return StringObject.from(records.indexOf(record)).toString();
    }
    const fieldElementMaker = (record: Record<string, any>, column: Column): ReactElement => {
        let fieldElement: ReactElement | undefined = undefined;
        if (elementMaker) {
            fieldElement = elementMaker(record, column);
        }
        if (typeof fieldElement === "undefined") {
            fieldElement = <p style={{padding: "0.5em"}}>{StringObject.from(record[column.physicalName]).toString()}</p>;
        }
        const id = new StringObject(identifierMaker ? identifierMaker(record) : defaultIdentifierMaker(record));
        const style: CSSProperties = {};
        style.userSelect = "none";
        if (isSafari) {
            style.WebkitUserSelect = "none";
        }
        return (
            <div style={style} data-id={id.toString()} onContextMenu={(event) => { event.preventDefault(); return false; }}
                onMouseDown={tableRowMouseDownEventHandler} onMouseUp={tableRowMouseUpEventHandler}
                onPointerDown={tableRowPointerDownEventHandler} onTouchMove={tableRowTouchMoveEventHandler} onTouchEnd={tableRowTouchEndEventHandler}>
                {fieldElement}
            </div>
        );
    }
    useEffect(() => {
        if (tableRef.current === null) {
            return;
        }
        for (const td of tableRef.current.querySelectorAll("td")) {
            td.style.padding = "0";
        }
    }, [records]);
    return (
        <>
            <RecordTable id={tableID.toString()} columns={columns ? columns : []} records={records ? records : []} identifierMaker={identifierMaker} elementMaker={fieldElementMaker} ref={tableRef} {...props} />
            <table><tbody><tr style={dragStyle} ref={dragElementRef}></tr></tbody></table>
        </>
    );
});
export default SortableTable;
