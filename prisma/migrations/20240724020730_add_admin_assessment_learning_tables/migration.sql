-- AlterTable
ALTER TABLE "blacklisted_tokens" ALTER COLUMN "adminId" SET DEFAULT 0,
ALTER COLUMN "adminId" DROP DEFAULT;
DROP SEQUENCE "blacklisted_tokens_adminId_seq";

-- AlterTable
ALTER TABLE "dataGenerated" ALTER COLUMN "adminId" SET DEFAULT 0,
ALTER COLUMN "adminId" DROP DEFAULT;
DROP SEQUENCE "dataGenerated_adminId_seq";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "adminId" SET DEFAULT 0,
ALTER COLUMN "adminId" DROP DEFAULT;
DROP SEQUENCE "user_adminId_seq";
