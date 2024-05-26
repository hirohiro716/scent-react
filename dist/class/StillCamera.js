/**
 * スチールカメラのクラス。
 */
export default class StillCamera {
    /**
     * コンストラクタ。プレビューを表示するHTMLDivElementのRefObjectを指定する。
     *
     * @param refObject
     */
    constructor(refObject) {
        this.divDefaultChildNodes = undefined;
        this.refObject = refObject;
    }
    /**
     * カメラを起動する。
     *
     * @param facingMode インカメラを使用する場合は指定する。
     * @returns
     * @throws Error div要素が見つからなかった場合。
     */
    async start(facingMode = "environment") {
        if (this.refObject.current === null || this.mediaStream) {
            throw new Error("No div elements available.");
        }
        const maximumWidth = this.refObject.current.style.maxWidth;
        const maximumHeight = this.refObject.current.style.maxHeight;
        this.divDefaultChildNodes = [...this.refObject.current.childNodes];
        const config = {
            video: {
                facingMode: facingMode,
                width: { ideal: 1920 },
                height: { ideal: 1080 },
            },
            audio: false
        };
        const mediaStream = await navigator.mediaDevices.getUserMedia(config);
        if (this.refObject.current === null) {
            throw new Error("No div elements available.");
        }
        this.mediaStream = mediaStream;
        const video = document.createElement("video");
        this.refObject.current.append(video);
        video.style.maxWidth = maximumWidth;
        video.style.maxHeight = maximumHeight;
        video.onplaying = () => {
            video.style.border = "1px solid #ccc";
            if (this.divDefaultChildNodes) {
                for (const node of this.divDefaultChildNodes) {
                    const anyNode = node;
                    const element = anyNode;
                    element.remove();
                }
            }
        };
        video.preload = "auto";
        video.autoplay = true;
        video.muted = true;
        video.playsInline = true;
        video.srcObject = mediaStream;
        video.play();
        this.htmlVideoElement = video;
        const canvas = document.createElement("canvas");
        canvas.style.maxWidth = maximumWidth;
        canvas.style.maxHeight = maximumHeight;
        canvas.style.border = "1px solid #ccc";
        this.refObject.current.append(canvas);
        canvas.style.display = "none";
        this.htmlCanvasElement = canvas;
        return { video: this.htmlVideoElement, canvas: this.htmlCanvasElement };
    }
    /**
     * video要素に表示されている映像をキャプチャする。画像サイズはcanvas要素の属性値に依存する。
     *
     * @returns
     * @throws DOMException video要素、canvas要素での処理に失敗した場合。
     */
    async capture() {
        const video = this.htmlVideoElement;
        const canvas = this.htmlCanvasElement;
        if (typeof video === "undefined" || typeof canvas === "undefined") {
            throw new DOMException("Camera has not been started.");
        }
        const context = canvas.getContext("2d");
        if (context === null) {
            throw new DOMException("Could not obtain the canvas context object.");
        }
        const videoStyle = window.getComputedStyle(video);
        const videoWidth = window.parseFloat(videoStyle.width);
        const videoHeight = window.parseFloat(videoStyle.height);
        let canvasWidth = canvas.width;
        let canvasHeight = canvas.height;
        let paddingLeft = 0;
        let paddingTop = 0;
        const videoRate = videoWidth / videoHeight;
        const canvasRate = canvasWidth / canvasHeight;
        if (videoRate > canvasRate) {
            canvasHeight = canvasWidth * (videoHeight / videoWidth);
            paddingTop = (canvas.height - canvasHeight) / 2;
        }
        else {
            canvasWidth = canvasHeight * (videoWidth / videoHeight);
            paddingLeft = (canvas.width - canvasWidth) / 2;
        }
        context.fillStyle = "#000";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(video, paddingLeft, paddingTop, canvasWidth, canvasHeight);
        video.style.display = "none";
        canvas.style.display = "";
        return canvas;
    }
    /**
     * キャプチャ後に停止したカメラを再開する。
     *
     * @returns
     */
    restart() {
        if (typeof this.htmlVideoElement === "undefined" || typeof this.htmlCanvasElement === "undefined") {
            return;
        }
        this.htmlVideoElement.style.display = "";
        this.htmlCanvasElement.style.display = "none";
    }
    /**
     * カメラを停止する。
     */
    stop() {
        if (this.mediaStream) {
            this.mediaStream.getTracks().forEach((track) => {
                track.stop();
            });
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
        this.mediaStream = undefined;
        this.htmlVideoElement = undefined;
        this.htmlCanvasElement = undefined;
    }
}
