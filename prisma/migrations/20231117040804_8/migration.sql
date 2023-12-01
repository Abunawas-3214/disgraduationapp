/*
  Warnings:

  - You are about to drop the column `campus` on the `jobs` table. All the data in the column will be lost.
  - Added the required column `campusId` to the `Jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `jobs` DROP COLUMN `campus`,
    ADD COLUMN `campusId` VARCHAR(191) NOT NULL,
    MODIFY `drive` LONGTEXT NULL;

-- CreateTable
CREATE TABLE `Campus` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Jobs` ADD CONSTRAINT `Jobs_campusId_fkey` FOREIGN KEY (`campusId`) REFERENCES `Campus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
