import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { DeviceInformation, StringObject } from "scent-typescript";
import RecordTable from "./RecordTable";
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
const SortableTable = forwardRef(({ columns, records, dispatch, identifierMaker, elementMaker, emptyMessage, wrapperElementStyle, dragElementStyle, ...props }, ref) => {
    const isSafari = useMemo(() => DeviceInformation.from().isSafari, []);
    const tableRef = useRef(null);
    useImperativeHandle(ref, () => {
        return tableRef.current;
    });
    const defaultDragStyle = {};
    defaultDragStyle.position = "fixed";
    defaultDragStyle.display = "none";
    defaultDragStyle.pointerEvents = "none";
    defaultDragStyle.backgroundColor = "rgba(240,240,240,0.9)";
    const dragStyle = { ...defaultDragStyle, ...dragElementStyle };
    const tableID = useMemo(() => {
        const id = new StringObject(props.id);
        if (id.length() === 0) {
            id.append("idless-sortable-table");
        }
        return id;
    }, [props.id]);
    // Sort
    const dragElementRef = useRef(null);
    const copyToDragElement = (event) => {
        const target = event.target;
        const tr = target.closest("tr");
        const dragElement = dragElementRef.current;
        for (const childElement of Array.from(dragElement.children)) {
            childElement.remove();
        }
        for (const childElement of Array.from(tr.children)) {
            const clone = childElement.cloneNode(true);
            clone.style.width = childElement.clientWidth + "px";
            dragElement.append(clone);
        }
        dragElement.style.display = "";
        dragElement.style.top = event.clientY - tr.clientHeight / 2 + "px";
    };
    const moveTableRowClone = (tableRowElement, clientY) => {
        const top = clientY - tableRowElement.clientHeight / 2;
        tableRowElement.style.top = top + "px";
    };
    const changeTableRowStyleOnDragOver = (x, y) => {
        if (tableRef.current === null) {
            return;
        }
        for (const tr of tableRef.current.querySelectorAll("tr")) {
            tr.style.opacity = "";
        }
        if (dragElementRef.current === null || dragElementRef.current.style.display === "none") {
            return;
        }
        const element = window.document.elementFromPoint(x, y);
        if (element === null) {
            return;
        }
        const maybeTableRowElement = element.closest("tr");
        if (maybeTableRowElement === null) {
            return;
        }
        const tr = maybeTableRowElement;
        tr.style.opacity = "0.2";
    };
    const changeSortNumber = (destinationElement) => {
        if (typeof records === "undefined" || dragElementRef.current === null) {
            return;
        }
        const sourceElement = dragElementRef.current;
        let destinationDivElement = destinationElement;
        if (destinationDivElement instanceof HTMLDivElement === false) {
            destinationDivElement = destinationElement.closest("div");
        }
        const destinationID = destinationDivElement.getAttribute("data-id");
        const sourceID = sourceElement.querySelector("div").getAttribute("data-id");
        const idAndRecord = new Map();
        for (const record of records) {
            const id = new StringObject(identifierMaker ? identifierMaker(record) : defaultIdentifierMaker(record));
            idAndRecord.set(id.toString(), record);
        }
        const sourceRow = idAndRecord.get(sourceID);
        const destinationRow = idAndRecord.get(destinationID);
        if (typeof sourceRow === "undefined" || typeof destinationRow === "undefined" || sourceRow === destinationRow) {
            return;
        }
        const sortedRows = [];
        let isUp = true;
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
    };
    // Sort at mouse
    const tableRowMouseDownEventHandler = (event) => {
        if (dragElementRef.current === null || event.button !== 0 || event.target instanceof HTMLImageElement) {
            return;
        }
        event.preventDefault();
        const dragElement = dragElementRef.current;
        copyToDragElement(event);
        const mouseMoveEventHandler = (event) => {
            event.preventDefault();
            moveTableRowClone(dragElement, event.clientY);
            changeTableRowStyleOnDragOver(event.clientX, event.clientY);
        };
        window.document.body.onmousemove = mouseMoveEventHandler;
        const mouseUpEventHandler = () => {
            dragElement.style.display = "none";
            changeTableRowStyleOnDragOver(0, 0);
            window.document.body.removeEventListener("mousemove", mouseMoveEventHandler);
            window.document.body.removeEventListener("mouseup", mouseUpEventHandler);
        };
        window.document.body.onmouseup = mouseUpEventHandler;
    };
    const tableRowMouseUpEventHandler = (event) => {
        if (typeof records === "undefined" || dragElementRef.current === null) {
            return;
        }
        event.preventDefault();
        changeSortNumber(event.target);
    };
    // Sort at touch
    const [touchTimeoutHandle, setTouchTimeoutHandle] = useState();
    const touchPointX = useRef();
    const touchPointY = useRef();
    const defaultParentOverflowStyle = useRef("");
    const tableRowPointerDownEventHandler = (event) => {
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
    };
    const tableRowTouchMoveEventHandler = (event) => {
        touchPointX.current = event.touches.item(0).clientX;
        touchPointY.current = event.touches.item(0).clientY;
        if (dragElementRef.current !== null) {
            moveTableRowClone(dragElementRef.current, event.touches.item(0).clientY);
            changeTableRowStyleOnDragOver(event.touches.item(0).clientX, event.touches.item(0).clientY);
        }
    };
    const tableRowTouchEndEventHandler = (event) => {
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
                    const element = window.document.elementFromPoint(touchPointX.current, touchPointY.current);
                    if (element !== null) {
                        changeSortNumber(element);
                    }
                }
                dragElementRef.current.style.display = "none";
            }
            changeTableRowStyleOnDragOver(touchPointX.current, touchPointY.current);
        }
    };
    // Make elements
    const defaultIdentifierMaker = (record) => {
        if (typeof records === "undefined") {
            return null;
        }
        return StringObject.from(records.indexOf(record)).toString();
    };
    const fieldElementMaker = (record, column) => {
        let fieldElement = undefined;
        if (elementMaker) {
            fieldElement = elementMaker(record, column);
        }
        if (typeof fieldElement === "undefined") {
            fieldElement = React.createElement("p", { style: { padding: "0.5em" } }, StringObject.from(record[column.physicalName]).toString());
        }
        const id = new StringObject(identifierMaker ? identifierMaker(record) : defaultIdentifierMaker(record));
        const style = {};
        style.userSelect = "none";
        if (isSafari) {
            style.WebkitUserSelect = "none";
        }
        return (React.createElement("div", { style: style, "data-id": id.toString(), onContextMenu: (event) => { event.preventDefault(); return false; }, onMouseDown: tableRowMouseDownEventHandler, onMouseUp: tableRowMouseUpEventHandler, onPointerDown: tableRowPointerDownEventHandler, onTouchMove: tableRowTouchMoveEventHandler, onTouchEnd: tableRowTouchEndEventHandler }, fieldElement));
    };
    useEffect(() => {
        if (tableRef.current === null) {
            return;
        }
        for (const td of tableRef.current.querySelectorAll("td")) {
            td.style.padding = "0";
        }
    }, [records]);
    return (React.createElement(React.Fragment, null,
        React.createElement(RecordTable, { id: tableID.toString(), columns: columns ? columns : [], records: records ? records : [], identifierMaker: identifierMaker, elementMaker: fieldElementMaker, ref: tableRef, ...props }),
        React.createElement("table", null,
            React.createElement("tbody", null,
                React.createElement("tr", { style: dragStyle, ref: dragElementRef })))));
});
export default SortableTable;
