import React, { forwardRef } from "react";
import Popup from "./Popup.js";
import WaitingCircle from "./WaitingCircle.js";
/**
 * 待機中のオーバーレイコンポーネント。
 *
 * @param props
 * @returns
 */
const WaitingOverlay = forwardRef(({ showing, dispatch, width, style, ...props }, ref) => {
    let popupStyle = {};
    popupStyle.backgroundColor = "none";
    popupStyle.boxShadow = "none";
    return (React.createElement(Popup, { showing: showing, dispatch: dispatch, width: "200px", style: popupStyle, hideCancelButton: true, overlayBackground: "rgba(255,255,255,0.98)", ...props, ref: ref },
        React.createElement(WaitingCircle, { style: { width: width ? width : "4em" } })));
});
export default WaitingOverlay;
