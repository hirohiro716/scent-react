import React, { CSSProperties, Dispatch, HTMLAttributes, MouseEvent, ReactElement, SetStateAction, forwardRef, useEffect, useRef, useState } from "react"
import StillCamera from "../class/StillCamera.js";
import Popup from "../component/Popup.js"
import WaitingCircle from "../component/WaitingCircle.js";

type StillCameraPopupProps = HTMLAttributes<HTMLDivElement> & {
    showing: boolean,
    dispatch: Dispatch<SetStateAction<boolean>>,
    mimeType?: string,
    maximumLongSide?: number,
    callbackAfterCapturing: (canvas: HTMLCanvasElement) => Promise<void>,
    style?: CSSProperties,
}

/**
 * 静止画撮影ポップアップのコンポーネント。
 * 
 * @param props mimeTypeプロパティ。"image/png"がデフォルト。
 * @returns 
 */
const StillCameraPopup = forwardRef<HTMLDivElement, StillCameraPopupProps>(({showing, dispatch, mimeType = "image/png", maximumLongSide, callbackAfterCapturing, style, ...props}, ref): ReactElement => {
    const divStyle: CSSProperties = {};
    divStyle.display = "flex";
    divStyle.flexDirection = "column";
    divStyle.justifyContent = "center";
    divStyle.alignItems = "center";
    const videoDivStyle: CSSProperties = {};
    videoDivStyle.maxWidth = "100%";
    videoDivStyle.maxHeight = "calc(100vh - 8em)";
    videoDivStyle.minWidth = "300px";
    videoDivStyle.minHeight = "150px";
    videoDivStyle.display = "flex";
    videoDivStyle.flexDirection = "column";
    videoDivStyle.justifyContent = "center";
    videoDivStyle.alignItems = "center";
    const imgStyle: CSSProperties = {};
    imgStyle.position = "absolute";
    imgStyle.width = "3em";
    const buttonsStyle: CSSProperties = {};
    buttonsStyle.width = "100%";
    buttonsStyle.paddingTop = "1em";
    buttonsStyle.display = "none";
    buttonsStyle.flexDirection = "row";
    buttonsStyle.justifyContent = "space-between";
    buttonsStyle.alignItems = "center";
    buttonsStyle.gap = "0.3em";
    const videoDivRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [camera] = useState<StillCamera>(new StillCamera(videoDivRef));
    const [captured, setCaptured] = useState<boolean>(false);
    useEffect(() => {
        if (captured === false) {
            camera.restart();
        }

    }, [captured]);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const [canvas, setCanvas] = useState<HTMLCanvasElement>();
    const captureButtonEventHandler = async () => {
        setCanvas(await camera.capture());
        setCaptured(true);
    }
    const retryButtonEventHandler = () => {
        setCaptured(false);
    }
    const [alreadyPressed, setAlreadyPressed] = useState<boolean>(false);
    const completeButtonEventHandler = async (e: MouseEvent) => {
        if (alreadyPressed || typeof canvas === "undefined") {
            return;
        }
        setAlreadyPressed(true);
        const target: any = e.target;
        const button: HTMLButtonElement = target;
        button.disabled = true;
        try {
            await callbackAfterCapturing(canvas);
        } catch (error: any) {
            console.log(error);
        }
        dispatch(false);
    }
    useEffect(() => {
        if (showing) {
            setCaptured(false);
            setAlreadyPressed(false);
            camera.start().then(({video, canvas}) => {
                video.addEventListener("playing", () => {
                    if (buttonsRef.current === null) {
                        return;
                    }
                    buttonsRef.current.style.display = "flex";
                    let width = video.videoWidth;
                    let height = video.videoHeight;
                    if (maximumLongSide) {
                        if (width < height) {
                            if (height > maximumLongSide) {
                                width = maximumLongSide / height * width;
                                height = maximumLongSide;
                            }
                        } else {
                            if (width > maximumLongSide) {
                                height = maximumLongSide / width * height;
                                width = maximumLongSide;
                            }
                        }
                    }
                    canvas.height = height;
                    canvas.width = width;
                });
            });
        } else {
            camera.stop();
        }
    }, [showing]);
    return (
        <Popup showing={showing} dispatch={dispatch} width="auto" {...props} >
            <div style={{...divStyle, ...style}} ref={ref}>
                <div style={videoDivStyle} ref={videoDivRef}>
                    <WaitingCircle style={imgStyle} ref={imgRef} />
                </div>
                <div style={buttonsStyle} ref={buttonsRef}>
                    <button type="button" onClick={retryButtonEventHandler} disabled={captured === false}>やり直す</button>
                    {captured === false ?
                        <button type="button" onClick={captureButtonEventHandler}>撮影する</button>
                    :
                        <button type="button" onClick={completeButtonEventHandler}>完了</button>
                    }
                </div>
            </div>
        </Popup>
    );
});
export default StillCameraPopup;
