-- AlterTable
ALTER TABLE "Thread" ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "draft" BOOLEAN NOT NULL DEFAULT false;
