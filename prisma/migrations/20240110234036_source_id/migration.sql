/*
  Warnings:

  - A unique constraint covering the columns `[sourceId]` on the table `PresentationTemplate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sourceId` to the `PresentationTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PresentationTemplate" ADD COLUMN     "sourceId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PresentationTemplate_sourceId_key" ON "PresentationTemplate"("sourceId");
