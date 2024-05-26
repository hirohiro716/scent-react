import { forwardRef } from "react";
import React from "react";
/**
 * ポップアップを表示するバナーのコンポーネント。
 *
 * @param props
 * @returns
 */
const Popup = forwardRef(({ showing, dispatch, width, hideCancelButton, overlayBackground, cancelFunction, style, ...props }, ref) => {
    const backgroundStyle = {};
    backgroundStyle.position = "fixed";
    backgroundStyle.top = "0";
    backgroundStyle.right = "0";
    backgroundStyle.bottom = "0";
    backgroundStyle.left = "0";
    backgroundStyle.zIndex = "99999";
    backgroundStyle.width = "100%";
    backgroundStyle.height = "100%";
    if (overlayBackground) {
        backgroundStyle.background = overlayBackground;
    }
    else {
        backgroundStyle.backgroundColor = "rgba(50, 50, 50, 0.98)";
    }
    backgroundStyle.display = "flex";
    backgroundStyle.justifyContent = "center";
    backgroundStyle.alignItems = "center";
    let popupStyle = {};
    popupStyle.position = "relative";
    popupStyle.maxWidth = width;
    popupStyle.margin = "0 0.5em";
    popupStyle.borderRadius = "0.5em";
    popupStyle.backgroundColor = "rgba(255, 255, 255, 0.98)";
    popupStyle.padding = "2em 1em 1em";
    popupStyle.boxShadow = "0 0.5em 1em 0 rgba(0, 0, 0, 0.5)";
    popupStyle.pointerEvents = "auto";
    popupStyle = { ...popupStyle, ...style };
    const closeButtonStyle = {};
    closeButtonStyle.position = "absolute";
    closeButtonStyle.top = "0.3em";
    closeButtonStyle.right = "0.5em";
    closeButtonStyle.textDecoration = "none";
    closeButtonStyle.cursor = "pointer";
    const cancelEvent = async () => {
        if (hideCancelButton) {
            return;
        }
        dispatch(false);
        if (cancelFunction) {
            try {
                await cancelFunction();
            }
            catch (error) {
                console.log(error);
            }
        }
    };
    return (React.createElement(React.Fragment, null, showing && (React.createElement("div", { style: backgroundStyle, onClick: cancelEvent },
        React.createElement("div", { style: popupStyle, onClick: (e) => { e.stopPropagation(); }, ref: ref, ...props },
            (typeof hideCancelButton === "undefined" || hideCancelButton === false) && React.createElement("a", { style: closeButtonStyle, onClick: cancelEvent }, "\u00D7"),
            props.children)))));
});
export default Popup;
