/*
  Warnings:

  - You are about to drop the column `adminId` on the `assessment` table. All the data in the column will be lost.
  - You are about to drop the column `adminId` on the `blacklisted_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `adminId` on the `dataGenerated` table. All the data in the column will be lost.
  - You are about to drop the column `adminId` on the `learning` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "assessment" DROP COLUMN "adminId";

-- AlterTable
ALTER TABLE "blacklisted_tokens" DROP COLUMN "adminId";

-- AlterTable
ALTER TABLE "dataGenerated" DROP COLUMN "adminId";

-- AlterTable
ALTER TABLE "learning" DROP COLUMN "adminId";
