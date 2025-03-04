/*
  Warnings:

  - You are about to drop the column `email` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `jobTitle` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `Application` table. All the data in the column will be lost.
  - Added the required column `name` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Made the column `postedById` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_jobId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_postedById_fkey";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "email",
DROP COLUMN "jobTitle",
DROP COLUMN "userName",
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "salary" SET DATA TYPE TEXT,
ALTER COLUMN "postedById" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
