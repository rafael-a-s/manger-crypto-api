import { Asset } from "@prisma/client";

export class CreatePortifolioDto {
    id: string;
    coin: string;
    subTotal?: Float32Array;
    totalPriceActual?: Float32Array;
    percent?: Float32Array;
    assets: Asset[];
}
