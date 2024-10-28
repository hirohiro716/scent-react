import { forwardRef, useEffect } from "react";
import React from "react";
import { StringObject } from "scent-typescript";
import ErrorBanner from "./ErrorBanner.js";
/**
 * 通知メッセージを表示するバナーのコンポーネント。
 *
 * @param props
 * @returns
 */
const NoticeBanner = forwardRef(({ message, dispatch, top, width, timeoutMilliseconds, style, ...props }, ref) => {
    let bannerStyle = {};
    bannerStyle.backgroundColor = "#000";
    bannerStyle.color = "#fff";
    bannerStyle = { ...bannerStyle, ...style };
    useEffect(() => {
        if (StringObject.from(message).length() === 0) {
            return;
        }
        setTimeout(() => {
            dispatch(undefined);
        }, timeoutMilliseconds);
    }, [message, dispatch, timeoutMilliseconds]);
    return (React.createElement(ErrorBanner, { message: message, dispatch: dispatch, top: top, width: width, style: bannerStyle, ref: ref, ...props }));
});
export default NoticeBanner;
