/*
  Warnings:

  - Added the required column `prompt` to the `Flow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flow" ADD COLUMN     "prompt" TEXT NOT NULL;
