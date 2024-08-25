/*
  Warnings:

  - You are about to drop the column `styles` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `supplierType` on the `Supplier` table. All the data in the column will be lost.
  - Added the required column `category` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SupplierCategory" AS ENUM ('EVENT_PLACES', 'MUSIC_DJS', 'MAKEUP', 'PHOTOGRAPHY', 'ATTRACTIONS', 'DESIGN', 'CATERING_DRINKS');

-- AlterTable
ALTER TABLE "Supplier" DROP COLUMN "styles",
DROP COLUMN "supplierType",
ADD COLUMN     "category" "SupplierCategory" NOT NULL;

-- DropEnum
DROP TYPE "SupplierType";
