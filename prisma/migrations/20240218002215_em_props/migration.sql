-- AlterTable
ALTER TABLE "Email" ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "draft" BOOLEAN NOT NULL DEFAULT false;
