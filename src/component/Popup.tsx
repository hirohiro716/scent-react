import { CSSProperties, Dispatch, HTMLAttributes, MouseEvent, ReactElement, SetStateAction, forwardRef } from "react";
import React from "react";

type PopupProps = HTMLAttributes<HTMLDivElement> & {
    showing: boolean | undefined,
    dispatch: Dispatch<SetStateAction<boolean>>,
    width: string,
    isCloseOnBackgroundClick?: boolean,
    closeButtonStyle?: CSSProperties,
    overlayBackgroundStyle?: CSSProperties,
    cancelFunction?: () => Promise<void>,
}

/**
 * ポップアップを表示するバナーのコンポーネント。
 * 
 * @param props 
 * @returns 
 */
const Popup = forwardRef<HTMLDivElement, PopupProps>(({showing, dispatch, width, isCloseOnBackgroundClick = true, closeButtonStyle, overlayBackgroundStyle, cancelFunction, style, ...props}, ref): ReactElement => {
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
    const popupStyle: CSSProperties = {};
    popupStyle.position = "relative";
    popupStyle.maxWidth = width;
    popupStyle.margin = "0 0.5em";
    popupStyle.borderRadius = "0.5em";
    popupStyle.backgroundColor = "rgba(255, 255, 255, 0.98)";
    popupStyle.padding = "2em 1em 1em";
    popupStyle.boxShadow = "0 0.5em 1em 0 rgba(0, 0, 0, 0.5)";
    popupStyle.pointerEvents = "auto";
    const closeButtonInternalStyle: CSSProperties = {};
    closeButtonInternalStyle.position = "absolute";
    closeButtonInternalStyle.top = "0.3em";
    closeButtonInternalStyle.right = "0.5em";
    closeButtonInternalStyle.textDecoration = "none";
    closeButtonInternalStyle.cursor = "pointer";
    const cancelEvent =  async () => {
        if (isCloseOnBackgroundClick === false) {
            return;
        }
        dispatch(false);
        if (cancelFunction) {
            try {
                await cancelFunction();
            } catch (error: any) {
                console.log(error);
            }
        }
    }
    return (
        <>
            {showing && (
                <div style={{...overlayBackgroundInternalStyle, ...overlayBackgroundStyle}} onClick={cancelEvent}>
                    <div style={{...popupStyle, ...style}} onClick={(e: MouseEvent) => {e.stopPropagation()}} ref={ref} {...props}>
                        <a style={{...closeButtonInternalStyle, ...closeButtonStyle}} onClick={cancelEvent}>×</a>
                        {props.children}
                    </div>
                </div>
            )}
        </>
    );
});
export default Popup;
