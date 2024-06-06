/*
  Warnings:

  - The primary key for the `Espressif` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Espressif" DROP CONSTRAINT "Espressif_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "sensorId" DROP DEFAULT,
ADD CONSTRAINT "Espressif_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Espressif_sensorId_seq";
