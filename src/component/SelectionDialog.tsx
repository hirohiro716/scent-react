import React, { CSSProperties, ChangeEventHandler, Dispatch, HTMLAttributes, MouseEvent, ReactElement, SetStateAction, forwardRef, useEffect, useRef, useState } from "react";
import Popup from "./Popup.js";
import { StringObject } from "scent-typescript";

type SelectionDialogProps = HTMLAttributes<HTMLDivElement> & {
    showing: boolean | undefined,
    dispatch: Dispatch<SetStateAction<boolean>>,
    message: string | undefined,
    selectableItems: string[],
    displayTextMaker?: (selectableItem: string) => string | undefined,
    isMultipleSelectionAllowed?: boolean,
    defaultSelections?: string[],
    selectFunction?: (selectedItems: string[]) => Promise<void>,
    cancelFunction?: () => Promise<void>,
    width: string,
    overlayBackground?: string,
}

/**
 * 選択ダイアログのコンポーネント。
 * 
 * @param props 
 * @returns 
 */
const SelectionDialog = forwardRef<HTMLDivElement, SelectionDialogProps>(({showing, dispatch, message, selectableItems, displayTextMaker, isMultipleSelectionAllowed = true, defaultSelections=[], selectFunction, cancelFunction, width, overlayBackground, style, ...props}, ref): ReactElement => {
    const preStyle: CSSProperties = {};
    preStyle.width = "100%";
    preStyle.paddingBottom = "1em";
    preStyle.whiteSpace = "pre-wrap";
    const formStyle: CSSProperties = {};
    formStyle.maxHeight = "calc(100vh - 20em)";
    formStyle.marginBottom = "1em";
    formStyle.padding = "1em 0.5em";
    formStyle.display = "flex";
    formStyle.flexDirection = "row";
    formStyle.justifyContent = "left";
    formStyle.flexWrap = "wrap";
    formStyle.gap = "1em";
    formStyle.overflow = "scroll";
    const labelStyle: CSSProperties = {};
    labelStyle.display = "flex";
    labelStyle.flexDirection = "row";
    labelStyle.gap = "0.1em";
    const buttonsStyle: CSSProperties = {};
    buttonsStyle.display = "flex";
    buttonsStyle.flexDirection = "row";
    buttonsStyle.justifyContent = "right";
    buttonsStyle.gap = "0.5em";
    const formRef = useRef<HTMLFormElement>(null);
    const checkChangeEventHandler: ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isMultipleSelectionAllowed) {
            return;
        }
        const selectedItems: string[] = [];
        const formData = new FormData(formRef.current ? formRef.current : undefined);
        formData.forEach((value, key) => {
            if (StringObject.from(value).toBoolean()) {
                selectedItems.push(key);
            }
        });
        if (selectedItems.length > 1) {
            e.currentTarget.checked = false;
        }
    }
    const [alreadyPressed, setAlreadyPressed] = useState<boolean>(false);
    const okEvent = async (e: MouseEvent) => {
        if (alreadyPressed) {
            return;
        }
        setAlreadyPressed(true);
        const target: any = e.target;
        const button: HTMLButtonElement = target;
        button.disabled = true;
        if (selectFunction) {
            try {
                const selectedItems: string[] = [];
                const formData = new FormData(formRef.current ? formRef.current : undefined);
                formData.forEach((value, key) => {
                    if (StringObject.from(value).toBoolean()) {
                        selectedItems.push(key);
                    }
                });
                await selectFunction(selectedItems);
            } catch (error: any) {
                console.log(error);
            }
        }
        dispatch(false);
    }
    const cancelEvent =  async (e: MouseEvent) => {
        if (alreadyPressed) {
            return;
        }
        setAlreadyPressed(true);
        if (cancelFunction) {
            try {
                await cancelFunction();
            } catch (error: any) {
                console.log(error);
            }
        }
        dispatch(false);
    }
    const preRef = useRef<HTMLPreElement>(null);
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
    return (
        <Popup showing={showing} dispatch={dispatch} width={width} hideCancelButton={true} overlayBackground={overlayBackground} cancelFunction={cancelFunction} style={style} ref={ref} {...props}>
            <pre style={preStyle} tabIndex={0} ref={preRef}>{message}</pre>
            <form style={formStyle} ref={formRef} onSubmit={(e) => e.preventDefault()}>
                {selectableItems.map((selectableItem) => {
                    const displayText = displayTextMaker ? displayTextMaker(selectableItem) : undefined;
                    return (
                        <label key={dialogID.clone().append(selectableItem).toString()} style={labelStyle}>
                            <input type="checkbox" name={selectableItem} value={"true"} defaultChecked={defaultSelections.includes(selectableItem)} onChange={checkChangeEventHandler} />
                            {displayText ? displayText : selectableItem}
                        </label>
                    );
                })}
            </form>
            <div style={buttonsStyle}>
                <button onClick={okEvent}>OK</button>
                <button onClick={cancelEvent}>キャンセル</button>
            </div>
        </Popup>
    );
});
export default SelectionDialog;
