/*
  Warnings:

  - Added the required column `designStyleId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designTypeId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceStartFrom` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "designStyleId" INTEGER NOT NULL,
ADD COLUMN     "designTypeId" INTEGER NOT NULL,
ADD COLUMN     "priceStartFrom" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "DesignType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DesignType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DesignStyle" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DesignStyle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_designTypeId_fkey" FOREIGN KEY ("designTypeId") REFERENCES "DesignType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_designStyleId_fkey" FOREIGN KEY ("designStyleId") REFERENCES "DesignStyle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
