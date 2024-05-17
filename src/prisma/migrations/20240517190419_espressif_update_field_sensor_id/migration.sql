/*
  Warnings:

  - The primary key for the `Espressif` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `sensorId` column on the `Espressif` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Espressif" DROP CONSTRAINT "Espressif_pkey",
DROP COLUMN "sensorId",
ADD COLUMN     "sensorId" SERIAL NOT NULL,
ADD CONSTRAINT "Espressif_pkey" PRIMARY KEY ("sensorId");
