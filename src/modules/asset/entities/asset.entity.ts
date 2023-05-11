import { Prisma } from "@prisma/client";

export class Asset implements Prisma.AssetUncheckedCreateInput {
    id?: string;
    price: number;
    symbol: string;
    quanty: number;
    portifolioId?: string;
}
