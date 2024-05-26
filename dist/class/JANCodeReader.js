// @ts-ignore
import Quagga from "quagga";
/**
 * バーコードリーダーのクラス。
 */
export default class JANCodeReader {
    /**
     * コンストラクタ。プレビューを表示するHTMLDivElementのRefObjectを指定する。
     *
     * @param refObject
     */
    constructor(refObject) {
        this.validator = undefined;
        this.htmlVideoElement = undefined;
        this.divDefaultChildNodes = undefined;
        this.refObject = refObject;
    }
    /**
     * 読み取り結果を検証するコールバックをセットする。このコールバックの結果がtrueの場合のみ、読み取り結果が処理される。
     *
     * @param validator
     */
    setValidator(validator) {
        this.validator = validator;
    }
    /**
     * 読み取りを開始する。内部で生成されるHTMLVideoElementに対して処理が必要ならコールバックを指定する。
     *
     * @param callbackForVideoElement
     * @returns
     */
    start(callbackForVideoElement) {
        return new Promise((resolve, reject) => {
            if (this.refObject.current === null) {
                return;
            }
            const maximumWidth = this.refObject.current.style.maxWidth;
            const maximumHeight = this.refObject.current.style.maxHeight;
            this.divDefaultChildNodes = [...this.refObject.current.childNodes];
            const observer = new MutationObserver((mutations) => {
                for (const mutation of mutations) {
                    if (mutation.type === "childList") {
                        for (const node of mutation.addedNodes.values()) {
                            const anyNode = node;
                            switch (node.nodeName.toLowerCase()) {
                                case "video":
                                    const video = anyNode;
                                    video.style.maxWidth = maximumWidth;
                                    video.style.maxHeight = maximumHeight;
                                    video.onplaying = () => {
                                        video.style.border = "1px solid #ccc";
                                        if (this.refObject.current) {
                                            for (const node of this.refObject.current.childNodes) {
                                                node.remove();
                                            }
                                        }
                                    };
                                    this.htmlVideoElement = video;
                                    break;
                                case "canvas":
                                    const canvas = anyNode;
                                    canvas.style.display = "none";
                                    break;
                            }
                        }
                        if (callbackForVideoElement) {
                            callbackForVideoElement(this.htmlVideoElement);
                        }
                    }
                }
            });
            observer.observe(this.refObject.current, { childList: true });
            Quagga.onDetected((result) => {
                if (typeof result !== "undefined") {
                    if (this.validator && this.validator(result.codeResult.code) === false) {
                        return;
                    }
                    resolve(result.codeResult.code);
                    this.stop();
                }
            });
            let numOfWorkers = navigator.hardwareConcurrency;
            if (numOfWorkers > 2) {
                numOfWorkers -= 2;
            }
            if (numOfWorkers > 8) {
                numOfWorkers = 8;
            }
            const config = {
                inputStream: {
                    type: "LiveStream",
                    target: this.refObject.current,
                    constraints: {
                        width: { min: 800, max: 1920 },
                        height: { min: 600, max: 1080 },
                        aspectRatio: { min: 4 / 3, max: 16 / 9 },
                        facingMode: "environment"
                    },
                    area: {
                        top: "0%",
                        right: "0%",
                        left: "0%",
                        bottom: "0%"
                    }
                },
                locator: {
                    patchSize: "medium"
                },
                numOfWorkers: numOfWorkers,
                decoder: {
                    readers: [
                        "ean_reader",
                    ]
                },
                locate: true
            };
            Quagga.init(config, function (error) {
                if (error) {
                    reject(error);
                    return;
                }
                Quagga.start();
            });
        });
    }
    /**
     * 読み取りを中止する。
     */
    stop() {
        try {
            Quagga.stop();
        }
        catch (error) {
        }
        if (this.htmlVideoElement) {
            this.htmlVideoElement.srcObject = null;
        }
        if (this.refObject.current) {
            for (const node of this.refObject.current.childNodes) {
                node.remove();
            }
            if (this.divDefaultChildNodes) {
                for (const node of this.divDefaultChildNodes) {
                    const anyNode = node;
                    const element = anyNode;
                    this.refObject.current.append(element);
                }
            }
        }
    }
}
