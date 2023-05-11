/*
  Warnings:

  - Added the required column `symbol` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "symbol" TEXT NOT NULL;
