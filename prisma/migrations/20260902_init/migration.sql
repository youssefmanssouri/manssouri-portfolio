-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoginAt" TIMESTAMP(3),

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "projectType" TEXT NOT NULL,
    "budgetRange" TEXT,
    "message" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'en',
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'PERSONAL PROJECT',
    "taglineEn" TEXT NOT NULL,
    "taglineFr" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionFr" TEXT NOT NULL,
    "overviewEn" TEXT NOT NULL,
    "overviewFr" TEXT NOT NULL,
    "objectiveEn" TEXT NOT NULL,
    "objectiveFr" TEXT NOT NULL,
    "outcomeEn" TEXT NOT NULL,
    "outcomeFr" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT true,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "editorialVariant" TEXT NOT NULL DEFAULT 'featured-large',
    "githubUrl" TEXT NOT NULL,
    "liveUrl" TEXT,
    "heroImage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectFeature" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleFr" TEXT NOT NULL,
    "descriptionEn" TEXT,
    "descriptionFr" TEXT,

    CONSTRAINT "ProjectFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectTechnology" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProjectTechnology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectChallenge" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "textEn" TEXT NOT NULL,
    "textFr" TEXT NOT NULL,

    CONSTRAINT "ProjectChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnalyticsEvent" (
    "id" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "path" TEXT,
    "meta" TEXT,
    "ipHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnalyticsEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE INDEX "ContactMessage_createdAt_idx" ON "ContactMessage"("createdAt");

-- CreateIndex
CREATE INDEX "ContactMessage_status_idx" ON "ContactMessage"("status");

-- CreateIndex
CREATE INDEX "ContactMessage_email_idx" ON "ContactMessage"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE INDEX "Project_slug_idx" ON "Project"("slug");

-- CreateIndex
CREATE INDEX "Project_published_idx" ON "Project"("published");

-- CreateIndex
CREATE INDEX "Project_featured_idx" ON "Project"("featured");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_event_idx" ON "AnalyticsEvent"("event");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_createdAt_idx" ON "AnalyticsEvent"("createdAt");

-- AddForeignKey
ALTER TABLE "ProjectFeature" ADD CONSTRAINT "ProjectFeature_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTechnology" ADD CONSTRAINT "ProjectTechnology_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectChallenge" ADD CONSTRAINT "ProjectChallenge_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
