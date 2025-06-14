-- CreateEnum
CREATE TYPE "VoteStatus" AS ENUM ('SCHEDULED', 'ONGOING', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Election" ADD COLUMN     "status" "VoteStatus" NOT NULL DEFAULT 'SCHEDULED';
