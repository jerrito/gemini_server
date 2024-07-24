/*
  Warnings:

  - You are about to drop the `LearningTable` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AdminToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Admin');

-- DropForeignKey
ALTER TABLE "LearningTable" DROP CONSTRAINT "LearningTable_adminId_fkey";

-- DropForeignKey
ALTER TABLE "LearningTable" DROP CONSTRAINT "LearningTable_userId_fkey";

-- DropForeignKey
ALTER TABLE "_AdminToUser" DROP CONSTRAINT "_AdminToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_AdminToUser" DROP CONSTRAINT "_AdminToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "assessment" DROP CONSTRAINT "assessment_adminId_fkey";

-- DropForeignKey
ALTER TABLE "blacklisted_tokens" DROP CONSTRAINT "blacklisted_tokens_adminId_fkey";

-- DropForeignKey
ALTER TABLE "dataGenerated" DROP CONSTRAINT "dataGenerated_adminId_fkey";

-- AlterTable
ALTER TABLE "blacklisted_tokens" ALTER COLUMN "adminId" DROP DEFAULT;

-- DropTable
DROP TABLE "LearningTable";

-- DropTable
DROP TABLE "_AdminToUser";

-- DropTable
DROP TABLE "admin";

-- CreateTable
CREATE TABLE "AdminExtraData" (
    "id" SERIAL NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "studentCount" INTEGER DEFAULT 0,
    "subject" "Subject" NOT NULL DEFAULT 'English',
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AdminExtraData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "learning" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "data" TEXT[],
    "url" TEXT NOT NULL,
    "extension" TEXT NOT NULL DEFAULT '.txt',
    "pages" INTEGER DEFAULT 0,
    "adminId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "learning_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminExtraData_userId_key" ON "AdminExtraData"("userId");

-- AddForeignKey
ALTER TABLE "AdminExtraData" ADD CONSTRAINT "AdminExtraData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning" ADD CONSTRAINT "learning_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
