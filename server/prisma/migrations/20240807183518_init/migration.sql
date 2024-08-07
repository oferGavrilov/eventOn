/*
  Warnings:

  - The values [Planned] on the enum `EventStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [Pending] on the enum `TaskStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `eventId` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `forgotPasswordExpiresAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `forgotPasswordToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verificationToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verificationTokenExpiresAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `FullName` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EventStatus_new" AS ENUM ('InProgress', 'Completed', 'Cancelled');
ALTER TABLE "Event" ALTER COLUMN "status" TYPE "EventStatus_new" USING ("status"::text::"EventStatus_new");
ALTER TYPE "EventStatus" RENAME TO "EventStatus_old";
ALTER TYPE "EventStatus_new" RENAME TO "EventStatus";
DROP TYPE "EventStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TaskStatus_new" AS ENUM ('NotCompleted', 'InProgress', 'Completed');
ALTER TABLE "Task" ALTER COLUMN "status" TYPE "TaskStatus_new" USING ("status"::text::"TaskStatus_new");
ALTER TYPE "TaskStatus" RENAME TO "TaskStatus_old";
ALTER TYPE "TaskStatus_new" RENAME TO "TaskStatus";
DROP TYPE "TaskStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_eventId_fkey";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "eventId",
ADD COLUMN     "FullName" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Supplier" DROP COLUMN "images",
ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "forgotPasswordExpiresAt",
DROP COLUMN "forgotPasswordToken",
DROP COLUMN "isVerified",
DROP COLUMN "verificationToken",
DROP COLUMN "verificationTokenExpiresAt";
