-- CreateEnum
CREATE TYPE "VideoEntityType" AS ENUM ('VIDEO', 'IMAGE');

-- CreateTable
CREATE TABLE "VideoEntity" (
    "id" SERIAL NOT NULL,
    "type" "VideoEntityType" NOT NULL,
    "path" TEXT NOT NULL,
    "videoFragmentId" INTEGER,
    "duration" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "VideoEntity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoFragment" (
    "id" SERIAL NOT NULL,
    "start" DOUBLE PRECISION,
    "end" DOUBLE PRECISION,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "VideoFragment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AudoEntity" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "audoFragmentId" INTEGER NOT NULL,

    CONSTRAINT "AudoEntity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AudoFragment" (
    "id" SERIAL NOT NULL,
    "start" DOUBLE PRECISION,
    "end" DOUBLE PRECISION,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "AudoFragment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoProject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "VideoProject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VideoEntity_videoFragmentId_order_key" ON "VideoEntity"("videoFragmentId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "AudoEntity_audoFragmentId_key" ON "AudoEntity"("audoFragmentId");

-- AddForeignKey
ALTER TABLE "VideoEntity" ADD CONSTRAINT "VideoEntity_videoFragmentId_fkey" FOREIGN KEY ("videoFragmentId") REFERENCES "VideoFragment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoFragment" ADD CONSTRAINT "VideoFragment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "VideoProject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AudoEntity" ADD CONSTRAINT "AudoEntity_audoFragmentId_fkey" FOREIGN KEY ("audoFragmentId") REFERENCES "AudoFragment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AudoFragment" ADD CONSTRAINT "AudoFragment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "VideoProject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
