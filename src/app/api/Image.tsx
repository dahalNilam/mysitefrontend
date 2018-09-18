import { IImage } from "App/Interfaces";
const baseUrl = "http://localhost:5000/api/image";

export default class ImageApi {
  static getById(id: number) {
    return new Promise(resolve => {
      fetch(`${baseUrl}/${id}`).then(response => {
        response.arrayBuffer().then(buffer => {
          const base64Flag = "data:image/jpeg;base64,";
          const imageStr = base64Flag + ImageApi.arrayBufferToBase64(buffer);

          return resolve(imageStr);
        });
      });
    });
  }

  static upload(image: File) {
    let data = new FormData();
    data.append("image", image);

    return new Promise(resolve => {
      return fetch(baseUrl, {
        method: "POST",
        body: data
      }).then(response => {
        return resolve(response.json());
      });
    });
  }

  static arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    let binary = "";
    const bytes = [].slice.call(new Uint8Array(buffer));

    bytes.forEach((b: number) => (binary += String.fromCharCode(b)));

    return window.btoa(binary);
  };
}
