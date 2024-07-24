/*
  Warnings:

  - The `data` column on the `LearningTable` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `subject` column on the `admin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `adminId` on the `user` table. All the data in the column will be lost.
  - Added the required column `userId` to the `LearningTable` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Subject" AS ENUM ('English', 'Mathematics', 'Science', 'Computing');

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_adminId_fkey";

-- AlterTable
ALTER TABLE "LearningTable" ADD COLUMN     "userId" INTEGER NOT NULL,
DROP COLUMN "data",
ADD COLUMN     "data" TEXT[];

-- AlterTable
ALTER TABLE "admin" ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "studentCount" DROP NOT NULL,
ALTER COLUMN "studentCount" SET DEFAULT 0,
DROP COLUMN "subject",
ADD COLUMN     "subject" "Subject" NOT NULL DEFAULT 'English';

-- AlterTable
ALTER TABLE "user" DROP COLUMN "adminId";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "_AdminToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AdminToUser_AB_unique" ON "_AdminToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AdminToUser_B_index" ON "_AdminToUser"("B");

-- AddForeignKey
ALTER TABLE "assessment" ADD CONSTRAINT "assessment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningTable" ADD CONSTRAINT "LearningTable_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminToUser" ADD CONSTRAINT "_AdminToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminToUser" ADD CONSTRAINT "_AdminToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
