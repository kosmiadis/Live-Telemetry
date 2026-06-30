import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function seedDB () {
  await prisma.vehicle.deleteMany();

  await prisma.vehicle.create({
    data: {
      vehicleName: "Kart26",
      vehicleStats: {
        create: {
          color: 'Black',
          weight: 180,
          batteryVoltage: 48,
        },
      },
      vehiclePerformance: {
        create: {
          maxSpeed: 85,
          averageSpeed: 45,
          maxRpm: 6000,
          averageRpm: 3500,
          maxThrottle: 100,
          averageThrottle: 60,
          averageBatteryTemp: 50,
          maxBatteryTemp: 42,
        },
      },
    },
  });

  await prisma.vehicle.create({
    data: {
      vehicleName: "NeuralRover",
      vehicleStats: {
        create: {
          color: 'Grey',
          weight: 85,
          batteryVoltage: 24,
        },
      },
      vehiclePerformance: {
        create: {
          maxSpeed: 15,
          averageSpeed: 5,
          maxRpm: 2500,
          averageRpm: 1200,
          maxThrottle: 80,
          averageThrottle: 30,
          maxBatteryTemp: 35,
          averageBatteryTemp: 39,
        },
      },
    },
  });

  await prisma.vehicle.create({
    data: {
      vehicleName: "DevDrive",
      vehicleStats: {
        create: {
          color: 'Blue',
          weight: 1500,
          batteryVoltage: 350,
        },
      },
      vehiclePerformance: {
        create: {
          maxSpeed: 180,
          averageSpeed: 90,
          maxRpm: 7000,
          averageRpm: 3000,
          maxThrottle: 100,
          averageThrottle: 40,
          maxBatteryTemp: 38,
          averageBatteryTemp: 57,
        },
      },
    },
  });
}

try {
    seedDB()
} catch (e) {
    console.log('something went wrong while seeding db');
}
