import { HousingType } from "../Enums/HousingType";
import { IHousing } from "../Interfaces";

const baseUrl = "http://localhost:5000/api/housing";

export default class HousingApi {
  static getAll(): Promise<IHousing[]> {
    return fetch(baseUrl).then(response => response.json());
  }

  static add(housing: IHousing): Promise<IHousing> {
    return fetch(baseUrl, {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(housing)
    }).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }

  static update(housing: IHousing): Promise<IHousing> {
    return fetch(`${baseUrl}/${housing.id}`, {
      method: "put",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(housing)
    }).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }

  static remove(id: number) {
    return new Promise(resolve => {
      return fetch(baseUrl, {
        method: "delete",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(id)
      }).then(response => {
        return resolve(response);
      });
    });
  }

  static getHousingType(): {
    value: string;
    label: string;
  }[] {
    return Object.keys(HousingType)
      .filter(
        housingType => typeof HousingType[housingType as any] !== "number"
      )
      .map(type => {
        return {
          value: type,
          label: HousingType[parseInt(type, 10)]
        };
      });
  }
}
