/**
 * サウンドを再生するクラス。
 */
export default class SoundPlayer {
    /**
     *  コンストラクタ。再生するメディアのURLを指定する。
     *
     * @param mediaURL
     */
    constructor(mediaURL) {
        this.mediaURL = mediaURL;
        this.audioElement = new Audio(mediaURL);
    }
    /**
     * 再生する音量(0〜1)。
     */
    get volume() {
        return this.audioElement.volume;
    }
    set volume(volume) {
        this.audioElement.volume = volume;
    }
    /**
     * サウンドを再生する。
     */
    async play() {
        await this.audioElement.play();
    }
    /**
     * サウンドを一時停止する。
     */
    async pause() {
        this.audioElement.pause();
    }
    /**
     * サウンドを停止する。
     */
    async stop() {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
    }
}
