-- AlterTable
ALTER TABLE "Espressif" ADD COLUMN     "luminosity" INTEGER,
ALTER COLUMN "temperature" DROP NOT NULL,
ALTER COLUMN "humidity" DROP NOT NULL;
