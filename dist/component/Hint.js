import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import React from "react";
/**
 * ヒントを表示するコンポーネント。
 *
 * @param targetSelector ヒント表示対象のセレクター。
 * @param animationForShowing 表示する際のアニメーション。
 * @param animationForHiding 非表示にする際のアニメーション。
 * @param props
 * @returns
 */
const Hint = forwardRef(({ targetSelector, animationForShowing, animationForHiding, style, ...props }, ref) => {
    const paragraphRef = useRef(null);
    useImperativeHandle(ref, () => {
        return paragraphRef.current;
    });
    const paragraphInternalStyle = {};
    paragraphInternalStyle.display = "none";
    const paragraphHeight = useRef(null);
    const paragraphAnimation = useRef(null);
    const paragraphAnimate = (keyframes, callback) => {
        const paragraphElement = paragraphRef.current;
        if (paragraphElement === null) {
            return;
        }
        if (paragraphAnimation.current) {
            paragraphAnimation.current.cancel();
        }
        paragraphAnimation.current = paragraphElement.animate(keyframes, { duration: 200 });
        paragraphAnimation.current.finished.then(() => {
            callback();
            paragraphAnimation.current = null;
        });
    };
    const previousActiveElement = useRef(null);
    useEffect(() => {
        const paragraphElement = paragraphRef.current;
        if (paragraphElement === null) {
            return;
        }
        paragraphElement.style.display = "block";
        paragraphElement.style.height = "auto";
        paragraphHeight.current = paragraphElement.scrollHeight;
        paragraphElement.style.display = "none";
        paragraphElement.style.height = "0";
        paragraphElement.style.overflow = "hidden";
        const targetElements = Array.from(window.document.querySelectorAll(targetSelector));
        const activeElement = window.document.activeElement;
        if (targetElements.length > 0 && activeElement !== null && targetElements.includes(activeElement)) {
            paragraphElement.style.display = "";
            paragraphElement.style.height = "";
            previousActiveElement.current = activeElement;
        }
        window.document.addEventListener("focusin", (event) => {
            const paragraphElement = paragraphRef.current;
            if (paragraphElement === null || paragraphHeight.current === null) {
                return;
            }
            const targetElements = Array.from(window.document.querySelectorAll(targetSelector));
            const activeElement = event.target;
            if (previousActiveElement.current !== null && targetElements.includes(previousActiveElement.current) && targetElements.includes(activeElement)) {
                return;
            }
            previousActiveElement.current = activeElement;
            if (targetElements.length === 0 || activeElement === null || targetElements.includes(activeElement) === false) {
                let keyframesForHiding = animationForHiding;
                if (typeof keyframesForHiding === "undefined") {
                    keyframesForHiding = [
                        { opacity: 1, transform: "scaleY(1)", height: paragraphHeight.current + "px" },
                        { opacity: 0, transform: "scaleY(0)", height: "0" }
                    ];
                }
                paragraphAnimate(keyframesForHiding, () => {
                    paragraphElement.style.display = "none";
                });
                return;
            }
            let keyframesForShowing = animationForShowing;
            if (typeof keyframesForShowing === "undefined") {
                keyframesForShowing = [
                    { opacity: 0, transform: "scaleY(0) translateY(-100%)", height: "0" },
                    { opacity: 1, transform: "scaleY(1) translateY(0)", height: paragraphHeight.current + "px" }
                ];
            }
            paragraphElement.style.height = "0";
            paragraphElement.style.display = "";
            paragraphAnimate(keyframesForShowing, () => {
                if (paragraphHeight.current !== null) {
                    paragraphElement.style.height = paragraphHeight.current + "px";
                }
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetSelector]);
    return (React.createElement("p", { style: { ...paragraphInternalStyle, ...style }, ref: paragraphRef, ...props }, props.children));
});
Hint.displayName = "Hint";
export default Hint;
