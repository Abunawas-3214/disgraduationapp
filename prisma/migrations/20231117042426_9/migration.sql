/*
  Warnings:

  - The primary key for the `campus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `campus` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Campus` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `jobs` DROP FOREIGN KEY `Jobs_campusId_fkey`;

-- AlterTable
ALTER TABLE `campus` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Campus_name_key` ON `Campus`(`name`);

-- AddForeignKey
ALTER TABLE `Jobs` ADD CONSTRAINT `Jobs_campusId_fkey` FOREIGN KEY (`campusId`) REFERENCES `Campus`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
