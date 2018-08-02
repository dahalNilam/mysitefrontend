import { IImage } from "./IImage";
import { HousingType } from "../enums/HousingType";

export interface IHousing {
    id: number,
    price: number,
    type: HousingType,
    numberOfBedroom: number,
    numberOfBathroom: number,
    description: string,
    images: IImage[],
}