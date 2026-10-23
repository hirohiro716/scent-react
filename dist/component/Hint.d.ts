import { HTMLAttributes } from "react";
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
declare const Hint: React.ForwardRefExoticComponent<HTMLAttributes<HTMLParagraphElement> & {
    targetSelector: string;
    animationForShowing?: Keyframe[] | PropertyIndexedKeyframes;
    animationForHiding?: Keyframe[] | PropertyIndexedKeyframes;
} & React.RefAttributes<HTMLParagraphElement>>;
export default Hint;
