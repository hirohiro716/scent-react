import React, { forwardRef, useEffect, useRef, useState } from "react";
import StillCamera from "../class/StillCamera.js";
import Popup from "../component/Popup.js";
import WaitingCircle from "../component/WaitingCircle.js";
/**
 * 静止画撮影ポップアップのコンポーネント。
 *
 * @param props mimeTypeプロパティ。"image/png"がデフォルト。
 * @returns
 */
const StillCameraPopup = forwardRef(({ showing, dispatch, mimeType = "image/png", maximumLongSide, callbackAfterCapturing, style, ...props }, ref) => {
    const divStyle = {};
    divStyle.display = "flex";
    divStyle.flexDirection = "column";
    divStyle.justifyContent = "center";
    divStyle.alignItems = "center";
    const videoDivStyle = {};
    videoDivStyle.maxWidth = "100%";
    videoDivStyle.maxHeight = "calc(100vh - 8em)";
    videoDivStyle.minWidth = "300px";
    videoDivStyle.minHeight = "150px";
    videoDivStyle.display = "flex";
    videoDivStyle.flexDirection = "column";
    videoDivStyle.justifyContent = "center";
    videoDivStyle.alignItems = "center";
    const imgStyle = {};
    imgStyle.position = "absolute";
    imgStyle.width = "3em";
    const buttonsStyle = {};
    buttonsStyle.width = "100%";
    buttonsStyle.paddingTop = "1em";
    buttonsStyle.display = "none";
    buttonsStyle.flexDirection = "row";
    buttonsStyle.justifyContent = "space-between";
    buttonsStyle.alignItems = "center";
    buttonsStyle.gap = "0.3em";
    const videoDivRef = useRef(null);
    const imgRef = useRef(null);
    const [camera] = useState(new StillCamera(videoDivRef));
    const [captured, setCaptured] = useState(false);
    useEffect(() => {
        if (captured === false) {
            camera.restart();
        }
    }, [captured]);
    const buttonsRef = useRef(null);
    const [canvas, setCanvas] = useState();
    const captureButtonEventHandler = async () => {
        setCanvas(await camera.capture());
        setCaptured(true);
    };
    const retryButtonEventHandler = () => {
        setCaptured(false);
    };
    const [alreadyPressed, setAlreadyPressed] = useState(false);
    const completeButtonEventHandler = async (e) => {
        if (alreadyPressed || typeof canvas === "undefined") {
            return;
        }
        setAlreadyPressed(true);
        const target = e.target;
        const button = target;
        button.disabled = true;
        try {
            await callbackAfterCapturing(canvas);
        }
        catch (error) {
            console.log(error);
        }
        dispatch(false);
    };
    useEffect(() => {
        if (showing) {
            setCaptured(false);
            setAlreadyPressed(false);
            camera.start().then(({ video, canvas }) => {
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
                        }
                        else {
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
        }
        else {
            camera.stop();
        }
    }, [showing]);
    return (React.createElement(Popup, { showing: showing, dispatch: dispatch, width: "auto", ...props },
        React.createElement("div", { style: { ...divStyle, ...style }, ref: ref },
            React.createElement("div", { style: videoDivStyle, ref: videoDivRef },
                React.createElement(WaitingCircle, { style: imgStyle, ref: imgRef })),
            React.createElement("div", { style: buttonsStyle, ref: buttonsRef },
                React.createElement("button", { type: "button", onClick: retryButtonEventHandler, disabled: captured === false }, "\u3084\u308A\u76F4\u3059"),
                captured === false ?
                    React.createElement("button", { type: "button", onClick: captureButtonEventHandler }, "\u64AE\u5F71\u3059\u308B")
                    :
                        React.createElement("button", { type: "button", onClick: completeButtonEventHandler }, "\u5B8C\u4E86")))));
});
export default StillCameraPopup;
