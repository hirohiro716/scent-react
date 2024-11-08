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
 * @param showing 表示する場合はtrueを指定する。
 * @param dispatch 表示と非表示を切り替えるためのDispatch。
 * @param width 画像の幅。デフォルトは"4em"。
 * @param overlayBackgroundStyle 背景要素へ渡すスタイル。
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
