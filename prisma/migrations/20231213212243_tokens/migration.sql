-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastTokenReset" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "periodTokenUsage" INTEGER NOT NULL DEFAULT 0;
