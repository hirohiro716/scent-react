/**
 * 位置情報を取得するクラス。
 */
export default class Geolocation {

    /**
     * 位置情報を取得する。
     * 
     * @returns 
     */
    public getCurrentPosition(): Promise<{latitude: number, longitude: number}> {
        return new Promise<{latitude: number, longitude: number}>((resolve, reject) => {
            try {
                navigator.geolocation.getCurrentPosition((position) => {
                    resolve({latitude: position.coords.latitude, longitude: position.coords.longitude});
                }, (error: any) => {
                    reject(error);
                });
            } catch (error: any) {
                reject(error);
            }
        });
    }
}
