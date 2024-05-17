/*
  Warnings:

  - The primary key for the `Espressif` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[sensorId]` on the table `Espressif` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `sensorId` on the `Espressif` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Espressif" DROP CONSTRAINT "Espressif_pkey",
DROP COLUMN "sensorId",
ADD COLUMN     "sensorId" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Espressif_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Espressif_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Espressif_sensorId_key" ON "Espressif"("sensorId");
