import { Prisma } from "@prisma/client";

export class Portifolio implements Prisma.PortifolioUncheckedCreateInput {
    id?: string;
    name: string;
    coin: string;
    subTotal?: number;
    totalPriceActual?: number;
    percent?: number;
    assets?: Prisma.AssetUncheckedCreateNestedManyWithoutPortifolioInput;
}
