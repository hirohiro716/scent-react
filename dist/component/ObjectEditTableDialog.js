import React, { forwardRef, useEffect, useRef, useState } from "react";
import Popup from "./Popup.js";
import ObjectEditTable from "./ObjectEditTable.js";
/**
 * オブジェクト編集テーブルダイアログのコンポーネント。
 *
 * @param showing 表示する場合はtrueを指定する。
 * @param dispatch 表示と非表示を切り替えるためのDispatch。
 * @param message メッセージ。
 * @param properties 列プロパティの配列。
 * @param identifierMaker 行のオブジェクトから一意の値を作成するコールバック。未指定の場合は行番号が使用される。
 * @param objects 編集する行オブジェクトの配列。
 * @param elementMaker フィールドに表示する要素を作成するコールバック。引数のクラス名とChangeEventHandlerを使用して要素を作成して返す必要がある。
 * @param leftFunctionButtons データ列の左側に表示するボタンを作成するコールバック。
 * @param rightFunctionButtons データ列の右側に表示するボタンを作成するコールバック。
 * @param closeFunction ダイアログを閉じる際の処理。
 * @param width ダイアログの幅。
 * @param overlayBackgroundStyle 背景要素へ渡すスタイル。
 * @param props
 * @returns
 */
const ObjectEditTableDialog = forwardRef(({ showing, dispatch, message, properties, identifierMaker, objects, elementMaker, leftFunctionButtons, rightFunctionButtons, closeFunction, width, overlayBackgroundStyle, ...props }, ref) => {
    const preStyle = {};
    preStyle.width = "100%";
    preStyle.paddingBottom = "1em";
    preStyle.whiteSpace = "pre-wrap";
    const tableStyle = {};
    tableStyle.maxHeight = "calc(100vh - 20em)";
    tableStyle.marginBottom = "1em";
    tableStyle.padding = "1em 0.5em";
    tableStyle.overflow = "scroll";
    const labelStyle = {};
    labelStyle.display = "flex";
    labelStyle.flexDirection = "row";
    labelStyle.gap = "0.1em";
    const buttonsStyle = {};
    buttonsStyle.display = "flex";
    buttonsStyle.flexDirection = "row";
    buttonsStyle.justifyContent = "right";
    buttonsStyle.gap = "0.5em";
    const [alreadyPressed, setAlreadyPressed] = useState(false);
    const closeEvent = async (e) => {
        if (alreadyPressed) {
            return;
        }
        setAlreadyPressed(true);
        if (closeFunction) {
            try {
                await closeFunction();
            }
            catch (error) {
                console.log(error);
            }
        }
        dispatch(false);
    };
    const preRef = useRef(null);
    useEffect(() => {
        setAlreadyPressed(false);
        if (preRef.current) {
            preRef.current.focus();
        }
    }, [showing]);
    return (React.createElement(Popup, { showing: showing, dispatch: dispatch, width: width, closeButtonStyle: { display: "none" }, overlayBackgroundStyle: overlayBackgroundStyle, cancelFunction: closeFunction, ref: ref, ...props },
        React.createElement("pre", { style: preStyle, tabIndex: 0, ref: preRef }, message),
        React.createElement("div", { style: tableStyle },
            React.createElement(ObjectEditTable, { properties: properties, identifierMaker: identifierMaker, objects: objects, elementMaker: elementMaker, leftFunctionButtons: leftFunctionButtons, rightFunctionButtons: rightFunctionButtons })),
        React.createElement("div", { style: buttonsStyle },
            React.createElement("button", { type: "button", onClick: closeEvent }, "\u9589\u3058\u308B"))));
});
export default ObjectEditTableDialog;
