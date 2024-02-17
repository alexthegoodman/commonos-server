-- CreateTable
CREATE TABLE "ContentDevelopersSettings" (
    "id" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContentDevelopersSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContentDevelopersSettings_id_key" ON "ContentDevelopersSettings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ContentDevelopersSettings_apiKey_key" ON "ContentDevelopersSettings"("apiKey");

-- CreateIndex
CREATE UNIQUE INDEX "ContentDevelopersSettings_userId_key" ON "ContentDevelopersSettings"("userId");

-- AddForeignKey
ALTER TABLE "ContentDevelopersSettings" ADD CONSTRAINT "ContentDevelopersSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
