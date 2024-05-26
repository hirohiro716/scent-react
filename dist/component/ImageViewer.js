import React, { forwardRef, useEffect, useRef } from "react";
import WaitingCircle from "../component/WaitingCircle.js";
/**
 * 画像ビューアーのコンポーネント。
 *
 * @param props
 * @returns
 */
const ImageViewer = forwardRef(({ src, dispatch, style, overlayBackground, ...props }, ref) => {
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
        dispatch(undefined);
    };
    let divStyle = {};
    divStyle.minWidth = "10em";
    divStyle.minHeight = "6em";
    divStyle.display = "flex";
    divStyle.flexDirection = "column";
    divStyle.justifyContent = "center";
    divStyle.alignItems = "center";
    divStyle = { ...divStyle, ...style };
    const waitingCircleStyle = {};
    waitingCircleStyle.position = "absolute";
    waitingCircleStyle.width = "3em";
    const waitingCircleRef = useRef(null);
    const imageRef = useRef(null);
    const imageOnLoad = () => {
        setTimeout(() => {
            if (imageRef.current === null || waitingCircleRef.current === null) {
                return;
            }
            imageRef.current.style.display = "";
            waitingCircleRef.current.style.display = "none";
        }, 500);
    };
    useEffect(() => {
        if (imageRef.current === null || waitingCircleRef.current === null) {
            return;
        }
        if (typeof src !== "undefined") {
            imageRef.current.src = src;
        }
        else {
            imageRef.current.style.display = "none";
            imageRef.current.src = "";
            waitingCircleRef.current.style.display = "";
        }
    }, [src]);
    return (React.createElement(React.Fragment, null, typeof src !== "undefined" && (React.createElement("div", { style: backgroundStyle, onClick: cancelEvent },
        React.createElement("div", { style: popupStyle, onClick: (e) => { e.stopPropagation(); }, ref: ref, ...props },
            React.createElement("a", { style: closeButtonStyle, onClick: cancelEvent }, "\u00D7"),
            React.createElement("div", { style: divStyle },
                React.createElement("img", { onLoad: imageOnLoad, style: { maxWidth: "calc(100vw - 5em)", maxHeight: "calc(100vh - 5em)", display: "none", border: "1px solid #ccc" }, ref: imageRef }),
                React.createElement(WaitingCircle, { style: waitingCircleStyle, ref: waitingCircleRef })))))));
});
export default ImageViewer;
