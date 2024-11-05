import React, { CSSProperties, Dispatch, HTMLAttributes, MouseEvent, ReactElement, SetStateAction, forwardRef, useEffect, useRef } from "react"
import WaitingCircle from "../component/WaitingCircle.js";

type ImageViewerProps = HTMLAttributes<HTMLDivElement> & {
    src: string | undefined,
    dispatch: Dispatch<SetStateAction<string | undefined>>,
    isCloseOnBackgroundClick?: boolean,
    closeButtonStyle?: CSSProperties,
    overlayBackgroundStyle?: CSSProperties,
}

/**
 * 画像ビューアーのコンポーネント。
 * 
 * @param props 
 * @returns 
 */
const ImageViewer = forwardRef<HTMLDivElement, ImageViewerProps>(({src, dispatch, isCloseOnBackgroundClick = true, closeButtonStyle, overlayBackgroundStyle, style, ...props}, ref): ReactElement => {
    const overlayBackgroundInternalStyle: CSSProperties = {};
    overlayBackgroundInternalStyle.position = "fixed";
    overlayBackgroundInternalStyle.top = "0";
    overlayBackgroundInternalStyle.right = "0";
    overlayBackgroundInternalStyle.bottom = "0";
    overlayBackgroundInternalStyle.left = "0";
    overlayBackgroundInternalStyle.zIndex = "99999";
    overlayBackgroundInternalStyle.width = "100%";
    overlayBackgroundInternalStyle.height = "100%";
    overlayBackgroundInternalStyle.backgroundColor = "rgba(50, 50, 50, 0.98)";
    overlayBackgroundInternalStyle.display = "flex";
    overlayBackgroundInternalStyle.justifyContent = "center";
    overlayBackgroundInternalStyle.alignItems = "center";
    const popupInternalStyle: CSSProperties = {};
    popupInternalStyle.position = "relative";
    popupInternalStyle.margin = "0 0.5em";
    popupInternalStyle.borderRadius = "0.5em";
    popupInternalStyle.backgroundColor = "rgba(255, 255, 255, 0.98)";
    popupInternalStyle.padding = "2em 1em 1em";
    popupInternalStyle.boxShadow = "0 0.5em 1em 0 rgba(0, 0, 0, 0.5)";
    popupInternalStyle.pointerEvents = "auto";
    const closeButtonInternalStyle: CSSProperties = {};
    closeButtonInternalStyle.position = "absolute";
    closeButtonInternalStyle.top = "0.3em";
    closeButtonInternalStyle.right = "0.5em";
    closeButtonInternalStyle.textDecoration = "none";
    closeButtonInternalStyle.cursor = "pointer";
    const cancelEvent =  async () => {
        if (isCloseOnBackgroundClick) {
            dispatch(undefined);
        }
    }
    const divInternalStyle: CSSProperties = {};
    divInternalStyle.minWidth = "10em";
    divInternalStyle.minHeight = "6em"
    divInternalStyle.display = "flex";
    divInternalStyle.flexDirection = "column";
    divInternalStyle.justifyContent = "center";
    divInternalStyle.alignItems = "center";
    const waitingCircleStyle: CSSProperties = {};
    waitingCircleStyle.position = "absolute";
    waitingCircleStyle.width = "3em";
    const waitingCircleRef = useRef<HTMLImageElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const imageOnLoad = () => {
        setTimeout(() => {
            if (imageRef.current === null || waitingCircleRef.current === null) {
                return;
            }
            imageRef.current.style.display = "";
            waitingCircleRef.current.style.display = "none";
        }, 500);
    }
    useEffect(() => {
        if (imageRef.current === null || waitingCircleRef.current === null) {
            return;
        }
        if (typeof src !== "undefined") {
            imageRef.current.src = src;
        } else {
            imageRef.current.style.display = "none";
            imageRef.current.src = "";
            waitingCircleRef.current.style.display = "";
        }
    }, [src]);
    return (
        <>
            {typeof src !== "undefined" && (
                <div style={{...overlayBackgroundInternalStyle, ...overlayBackgroundStyle}} onClick={cancelEvent}>
                    <div style={{...popupInternalStyle, ...style}} onClick={(e: MouseEvent) => {e.stopPropagation()}} ref={ref} {...props}>
                        <a style={{...closeButtonInternalStyle, ...closeButtonStyle}} onClick={cancelEvent}>×</a>
                        <div style={divInternalStyle}>
                            <img onLoad={imageOnLoad} style={{maxWidth:"calc(100vw - 5em)", maxHeight:"calc(100vh - 5em)", display:"none", border:"1px solid #ccc"}} ref={imageRef} />
                            <WaitingCircle style={waitingCircleStyle} ref={waitingCircleRef} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
});
export default ImageViewer;
