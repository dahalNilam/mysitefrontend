import { IImage } from "./IImage";

export interface IHousing {
    id: number,
    price: number,
    type: number,
    numberOfBedroom: number,
    numberOfBathroom: number,
    description: string,
    images: IImage[],
}