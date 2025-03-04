/*
  Warnings:

  - You are about to drop the column `city` on the `Job` table. All the data in the column will be lost.
  - Added the required column `company` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "city",
ADD COLUMN     "company" TEXT NOT NULL;
