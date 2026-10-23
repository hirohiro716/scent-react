import { CSSProperties, forwardRef, HTMLAttributes, ReactElement, useEffect, useImperativeHandle, useRef } from "react";
import React from "react";

type HintProps = HTMLAttributes<HTMLParagraphElement> & {
    targetSelector: string,
    animationForShowing?: Keyframe[] | PropertyIndexedKeyframes,
    animationForHiding?: Keyframe[] | PropertyIndexedKeyframes,
}

/**
 * ヒントを表示するコンポーネント。
 * 
 * @param targetSelector ヒント表示対象のセレクター。
 * @param animationForShowing 表示する際のアニメーション。
 * @param animationForHiding 非表示にする際のアニメーション。
 * @param props 
 * @returns 
 */
const Hint = forwardRef<HTMLParagraphElement, HintProps>(({targetSelector, animationForShowing, animationForHiding, style, ...props}: HintProps, ref): ReactElement => {
    const paragraphRef = useRef<HTMLParagraphElement>(null);
    useImperativeHandle(ref, () => {
        return paragraphRef.current!;
    });
    const paragraphInternalStyle: CSSProperties = {};
    paragraphInternalStyle.display = "none";
    useEffect(() => {
        const targetElement = window.document.querySelector(targetSelector);
        const activeElement = window.document.activeElement;
        if (targetElement !== null && activeElement !== null && targetElement === activeElement) {
            const paragraphElement = paragraphRef.current;
            if (paragraphElement) {
                paragraphElement.style.display = "";
            }
        }
        window.document.addEventListener("focusin", (event) => {
            const targetElement = window.document.querySelector(targetSelector);
            const paragraphElement = paragraphRef.current;
            const activeElement = event.target;
            if (paragraphElement === null || targetElement === null || activeElement === null || activeElement !== targetElement) {
                return;
            }
            let keyframesForShowing = animationForShowing;
            if (typeof keyframesForShowing === "undefined") {
                keyframesForShowing = [
                    {opacity: 0, transform: "scaleY(0) translateY(-100%)"},
                    {opacity: 1, transform: "scaleY(1) translateY(0)"}
                ];
            }
            paragraphElement.style.display = "";
            paragraphElement.animate(keyframesForShowing, {duration: 200});
        });
        window.document.addEventListener("focusout", (event) => {
            const targetElement = window.document.querySelector(targetSelector);
            const paragraphElement = paragraphRef.current;
            const inactiveElement = event.target;
            if (paragraphElement === null || targetElement === null || inactiveElement === null || inactiveElement !== targetElement) {
                return;
            }
            let keyframesForHiding = animationForHiding;
            if (typeof keyframesForHiding === "undefined") {
                keyframesForHiding = [
                    {opacity: 1, transform: "scaleY(1) translateY(0)"},
                    {opacity: 0, transform: "scaleY(0) translateY(-100%)"}
                ];
            }
            paragraphElement.animate(keyframesForHiding, {duration: 200}).finished.then(() => {
                paragraphElement.style.display = "none";
            });
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetSelector]);
    return (
        <p style={{...paragraphInternalStyle, ...style}} ref={paragraphRef} {...props}>
            {props.children}
        </p>
    );
});
Hint.displayName = "Hint";
export default Hint;
