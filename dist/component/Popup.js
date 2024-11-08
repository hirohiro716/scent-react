import { forwardRef } from "react";
import React from "react";
/**
 * ポップアップを表示するバナーのコンポーネント。
 *
 * @param showing 表示する場合はtrueを指定する。
 * @param dispatch 表示と非表示を切り替えるためのDispatch。
 * @param width ダイアログの幅。
 * @param isCloseOnBackgroundClick 背景クリックで画像を閉じる場合はtrue。
 * @param closeButtonStyle 閉じるボタン要素へ渡すスタイル。
 * @param overlayBackgroundStyle 背景要素へ渡すスタイル。
 * @param cancelFunction キャンセル時の処理。
 * @param props
 * @returns
 */
const Popup = forwardRef(({ showing, dispatch, width, isCloseOnBackgroundClick = true, closeButtonStyle, overlayBackgroundStyle, cancelFunction, style, ...props }, ref) => {
    const overlayBackgroundInternalStyle = {};
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
    const popupStyle = {};
    popupStyle.position = "relative";
    popupStyle.maxWidth = width;
    popupStyle.margin = "0 0.5em";
    popupStyle.borderRadius = "0.5em";
    popupStyle.backgroundColor = "rgba(255, 255, 255, 0.98)";
    popupStyle.padding = "2em 1em 1em";
    popupStyle.boxShadow = "0 0.5em 1em 0 rgba(0, 0, 0, 0.5)";
    popupStyle.pointerEvents = "auto";
    const closeButtonInternalStyle = {};
    closeButtonInternalStyle.position = "absolute";
    closeButtonInternalStyle.top = "0.3em";
    closeButtonInternalStyle.right = "0.5em";
    closeButtonInternalStyle.textDecoration = "none";
    closeButtonInternalStyle.cursor = "pointer";
    const cancelEvent = async () => {
        if (isCloseOnBackgroundClick === false) {
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
    return (React.createElement(React.Fragment, null, showing && (React.createElement("div", { style: { ...overlayBackgroundInternalStyle, ...overlayBackgroundStyle }, onClick: cancelEvent },
        React.createElement("div", { style: { ...popupStyle, ...style }, onClick: (e) => { e.stopPropagation(); }, ref: ref, ...props },
            React.createElement("a", { style: { ...closeButtonInternalStyle, ...closeButtonStyle }, onClick: cancelEvent }, "\u00D7"),
            props.children)))));
});
export default Popup;
