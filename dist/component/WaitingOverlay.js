import React, { forwardRef } from "react";
import Popup from "./Popup.js";
import WaitingCircle from "./WaitingCircle.js";
/**
 * 待機中のオーバーレイコンポーネント。
 *
 * @param props
 * @returns
 */
const WaitingOverlay = forwardRef(({ showing, dispatch, width, overlayBackgroundStyle, style, ...props }, ref) => {
    let popupStyle = {};
    popupStyle.backgroundColor = "none";
    popupStyle.boxShadow = "none";
    return (React.createElement(Popup, { showing: showing, dispatch: dispatch, width: "200px", style: popupStyle, isCloseOnBackgroundClick: false, closeButtonStyle: { display: "none" }, overlayBackgroundStyle: { background: "rgba(255,255,255,0.98)", ...overlayBackgroundStyle }, ...props, ref: ref },
        React.createElement(WaitingCircle, { style: { width: width ? width : "4em" } })));
});
export default WaitingOverlay;
