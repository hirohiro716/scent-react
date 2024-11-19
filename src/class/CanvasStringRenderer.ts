import { GraphicalString, StringObject } from "scent-typescript";

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
    private extractSizeAndUnit(font: string): {size: number, unit:string} | undefined {
        const fontParts: StringObject[] = StringObject.from(font).split(" ");
        for (const fontPart of fontParts) {
            if (fontPart.length() >= 2 && fontPart.clone().replace("[0-9]{1,}[0-9\.]{0,}[a-zA-Z]{1,4}", "").length() == 0) {
                const size = fontPart.clone().extract("[0-9\\.]").toNumber();
                const unit = fontPart.clone().extract("[^0-9\\.]").toString();
                if (size !== null && unit.length > 0) {
                    return {size: size, unit: unit};
                }
            }
        }
        return undefined;
    }

    protected getFontSizeFromContext(): number {
        const sizeAndUnit = this.extractSizeAndUnit(this.context.font);
        if (typeof sizeAndUnit === "undefined") {
            return 1;
        }
        return sizeAndUnit.size;
    }

    protected setFontSizeToContext(fontSize: number): void {
        const newFont = new StringObject(this.context.font);
        const sizeAndUnit = this.extractSizeAndUnit(this.context.font);
        if (typeof sizeAndUnit !== "undefined") {
            newFont.replace(StringObject.from(sizeAndUnit.size).toString() + StringObject.from(sizeAndUnit.unit).toString(), fontSize + StringObject.from(sizeAndUnit.unit).toString());
            this.context.font = newFont.toString();
        }
    }

    protected measureTextSize(text: string): { width: number; ascent: number; descent: number; } {
        const metrics = this.context.measureText(text);
        return {width: metrics.width, ascent: metrics.actualBoundingBoxAscent, descent: metrics.fontBoundingBoxDescent};
    }

    protected fillText(text: string, x: number, y: number): void {
        this.context.fillText(text, x, y);
    }
}
