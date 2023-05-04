import { Portifolio } from "@prisma/client";

export class Asset {
    id: String;
    price: Float32Array
    quanty: Int32Array;
    Portifolio: Portifolio;
}
