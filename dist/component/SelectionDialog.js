import React, { forwardRef, useEffect, useRef, useState } from "react";
import Popup from "./Popup.js";
import { StringObject } from "scent-typescript";
/**
 * 選択ダイアログのコンポーネント。
 *
 * @param showing 表示する場合はtrueを指定する。
 * @param dispatch 表示と非表示を切り替えるためのDispatch。
 * @param message メッセージ。
 * @param selectableItems 選択可能なアイテムの配列。
 * @param displayTextMaker アイテムの表示値を作成するコールバック。
 * @param isMultipleSelectionAllowed アイテムの複数選択を許可する場合はtrueを指定する。
 * @param defaultSelections デフォルトで選択するアイテムの配列。
 * @param selectFunction OKボタン押下時の処理。
 * @param cancelFunction キャンセルボタン押下時の処理。
 * @param width ダイアログの幅。
 * @param overlayBackgroundStyle 背景要素へ渡すスタイル。
 * @param props
 * @returns
 */
const SelectionDialog = forwardRef(({ showing, dispatch, message, selectableItems, displayTextMaker, isMultipleSelectionAllowed = true, defaultSelections = [], selectFunction, cancelFunction, width, overlayBackgroundStyle, ...props }, ref) => {
    const preStyle = {};
    preStyle.width = "100%";
    preStyle.paddingBottom = "1em";
    preStyle.whiteSpace = "pre-wrap";
    const formStyle = {};
    formStyle.maxHeight = "calc(100vh - 20em)";
    formStyle.marginBottom = "1em";
    formStyle.padding = "1em 0.5em";
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
    const [selectedItems, setSelectedItems] = useState([]);
    const checkChangeEventHandler = (e) => {
        if (isMultipleSelectionAllowed === false) {
            if (e.currentTarget.checked) {
                setSelectedItems([e.currentTarget.name]);
            }
            else {
                setSelectedItems([]);
            }
        }
        else {
            const items = [...selectedItems];
            if (e.currentTarget.checked) {
                items.push(e.currentTarget.name);
                setSelectedItems(items);
            }
            else {
                setSelectedItems(items.filter((item) => item !== e.currentTarget.name));
            }
        }
    };
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
        if (showing) {
            setSelectedItems([...defaultSelections]);
        }
    }, [showing]);
    const dialogID = new StringObject(props.id);
    if (dialogID.length() === 0) {
        dialogID.append("idless-selection-dialog");
    }
    return (React.createElement(Popup, { showing: showing, dispatch: dispatch, width: width, isCloseOnBackgroundClick: false, closeButtonStyle: { display: "none" }, overlayBackgroundStyle: overlayBackgroundStyle, cancelFunction: cancelFunction, ref: ref, ...props },
        React.createElement("pre", { style: preStyle, tabIndex: 0, ref: preRef }, message),
        React.createElement("form", { style: formStyle, ref: formRef, onSubmit: (e) => e.preventDefault() }, Array.from(new Set(selectableItems)).map((selectableItem) => {
            const displayText = displayTextMaker ? displayTextMaker(selectableItem) : undefined;
            return (React.createElement("label", { key: dialogID.clone().append(selectableItem).toString(), style: labelStyle },
                React.createElement("input", { type: "checkbox", name: selectableItem, value: "true", checked: selectedItems.includes(selectableItem), onChange: checkChangeEventHandler }),
                displayText ? displayText : selectableItem));
        })),
        React.createElement("div", { style: buttonsStyle },
            React.createElement("button", { onClick: okEvent }, "OK"),
            React.createElement("button", { onClick: cancelEvent }, "\u30AD\u30E3\u30F3\u30BB\u30EB"))));
});
export default SelectionDialog;
