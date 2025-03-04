/*
  Warnings:

  - You are about to drop the column `posted_by` on the `Job` table. All the data in the column will be lost.
  - Added the required column `postedById` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `salary` on the `Job` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_posted_by_fkey";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "posted_by",
ADD COLUMN     "postedById" INTEGER NOT NULL,
DROP COLUMN "salary",
ADD COLUMN     "salary" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
