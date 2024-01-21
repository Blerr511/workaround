-- CreateTable
CREATE TABLE "Upload" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "objectId" TEXT NOT NULL,
    "storageClass" TEXT NOT NULL,
    "directory" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Upload_pkey" PRIMARY KEY ("id")
);
