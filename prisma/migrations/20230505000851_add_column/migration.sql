/*
  Warnings:

  - Added the required column `name` to the `Portifolio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Portifolio" ADD COLUMN     "name" TEXT NOT NULL;
