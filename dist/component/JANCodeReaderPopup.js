import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import Popup from "./Popup.js";
import WaitingCircle from "./WaitingCircle.js";
import JANCodeReader from "../class/JANCodeReader.js";
/**
 * バーコード読み取りポップアップのコンポーネント。
 *
 * @param showing 表示する場合はtrueを指定する。
 * @param dispatch 表示と非表示を切り替えるためのDispatch。
 * @param callbackAfterReading 読み取った後の処理。
 * @param validator バーコードが正しいか判定するためのコールバック。このメソッドがtrueを返さない限り読み取りは完了しない。
 * @param props
 * @returns
 */
const JANCodeReaderPopup = forwardRef(({ showing, dispatch, callbackAfterReading, validator, style, ...props }, ref) => {
    const divStyle = {};
    divStyle.maxWidth = "100%";
    divStyle.maxHeight = "calc(100vh - 5em)";
    divStyle.minWidth = "300px";
    divStyle.minHeight = "150px";
    divStyle.display = "flex";
    divStyle.justifyContent = "center";
    divStyle.alignItems = "center";
    const imgStyle = {};
    imgStyle.position = "absolute";
    imgStyle.width = "3em";
    const divRef = useRef(null);
    useImperativeHandle(ref, () => {
        return divRef.current;
    });
    const [reader] = useState(new JANCodeReader(divRef));
    useEffect(() => {
        if (showing) {
            if (validator) {
                reader.setValidator(validator);
            }
            reader.start().then(async (result) => {
                await callbackAfterReading(result);
                dispatch(false);
            }).catch((error) => {
                console.log(error);
            });
        }
        else {
            reader.stop();
        }
    }, [showing]);
    return (React.createElement(Popup, { showing: showing, dispatch: dispatch, width: "auto", ...props },
        React.createElement("div", { style: { ...divStyle, ...style }, ref: divRef },
            React.createElement(WaitingCircle, { style: imgStyle }))));
});
export default JANCodeReaderPopup;
