/*
  Warnings:

  - You are about to alter the column `status` on the `jobs` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(2))`.
  - You are about to alter the column `status` on the `jobs_done` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `jobs` MODIFY `whatsapp` VARCHAR(191) NOT NULL,
    MODIFY `drive` LONGTEXT NOT NULL,
    MODIFY `status` ENUM('ONGOING', 'DOING', 'DONE', 'COMPLETED') NOT NULL DEFAULT 'ONGOING';

-- AlterTable
ALTER TABLE `jobs_done` MODIFY `status` ENUM('ONGOING', 'DOING', 'DONE', 'COMPLETED') NOT NULL DEFAULT 'COMPLETED';
