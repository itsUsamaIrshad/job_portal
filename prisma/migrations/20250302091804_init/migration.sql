/*
  Warnings:

  - Made the column `resume` on table `Application` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "resume" SET NOT NULL;
