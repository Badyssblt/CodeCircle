/*
  Warnings:

  - Added the required column `is_accepted` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `answer` ADD COLUMN `is_accepted` BOOLEAN NOT NULL;
