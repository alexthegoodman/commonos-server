/*
  Warnings:

  - Added the required column `typeId` to the `Flow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flow" ADD COLUMN     "typeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Type_id_key" ON "Type"("id");

-- AddForeignKey
ALTER TABLE "Flow" ADD CONSTRAINT "Flow_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
