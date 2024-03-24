-- CreateTable
CREATE TABLE "WorkEmailFolder" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkEmailFolder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkEmailTemplate" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "initialMarkdown" TEXT,
    "workEmailFolderId" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkEmailTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkEmailFolder_id_key" ON "WorkEmailFolder"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WorkEmailFolder_creatorId_key" ON "WorkEmailFolder"("creatorId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkEmailTemplate_id_key" ON "WorkEmailTemplate"("id");

-- AddForeignKey
ALTER TABLE "WorkEmailFolder" ADD CONSTRAINT "WorkEmailFolder_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkEmailTemplate" ADD CONSTRAINT "WorkEmailTemplate_workEmailFolderId_fkey" FOREIGN KEY ("workEmailFolderId") REFERENCES "WorkEmailFolder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
