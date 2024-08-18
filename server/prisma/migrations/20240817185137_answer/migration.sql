/*
  Warnings:

  - Made the column `type` on table `post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `post` MODIFY `type` VARCHAR(255) NOT NULL;
