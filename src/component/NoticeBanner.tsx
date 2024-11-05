import { CSSProperties, Dispatch, forwardRef, HTMLAttributes, ReactElement, SetStateAction, useEffect } from "react";
import React from "react";
import { StringObject } from "scent-typescript";
import ErrorBanner from "./ErrorBanner.js";

type NoticeBannerProps = HTMLAttributes<HTMLDivElement> & {
    message: string | undefined,
    dispatch: Dispatch<SetStateAction<string | undefined>>,
    top: string,
    width: string,
    timeoutMilliseconds: number,
}

/**
 * 通知メッセージを表示するバナーのコンポーネント。
 * 
 * @param props 
 * @returns 
 */
const NoticeBanner = forwardRef<HTMLDivElement, NoticeBannerProps>(({message, dispatch, top, width, timeoutMilliseconds, style, ...props}, ref): ReactElement => {
    const bannerStyle: CSSProperties = {};
    bannerStyle.backgroundColor = "rgba(0, 0, 0, 0.9)";
    bannerStyle.color = "#fff";
    useEffect(() => {
        if (StringObject.from(message).length() === 0) {
            return;
        }
        setTimeout(() => {
            dispatch(undefined);
        }, timeoutMilliseconds);
    }, [message, dispatch, timeoutMilliseconds]);
    return (
        <ErrorBanner message={message} dispatch={dispatch} top={top} width={width} style={{...bannerStyle, ...style}} ref={ref} {...props} />
    );
});
export default NoticeBanner;
