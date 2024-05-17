/*
  Warnings:

  - The primary key for the `Espressif` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Espressif` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Espressif" DROP CONSTRAINT "Espressif_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ADD CONSTRAINT "Espressif_pkey" PRIMARY KEY ("sensorId");
DROP SEQUENCE "Espressif_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Espressif_id_key" ON "Espressif"("id");
