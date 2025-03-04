/*
  Warnings:

  - You are about to drop the column `coverLetter` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `jobId` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `postedById` on the `Job` table. All the data in the column will be lost.
  - Added the required column `cover_letter` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `job_id` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posted_by` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_jobId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_userId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_postedById_fkey";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "coverLetter",
DROP COLUMN "jobId",
DROP COLUMN "userId",
ADD COLUMN     "cover_letter" TEXT NOT NULL,
ADD COLUMN     "job_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'pending';

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "postedById",
ADD COLUMN     "posted_by" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'user';

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_posted_by_fkey" FOREIGN KEY ("posted_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
