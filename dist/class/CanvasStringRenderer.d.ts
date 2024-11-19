import { GraphicalString } from "scent-typescript";
/**
 * Canvasに文字列を描画するクラス。
 */
export default class CanvasStringRenderer extends GraphicalString<CanvasRenderingContext2D> {
    /**
     * 指定されたフォント文字列からサイズと単位を抽出する。
     *
     * @param font
     * @returns
     */
    private extractSizeAndUnit;
    protected getFontSizeFromContext(): number;
    protected setFontSizeToContext(fontSize: number): void;
    protected measureTextSize(text: string): {
        width: number;
        ascent: number;
        descent: number;
    };
    protected fillText(text: string, x: number, y: number): void;
}
