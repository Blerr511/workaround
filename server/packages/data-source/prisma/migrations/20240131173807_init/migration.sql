-- CreateEnum
CREATE TYPE "FragmentType" AS ENUM ('VIDEO', 'IMAGE', 'TEXT');

-- CreateTable
CREATE TABLE "Fragment" (
    "id" SERIAL NOT NULL,
    "type" "FragmentType" NOT NULL,
    "path" TEXT NOT NULL,
    "videoFragmentId" INTEGER,
    "duration" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Fragment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FragmentLine" (
    "id" SERIAL NOT NULL,
    "type" "FragmentType" NOT NULL,
    "start" DOUBLE PRECISION,
    "end" DOUBLE PRECISION,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "FragmentLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoProject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "VideoProject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fragment_videoFragmentId_order_key" ON "Fragment"("videoFragmentId", "order");

-- AddForeignKey
ALTER TABLE "Fragment" ADD CONSTRAINT "Fragment_videoFragmentId_fkey" FOREIGN KEY ("videoFragmentId") REFERENCES "FragmentLine"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FragmentLine" ADD CONSTRAINT "FragmentLine_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "VideoProject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
