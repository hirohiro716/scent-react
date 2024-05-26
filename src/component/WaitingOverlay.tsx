import React, { CSSProperties, Dispatch, HTMLAttributes, ReactElement, SetStateAction, forwardRef } from "react";
import Popup from "./Popup.js";
import WaitingCircle from "./WaitingCircle.js";

type WaitingOverlayProps = HTMLAttributes<HTMLDivElement> & {
    showing: boolean,
    dispatch: Dispatch<SetStateAction<boolean>>,
    width?: string,
    overlayBackground?: string,
}

/**
 * 待機中のオーバーレイコンポーネント。
 * 
 * @param props 
 * @returns 
 */
const WaitingOverlay = forwardRef<HTMLDivElement, WaitingOverlayProps>(({showing, dispatch, width, style, ...props}, ref): ReactElement => {
    let popupStyle: CSSProperties = {};
    popupStyle.backgroundColor = "none";
    popupStyle.boxShadow = "none";
    return (
        <Popup showing={showing} dispatch={dispatch} width="200px" style={popupStyle} hideCancelButton={true} overlayBackground="rgba(255,255,255,0.98)" {...props} ref={ref} >
            <WaitingCircle style={{width: width ? width : "4em"}} />
        </Popup>
    );
});
export default WaitingOverlay;
