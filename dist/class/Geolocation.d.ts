/**
 * 位置情報を取得するクラス。
 */
export default class Geolocation {
    /**
     * 位置情報を取得する。
     *
     * @returns
     */
    getCurrentPosition(): Promise<{
        latitude: number;
        longitude: number;
    }>;
}
