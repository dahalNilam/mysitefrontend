import { HousingType } from "../enums/HousingType";
import { IHousing } from "../interfaces/IHousing";

const baseUrl = "http://localhost:5000/api/housing";

export class HousingApi {

    static getAll() {
        return fetch(baseUrl).then(response => response.json());
    }

    static add(housing: IHousing) {
        return new Promise((resolve) => {
            return fetch(baseUrl, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(housing)
            }).then((response) => {
                return resolve(response);
            });
        });
    }

    static getHousingType() {
        return Object.keys(HousingType)
            .filter(housingType => typeof HousingType[housingType as any] !== "number")
            .map((type) => {
                return {
                    value: type,
                    label: HousingType[parseInt(type, 10)]
                }
            });
    }

}