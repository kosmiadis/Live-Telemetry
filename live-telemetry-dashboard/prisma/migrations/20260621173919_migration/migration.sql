/*
  Warnings:

  - Added the required column `averageBatteryTemp` to the `VehiclePerformance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VehiclePerformance" ADD COLUMN     "averageBatteryTemp" INTEGER NOT NULL;
