import { HousingType } from "../enums/HousingType";

const baseUrl = "http://localhost:5000/api/housing";

export class HousingApi {

    static getAll() {
        return fetch(baseUrl).then(response => response.json());
    }

    static getHousingType() {
        return Object.keys(HousingType)
            .filter(value => typeof HousingType[value as any] === "number")
            .map((v) => {
                return {
                    value: v,
                    label: v
                }
            });
    }
}