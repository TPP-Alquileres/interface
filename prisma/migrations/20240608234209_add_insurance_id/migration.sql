/*
  Warnings:

  - Added the required column `insuranceId` to the `Contract` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Contract` ADD COLUMN `insuranceId` VARCHAR(191) NOT NULL;
