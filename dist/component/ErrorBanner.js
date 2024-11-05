import { forwardRef } from "react";
import React from "react";
/**
 * エラーメッセージを表示するバナーのコンポーネント。
 *
 * @param props
 * @returns
 */
const ErrorBanner = forwardRef(({ message, dispatch, top, width, style, ...props }, ref) => {
    const backgroundStyle = {};
    backgroundStyle.position = "fixed";
    backgroundStyle.top = top;
    backgroundStyle.right = "0";
    backgroundStyle.bottom = "0";
    backgroundStyle.left = "0";
    backgroundStyle.zIndex = "9999";
    backgroundStyle.width = "100%";
    backgroundStyle.height = "100%";
    backgroundStyle.display = "flex";
    backgroundStyle.justifyContent = "center";
    backgroundStyle.alignItems = "start";
    backgroundStyle.pointerEvents = "none";
    const bannerStyle = {};
    bannerStyle.position = "relative";
    bannerStyle.maxWidth = width;
    bannerStyle.margin = "0 0.5em";
    bannerStyle.borderRadius = "0.5em";
    bannerStyle.backgroundColor = "rgba(180, 0, 0, 0.98)";
    bannerStyle.padding = "1em";
    bannerStyle.color = "#fff";
    bannerStyle.boxShadow = "0 0.5em 1em 0 rgba(0, 0, 0, 0.5)";
    bannerStyle.cursor = "pointer";
    bannerStyle.pointerEvents = "auto";
    const preStyle = {};
    preStyle.width = "100%";
    preStyle.height = "100%";
    preStyle.color = "inherit";
    preStyle.whiteSpace = "pre-wrap";
    const closeEventHandler = () => {
        dispatch("");
    };
    return (React.createElement(React.Fragment, null, message && (React.createElement("div", { style: backgroundStyle },
        React.createElement("div", { style: { ...bannerStyle, ...style }, onClick: closeEventHandler, ref: ref, ...props },
            React.createElement("pre", { style: preStyle }, message))))));
});
export default ErrorBanner;
