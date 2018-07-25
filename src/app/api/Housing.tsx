import { IHousing } from "../interfaces/IHousing";

const baseUrl = "http://localhost:5000/api/housing";

export class HousingApi {

    static getAll() {
        return fetch(baseUrl).then(response => response.json());
    }
}