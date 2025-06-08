/*
  Warnings:

  - You are about to drop the column `isrevoked` on the `RefreshToken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RefreshToken" DROP COLUMN "isrevoked",
ADD COLUMN     "isRevoked" BOOLEAN NOT NULL DEFAULT false;
