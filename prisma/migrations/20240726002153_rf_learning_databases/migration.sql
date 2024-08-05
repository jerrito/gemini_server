/*
  Warnings:

  - You are about to drop the column `data` on the `learning` table. All the data in the column will be lost.
  - You are about to drop the column `extension` on the `learning` table. All the data in the column will be lost.
  - You are about to drop the column `pages` on the `learning` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `learning` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `learning` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `learning` table. All the data in the column will be lost.
  - You are about to drop the `dataGenerated` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `adminId` to the `learning` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "dataGenerated" DROP CONSTRAINT "dataGenerated_userId_fkey";

-- DropForeignKey
ALTER TABLE "learning" DROP CONSTRAINT "learning_userId_fkey";

-- AlterTable
ALTER TABLE "learning" DROP COLUMN "data",
DROP COLUMN "extension",
DROP COLUMN "pages",
DROP COLUMN "title",
DROP COLUMN "url",
DROP COLUMN "userId",
ADD COLUMN     "adminId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "dataGenerated";

-- CreateTable
CREATE TABLE "learning_link" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "hasExpired" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "learning_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "learning_resource" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT,
    "pages" INTEGER DEFAULT 0,
    "title" TEXT NOT NULL,
    "extension" TEXT DEFAULT '.txt',
    "data" TEXT,
    "learningId" INTEGER NOT NULL,

    CONSTRAINT "learning_resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_generated" (
    "id" SERIAL NOT NULL,
    "data" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "hasImage" BOOLEAN NOT NULL DEFAULT false,
    "dataImage" TEXT,
    "dateTime" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "data_generated_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "learning_link_link_key" ON "learning_link"("link");

-- AddForeignKey
ALTER TABLE "learning_link" ADD CONSTRAINT "learning_link_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning" ADD CONSTRAINT "learning_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_resource" ADD CONSTRAINT "learning_resource_learningId_fkey" FOREIGN KEY ("learningId") REFERENCES "learning"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_generated" ADD CONSTRAINT "data_generated_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
