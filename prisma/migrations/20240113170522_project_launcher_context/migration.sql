-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "documentTree" JSONB,
ADD COLUMN     "drawingFiles" JSONB,
ADD COLUMN     "feedTree" JSONB,
ADD COLUMN     "presentationFiles" JSONB,
ADD COLUMN     "sheetFiles" JSONB,
ADD COLUMN     "soundFiles" JSONB,
ADD COLUMN     "videoFiles" JSONB;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "launcherContext" JSONB;
