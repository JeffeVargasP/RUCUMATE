/*
  Warnings:

  - The primary key for the `Espressif` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `humidity` on the `Espressif` table. All the data in the column will be lost.
  - You are about to drop the column `luminosity` on the `Espressif` table. All the data in the column will be lost.
  - You are about to drop the column `temperature` on the `Espressif` table. All the data in the column will be lost.

*/
-- AlterTable
CREATE SEQUENCE espressif_sensorid_seq;
ALTER TABLE "Espressif" DROP CONSTRAINT "Espressif_pkey",
DROP COLUMN "humidity",
DROP COLUMN "luminosity",
DROP COLUMN "temperature",
ALTER COLUMN "sensorId" SET DEFAULT nextval('espressif_sensorid_seq'),
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Espressif_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE espressif_sensorid_seq OWNED BY "Espressif"."sensorId";
DROP SEQUENCE "Espressif_id_seq";

-- CreateTable
CREATE TABLE "SensorData" (
    "id" SERIAL NOT NULL,
    "sensorId" INTEGER NOT NULL,
    "temperature" DOUBLE PRECISION,
    "humidity" DOUBLE PRECISION,
    "luminosity" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SensorData_pkey" PRIMARY KEY ("id")
);
