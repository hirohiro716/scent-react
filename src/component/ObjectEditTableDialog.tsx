import React, { CSSProperties, Dispatch, HTMLAttributes, MouseEvent, ReactElement, ReactEventHandler, SetStateAction, forwardRef, useEffect, useRef, useState } from "react";
import Popup from "./Popup.js";
import { Property } from "scent-typescript";
import ObjectEditTable from "./ObjectEditTable.js";

type ObjectEditTableDialogProps = HTMLAttributes<HTMLDivElement> & {
    showing: boolean | undefined,
    dispatch: Dispatch<SetStateAction<boolean>>,
    message: string | undefined,
    properties: Property[],
    identifierMaker?: (record: Record<string, any>) => string | null,
    objects: Record<string, any>[],
    elementMaker?: (object: Record<string, any>, property: Property, onChangeEventHandler: ReactEventHandler<any>, dispatch: Dispatch<SetStateAction<string>>) => ReactElement | undefined,
    leftFunctionButtons?: Record<string, (object: Record<string, any>) => Promise<void> | void>,
    rightFunctionButtons?: Record<string, (object: Record<string, any>) => Promise<void> | void>,
    closeFunction?: () => Promise<void>,
    width: string,
    overlayBackgroundStyle?: CSSProperties,
}

/**
 * オブジェクト編集テーブルダイアログのコンポーネント。
 * 
 * @param props 
 * @returns 
 */
const ObjectEditTableDialog = forwardRef<HTMLDivElement, ObjectEditTableDialogProps>(({showing, dispatch, message, properties, identifierMaker, objects, elementMaker, leftFunctionButtons, rightFunctionButtons, closeFunction, width, overlayBackgroundStyle, ...props}, ref): ReactElement => {
    const preStyle: CSSProperties = {};
    preStyle.width = "100%";
    preStyle.paddingBottom = "1em";
    preStyle.whiteSpace = "pre-wrap";
    const tableStyle: CSSProperties = {};
    tableStyle.maxHeight = "calc(100vh - 20em)";
    tableStyle.marginBottom = "1em";
    tableStyle.padding = "1em 0.5em";
    tableStyle.overflow = "scroll";
    const labelStyle: CSSProperties = {};
    labelStyle.display = "flex";
    labelStyle.flexDirection = "row";
    labelStyle.gap = "0.1em";
    const buttonsStyle: CSSProperties = {};
    buttonsStyle.display = "flex";
    buttonsStyle.flexDirection = "row";
    buttonsStyle.justifyContent = "right";
    buttonsStyle.gap = "0.5em";
    const [alreadyPressed, setAlreadyPressed] = useState<boolean>(false);
    const closeEvent =  async (e: MouseEvent) => {
        if (alreadyPressed) {
            return;
        }
        setAlreadyPressed(true);
        if (closeFunction) {
            try {
                await closeFunction();
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
    return (
        <Popup showing={showing} dispatch={dispatch} width={width} closeButtonStyle={{display:"none"}} overlayBackgroundStyle={overlayBackgroundStyle} cancelFunction={closeFunction} ref={ref} {...props}>
            <pre style={preStyle} tabIndex={0} ref={preRef}>{message}</pre>
            <div style={tableStyle}>
                <ObjectEditTable properties={properties} identifierMaker={identifierMaker} objects={objects} elementMaker={elementMaker} leftFunctionButtons={leftFunctionButtons} rightFunctionButtons={rightFunctionButtons} />
            </div>
            <div style={buttonsStyle}>
                <button onClick={closeEvent}>閉じる</button>
            </div>
        </Popup>
    );
});
export default ObjectEditTableDialog;
