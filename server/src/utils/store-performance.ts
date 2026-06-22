import type { VehicleStreamBinaryDataContextI } from "../server.js";

export async function storePerformance (staticPerformanceData: VehicleStreamBinaryDataContextI, vehicleId: number) {
    //update the db with the staticPerformanceData that has collected while the vehicle was sending data

    const updates = {
        averageSpeed:staticPerformanceData.averageSpeed,
        maxSpeed: staticPerformanceData.maxSpeed,
        averageBatteryTemp: staticPerformanceData.averageBatteryTemp,
        averageRpm: staticPerformanceData.averageRpm,
        averageThrottle: staticPerformanceData.averageThrottle,
        maxBatteryTemp: staticPerformanceData.maxBatteryTemp ,
        maxRpm: staticPerformanceData.maxRpm,
        maxThrottle: staticPerformanceData.maxThrottle,
    };
    try {
        //fetch stored vehicle performance data to initialize staticPerformanceData
        await fetch('http://localhost:3000/api/vehicle/performance?vehicleId='+vehicleId, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ vehiclePerformanceUpdates: updates })
        })
    } catch (e: any) {
        console.log(e.message);
    }
}