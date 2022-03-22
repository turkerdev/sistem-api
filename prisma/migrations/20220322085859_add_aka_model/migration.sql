-- CreateTable
CREATE TABLE "Aka" (
    "id" TEXT NOT NULL,
    "short" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validUntil" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Aka_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AkaDetails" (
    "id" TEXT NOT NULL,
    "clickedBy" TEXT NOT NULL,
    "clickedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "AkaId" TEXT NOT NULL,

    CONSTRAINT "AkaDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AkaDetails" ADD CONSTRAINT "AkaDetails_AkaId_fkey" FOREIGN KEY ("AkaId") REFERENCES "Aka"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
