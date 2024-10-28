/**
 * 位置情報を取得するクラス。
 */
export default class Geolocation {
    /**
     * 位置情報を取得する。
     *
     * @returns
     */
    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            try {
                navigator.geolocation.getCurrentPosition((position) => {
                    resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude });
                }, (error) => {
                    reject(error);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
