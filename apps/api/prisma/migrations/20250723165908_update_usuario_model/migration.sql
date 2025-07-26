/*
  Warnings:

  - You are about to drop the column `activo` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `serviciosFestivos` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `serviciosFinde` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `serviciosLaborables` on the `usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[dni]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dni` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Made the column `telefono` on table `usuario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `direccion` on table `usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "usuario_email_key";

-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "activo",
DROP COLUMN "email",
DROP COLUMN "serviciosFestivos",
DROP COLUMN "serviciosFinde",
DROP COLUMN "serviciosLaborables",
ADD COLUMN     "dni" TEXT NOT NULL,
ADD COLUMN     "servicioFestivos" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "servicioLaborables" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "telefono" SET NOT NULL,
ALTER COLUMN "direccion" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "usuario_dni_key" ON "usuario"("dni");
