import React, { CSSProperties, Dispatch, HTMLAttributes, ReactElement, SetStateAction, forwardRef } from "react";
import Popup from "./Popup.js";
import WaitingCircle from "./WaitingCircle.js";

type WaitingOverlayProps = HTMLAttributes<HTMLDivElement> & {
    showing: boolean,
    dispatch: Dispatch<SetStateAction<boolean>>,
    width?: string,
    overlayBackgroundStyle?: CSSProperties,
}

/**
 * 待機中のオーバーレイコンポーネント。
 * 
 * @param props 
 * @returns 
 */
const WaitingOverlay = forwardRef<HTMLDivElement, WaitingOverlayProps>(({showing, dispatch, width, overlayBackgroundStyle, style, ...props}, ref): ReactElement => {
    let popupStyle: CSSProperties = {};
    popupStyle.backgroundColor = "none";
    popupStyle.boxShadow = "none";
    return (
        <Popup showing={showing} dispatch={dispatch} width="200px" style={popupStyle} isCloseOnBackgroundClick={false} closeButtonStyle={{display:"none"}} overlayBackgroundStyle={{background:"rgba(255,255,255,0.98)", ...overlayBackgroundStyle}} {...props} ref={ref} >
            <WaitingCircle style={{width: width ? width : "4em"}} />
        </Popup>
    );
});
export default WaitingOverlay;
