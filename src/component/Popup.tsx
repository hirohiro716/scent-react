import { CSSProperties, Dispatch, HTMLAttributes, MouseEvent, ReactElement, SetStateAction, forwardRef } from "react";
import React from "react";

type PopupProps = HTMLAttributes<HTMLDivElement> & {
    showing: boolean | undefined,
    dispatch: Dispatch<SetStateAction<boolean>>,
    width: string,
    hideCancelButton?: boolean,
    overlayBackground?: string,
    cancelFunction?: () => Promise<void>,
}

/**
 * ポップアップを表示するバナーのコンポーネント。
 * 
 * @param props 
 * @returns 
 */
const Popup = forwardRef<HTMLDivElement, PopupProps>(({ showing, dispatch, width, hideCancelButton, overlayBackground, cancelFunction, style, ...props }, ref): ReactElement => {
    const backgroundStyle: CSSProperties = {};
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
    } else {
        backgroundStyle.backgroundColor = "rgba(50, 50, 50, 0.98)";
    }
    backgroundStyle.display = "flex";
    backgroundStyle.justifyContent = "center";
    backgroundStyle.alignItems = "center";
    let popupStyle: CSSProperties = {};
    popupStyle.position = "relative";
    popupStyle.maxWidth = width;
    popupStyle.margin = "0 0.5em";
    popupStyle.borderRadius = "0.5em";
    popupStyle.backgroundColor = "rgba(255, 255, 255, 0.98)";
    popupStyle.padding = "2em 1em 1em";
    popupStyle.boxShadow = "0 0.5em 1em 0 rgba(0, 0, 0, 0.5)";
    popupStyle.pointerEvents = "auto";
    popupStyle = {...popupStyle, ...style};
    const closeButtonStyle: CSSProperties = {};
    closeButtonStyle.position = "absolute";
    closeButtonStyle.top = "0.3em";
    closeButtonStyle.right = "0.5em";
    closeButtonStyle.textDecoration = "none";
    closeButtonStyle.cursor = "pointer";
    const cancelEvent =  async () => {
        if (hideCancelButton) {
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
                <div style={backgroundStyle} onClick={cancelEvent}>
                    <div style={popupStyle} onClick={(e: MouseEvent) => { e.stopPropagation() }} ref={ref} {...props}>
                        {(typeof hideCancelButton === "undefined" || hideCancelButton === false) && <a style={closeButtonStyle} onClick={cancelEvent}>×</a>}
                        {props.children}
                    </div>
                </div>
            )}
        </>
    );
});
export default Popup;
