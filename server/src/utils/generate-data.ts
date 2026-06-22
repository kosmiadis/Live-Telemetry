//@ts-ignore
import type { TelemetryData } from '@types/telemetry.js'


//in a real application the data will be sent directly from the CAN BUS of the vehicle and 
//not randomly generated

export function generateData (): TelemetryData {
    const data: TelemetryData = {
        vehicleId: 1,
        speed: Math.floor(120 + Math.random() * 50),
        rpm: Math.floor(5000 + Math.random() * 1000),
        batterySOC: Math.floor(60 + Math.random() * 10), 
        batteryTemp: Math.floor(45 + Math.random() * 20), 
        throttle: Math.floor(Math.random() * 100),
        voltage: Math.floor(400 * 100),
        timestamp: (Date.now() & 0xFFFFFFFF) >>> 0
    }

    return data;
}