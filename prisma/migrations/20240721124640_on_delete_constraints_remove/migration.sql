-- DropForeignKey
ALTER TABLE "blacklisted_tokens" DROP CONSTRAINT "blacklisted_tokens_userId_fkey";

-- DropForeignKey
ALTER TABLE "dataGenerated" DROP CONSTRAINT "dataGenerated_userId_fkey";

-- AlterTable
ALTER TABLE "dataGenerated" ALTER COLUMN "dateTime" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "blacklisted_tokens" ADD CONSTRAINT "blacklisted_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dataGenerated" ADD CONSTRAINT "dataGenerated_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
