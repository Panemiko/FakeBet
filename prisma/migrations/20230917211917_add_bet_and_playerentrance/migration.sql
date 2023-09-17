/*
  Warnings:

  - You are about to drop the column `currentRoomId` on the `player` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Player_currentRoomId_idx` ON `player`;

-- AlterTable
ALTER TABLE `player` DROP COLUMN `currentRoomId`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `weekCurrency` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `room` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `Bet` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `value` INTEGER NOT NULL,
    `playerId` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,

    INDEX `Bet_roomId_idx`(`roomId`),
    INDEX `Bet_playerId_idx`(`playerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayerEntrance` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `playerId` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,

    INDEX `PlayerEntrance_roomId_idx`(`roomId`),
    INDEX `PlayerEntrance_playerId_idx`(`playerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
