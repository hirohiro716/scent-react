import React, { forwardRef, useEffect, useRef, useState } from "react";
import Popup from "./Popup.js";
import ObjectEditTable from "./ObjectEditTable.js";
/**
 * オブジェクト編集テーブルダイアログのコンポーネント。
 *
 * @param props
 * @returns
 */
const ObjectEditTableDialog = forwardRef(({ showing, dispatch, message, properties, identifierMaker, objects, elementMaker, objectValueGetter, elementValueGetter, leftFunctionButtons, rightFunctionButtons, closeFunction, width, overlayBackgroundStyle, ...props }, ref) => {
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
            React.createElement(ObjectEditTable, { properties: properties, identifierMaker: identifierMaker, objects: objects, elementMaker: elementMaker, objectValueGetter: objectValueGetter, elementValueGetter: elementValueGetter, leftFunctionButtons: leftFunctionButtons, rightFunctionButtons: rightFunctionButtons })),
        React.createElement("div", { style: buttonsStyle },
            React.createElement("button", { onClick: closeEvent }, "\u9589\u3058\u308B"))));
});
export default ObjectEditTableDialog;
