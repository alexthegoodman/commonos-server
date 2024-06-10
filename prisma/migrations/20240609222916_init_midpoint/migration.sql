-- CreateTable
CREATE TABLE "MdProject" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "context" JSONB,
    "creatorId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MdProject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MdProject_id_key" ON "MdProject"("id");

-- AddForeignKey
ALTER TABLE "MdProject" ADD CONSTRAINT "MdProject_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
