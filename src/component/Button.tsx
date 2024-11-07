import React, { ButtonHTMLAttributes, ReactElement, forwardRef, useEffect, useRef } from "react";
import WaitingCircle from "./WaitingCircle.js";
import { StringObject } from "scent-typescript";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    wait?: boolean,
}

/**
 * Buttonのコンポーネント。
 * 
 * @param props 
 * @returns 
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({wait, style, children, ...props}, ref): ReactElement => {
    const imageRef = useRef<HTMLImageElement>(null);
    const animation = () => {
        const frame = 1 / 200;
        let progress = 0;
        const update = () => {
            progress += frame;
            const degree = 360 * progress;
            const transform = new StringObject("rotate(");
            transform.append(degree);
            transform.append("deg)");
            if (imageRef.current) {
                imageRef.current.style.transform = transform.toString();
            }
            if (progress >= 1) {
                progress = 0;
            }
            setTimeout(() => {
                window.requestAnimationFrame(update);
            }, 30);
        }
        window.requestAnimationFrame(update);
    }
    useEffect(() => {
        animation();
    }, []);
    const styleForButton = {...style};
    styleForButton.display = "flex";
    styleForButton.justifyContent = "center";
    styleForButton.alignItems = "center";
    return (
        <button disabled={wait} style={styleForButton} ref={ref} {...props}>
            {children}
            {wait && (
                <WaitingCircle style={{ height: '1em', marginLeft: '0.2em' }} />
            )}
        </button>
    );
});
export default Button;
