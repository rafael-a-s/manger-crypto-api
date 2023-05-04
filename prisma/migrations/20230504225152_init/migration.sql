-- CreateTable
CREATE TABLE "Portifolio" (
    "id" TEXT NOT NULL,
    "coin" TEXT NOT NULL,
    "subTotal" DOUBLE PRECISION,
    "totalPriceActual" DOUBLE PRECISION,
    "percent" DOUBLE PRECISION,

    CONSTRAINT "Portifolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asset" (
    "id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quanty" INTEGER NOT NULL,
    "portifolioId" TEXT,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_portifolioId_fkey" FOREIGN KEY ("portifolioId") REFERENCES "Portifolio"("id") ON DELETE SET NULL ON UPDATE CASCADE;
