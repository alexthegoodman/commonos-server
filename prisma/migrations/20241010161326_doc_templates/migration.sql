-- CreateTable
CREATE TABLE "DocumentTemplate" (
    "id" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "masterVisuals" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DocumentTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DocumentTemplate_id_key" ON "DocumentTemplate"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentTemplate_sourceId_key" ON "DocumentTemplate"("sourceId");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentTemplate_key_key" ON "DocumentTemplate"("key");
