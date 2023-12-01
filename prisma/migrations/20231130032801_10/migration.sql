/*
  Warnings:

  - You are about to drop the column `campus` on the `jobs_done` table. All the data in the column will be lost.
  - Added the required column `campusId` to the `Jobs_Done` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `jobs_done` DROP COLUMN `campus`,
    ADD COLUMN `campusId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Jobs_Done` ADD CONSTRAINT `Jobs_Done_campusId_fkey` FOREIGN KEY (`campusId`) REFERENCES `Campus`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
