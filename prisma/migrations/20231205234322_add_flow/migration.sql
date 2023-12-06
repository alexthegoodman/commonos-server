-- CreateTable
CREATE TABLE "Flow" (
    "id" TEXT NOT NULL,
    "questionsContext" JSONB,
    "resultsContext" JSONB,
    "creatorId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Flow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Flow_id_key" ON "Flow"("id");

-- AddForeignKey
ALTER TABLE "Flow" ADD CONSTRAINT "Flow_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
