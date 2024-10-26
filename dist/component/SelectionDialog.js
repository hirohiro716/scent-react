import React, { forwardRef, useEffect, useRef, useState } from "react";
import Popup from "./Popup.js";
import { StringObject } from "scent-typescript";
/**
 * 選択ダイアログのコンポーネント。
 *
 * @param props
 * @returns
 */
const SelectionDialog = forwardRef(({ showing, dispatch, message, selectableItems, displayTextMaker, isMultipleSelectionAllowed = false, defaultSelections = [], selectFunction, cancelFunction, width, overlayBackground, style, ...props }, ref) => {
    const preStyle = {};
    preStyle.width = "100%";
    preStyle.paddingBottom = "2em";
    preStyle.whiteSpace = "pre-wrap";
    const formStyle = {};
    formStyle.maxHeight = "calc(100vh - 20em)";
    formStyle.marginBottom = "2em";
    formStyle.display = "flex";
    formStyle.flexDirection = "row";
    formStyle.justifyContent = "left";
    formStyle.flexWrap = "wrap";
    formStyle.gap = "1em";
    formStyle.overflow = "scroll";
    const labelStyle = {};
    labelStyle.display = "flex";
    labelStyle.flexDirection = "row";
    labelStyle.gap = "0.1em";
    const buttonsStyle = {};
    buttonsStyle.display = "flex";
    buttonsStyle.flexDirection = "row";
    buttonsStyle.justifyContent = "right";
    buttonsStyle.gap = "0.5em";
    const formRef = useRef(null);
    const [alreadyPressed, setAlreadyPressed] = useState(false);
    const okEvent = async (e) => {
        if (alreadyPressed) {
            return;
        }
        setAlreadyPressed(true);
        const target = e.target;
        const button = target;
        button.disabled = true;
        if (selectFunction) {
            try {
                const selectedItems = [];
                const formData = new FormData(formRef.current ? formRef.current : undefined);
                formData.forEach((value, key) => {
                    if (StringObject.from(value).toBoolean()) {
                        selectedItems.push(key);
                    }
                });
                await selectFunction(selectedItems);
            }
            catch (error) {
                console.log(error);
            }
        }
        dispatch(false);
    };
    const cancelEvent = async (e) => {
        if (alreadyPressed) {
            return;
        }
        setAlreadyPressed(true);
        if (cancelFunction) {
            try {
                await cancelFunction();
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
    const dialogID = new StringObject(props.id);
    if (dialogID.length() === 0) {
        dialogID.append("idless_selection_dialog");
    }
    return (React.createElement(Popup, { showing: showing, dispatch: dispatch, width: width, hideCancelButton: true, overlayBackground: overlayBackground, cancelFunction: cancelFunction, style: style, ref: ref, ...props },
        React.createElement("pre", { style: preStyle, tabIndex: 0, ref: preRef }, message),
        React.createElement("form", { style: formStyle, ref: formRef, onSubmit: (e) => e.preventDefault() }, selectableItems.map((selectableItem) => {
            const displayText = displayTextMaker ? displayTextMaker(selectableItem) : undefined;
            return (React.createElement("label", { key: dialogID.clone().append(selectableItem).toString(), style: labelStyle },
                React.createElement("input", { type: "checkbox", name: selectableItem, value: "true", defaultChecked: defaultSelections.includes(selectableItem) }),
                displayText ? displayText : selectableItem));
        })),
        React.createElement("div", { style: buttonsStyle },
            React.createElement("button", { onClick: okEvent }, "OK"),
            React.createElement("button", { onClick: cancelEvent }, "\u30AD\u30E3\u30F3\u30BB\u30EB"))));
});
export default SelectionDialog;
