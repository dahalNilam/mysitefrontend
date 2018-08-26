import IImage from "./IImage";
import { HousingType } from "../Enums/HousingType";

export default interface IHousing {
    id: number,
    price?: number,
    type?: HousingType,
    numberOfBedroom?: number,
    numberOfBathroom?: number,
    description?: string,
    images?: IImage[],
}