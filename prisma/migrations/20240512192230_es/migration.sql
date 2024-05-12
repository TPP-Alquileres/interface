/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Contract` DROP FOREIGN KEY `Contract_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `Contract` DROP FOREIGN KEY `Contract_tenantId_fkey`;

-- AlterTable
ALTER TABLE `Contract` MODIFY `ownerId` VARCHAR(191) NOT NULL,
    MODIFY `tenantId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Contract` ADD CONSTRAINT `Contract_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contract` ADD CONSTRAINT `Contract_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
