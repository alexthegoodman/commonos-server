-- CreateTable
CREATE TABLE "PresentationTemplate" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "context" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PresentationTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PresentationTemplate_id_key" ON "PresentationTemplate"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PresentationTemplate_key_key" ON "PresentationTemplate"("key");
