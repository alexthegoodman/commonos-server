-- CreateTable
CREATE TABLE "EmailLog" (
    "id" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailTemplate" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "context" JSONB NOT NULL,
    "creatorId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DomainSettings" (
    "id" TEXT NOT NULL,
    "domainName" TEXT NOT NULL,
    "dkimData" JSONB,
    "userId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DomainSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailDevelopersSettings" (
    "id" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailDevelopersSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailLog_id_key" ON "EmailLog"("id");

-- CreateIndex
CREATE UNIQUE INDEX "EmailTemplate_id_key" ON "EmailTemplate"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DomainSettings_id_key" ON "DomainSettings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DomainSettings_domainName_key" ON "DomainSettings"("domainName");

-- CreateIndex
CREATE UNIQUE INDEX "DomainSettings_userId_key" ON "DomainSettings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "EmailDevelopersSettings_id_key" ON "EmailDevelopersSettings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "EmailDevelopersSettings_apiKey_key" ON "EmailDevelopersSettings"("apiKey");

-- CreateIndex
CREATE UNIQUE INDEX "EmailDevelopersSettings_userId_key" ON "EmailDevelopersSettings"("userId");

-- AddForeignKey
ALTER TABLE "EmailLog" ADD CONSTRAINT "EmailLog_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "EmailTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailLog" ADD CONSTRAINT "EmailLog_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailTemplate" ADD CONSTRAINT "EmailTemplate_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DomainSettings" ADD CONSTRAINT "DomainSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailDevelopersSettings" ADD CONSTRAINT "EmailDevelopersSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
