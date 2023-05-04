import { Portifolio } from "@prisma/client";

export class CreateAssetDto {
    id: String;
    price: Float32Array
    quanty: Int32Array;
    Portifolio: Portifolio;
}
