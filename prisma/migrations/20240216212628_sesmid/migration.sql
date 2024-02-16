/*
  Warnings:

  - A unique constraint covering the columns `[sesMessageId]` on the table `Email` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sesMessageId` to the `Email` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Email" ADD COLUMN     "sesMessageId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Email_sesMessageId_key" ON "Email"("sesMessageId");
