/*
  Warnings:

  - You are about to drop the column `id` on the `Espressif` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Espressif_id_key";

-- AlterTable
ALTER TABLE "Espressif" DROP COLUMN "id";
