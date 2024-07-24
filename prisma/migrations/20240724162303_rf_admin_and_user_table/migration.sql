/*
  Warnings:

  - You are about to drop the `AdminExtraData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AdminExtraData" DROP CONSTRAINT "AdminExtraData_userId_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "profile" DROP NOT NULL,
ALTER COLUMN "isStudent" DROP NOT NULL,
ALTER COLUMN "role" DROP NOT NULL;

-- DropTable
DROP TABLE "AdminExtraData";

-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "isApproved" BOOLEAN DEFAULT false,
    "studentCount" INTEGER DEFAULT 0,
    "subject" "Subject" NOT NULL DEFAULT 'English',
    "userId" INTEGER NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_userId_key" ON "admin"("userId");

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
