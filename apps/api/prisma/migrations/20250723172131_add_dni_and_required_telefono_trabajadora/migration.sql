/*
  Warnings:

  - A unique constraint covering the columns `[dni]` on the table `trabajadora` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dni` to the `trabajadora` table without a default value. This is not possible if the table is not empty.
  - Made the column `telefono` on table `trabajadora` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "trabajadora" ADD COLUMN     "dni" TEXT NOT NULL,
ALTER COLUMN "telefono" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "trabajadora_dni_key" ON "trabajadora"("dni");
