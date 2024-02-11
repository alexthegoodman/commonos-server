/*
  Warnings:

  - Added the required column `title` to the `Dashboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Funnel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dashboard" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Funnel" ADD COLUMN     "title" TEXT NOT NULL;
