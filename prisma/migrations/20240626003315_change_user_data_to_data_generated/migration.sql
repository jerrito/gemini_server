/*
  Warnings:

  - You are about to drop the `userData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "userData" DROP CONSTRAINT "userData_userId_fkey";

-- DropTable
DROP TABLE "userData";

-- CreateTable
CREATE TABLE "dataGenerated" (
    "id" SERIAL NOT NULL,
    "data" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "hasImage" BOOLEAN NOT NULL DEFAULT false,
    "dataImage" BYTEA,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "dataGenerated_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "dataGenerated" ADD CONSTRAINT "dataGenerated_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
