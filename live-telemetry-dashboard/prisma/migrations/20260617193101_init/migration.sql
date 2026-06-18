-- CreateTable
CREATE TABLE "VehicleStats" (
    "vehicleStatsId" SERIAL NOT NULL,
    "color" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "batteryVoltage" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,

    CONSTRAINT "VehicleStats_pkey" PRIMARY KEY ("vehicleStatsId")
);

-- CreateTable
CREATE TABLE "VehiclePerformance" (
    "vehiclePerformance" SERIAL NOT NULL,
    "maxSpeed" INTEGER NOT NULL,
    "averageSpeed" INTEGER NOT NULL,
    "maxRpm" INTEGER NOT NULL,
    "averageRpm" INTEGER NOT NULL,
    "maxThrottle" INTEGER NOT NULL,
    "averageThrottle" INTEGER NOT NULL,
    "maxBatteryTemp" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,

    CONSTRAINT "VehiclePerformance_pkey" PRIMARY KEY ("vehiclePerformance")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "vehicleName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VehicleStats_vehicleId_key" ON "VehicleStats"("vehicleId");

-- CreateIndex
CREATE UNIQUE INDEX "VehiclePerformance_vehicleId_key" ON "VehiclePerformance"("vehicleId");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_vehicleName_key" ON "Vehicle"("vehicleName");

-- AddForeignKey
ALTER TABLE "VehicleStats" ADD CONSTRAINT "VehicleStats_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehiclePerformance" ADD CONSTRAINT "VehiclePerformance_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
