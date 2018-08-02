const baseUrl = "http://localhost:5000/api/image";

export class ImageApi {
    static getById() {
        return new Promise((resolve) => {
            fetch(`${baseUrl}/1`).then((response) => {
                response.arrayBuffer().then((buffer) => {
                    const base64Flag = 'data:image/jpeg;base64,';
                    const imageStr = base64Flag + ImageApi.arrayBufferToBase64(buffer);

                    return resolve(imageStr);
                });

            });
        });
    }

    static arrayBufferToBase64 = (buffer: ArrayBuffer) => {
        let binary = '';
        const bytes = [].slice.call(new Uint8Array(buffer));

        bytes.forEach((b: number) => binary += String.fromCharCode(b));

        return window.btoa(binary);
    };
}