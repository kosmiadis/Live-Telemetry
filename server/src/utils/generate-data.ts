//@ts-ignore
import type { TelemetryData } from '@types/telemetry.js'


//in a real application the data will be sent directly from the CAN BUS of the vehicle and 
//not randomly generated

export function generateData (): TelemetryData {
    const data: TelemetryData = {
        vehicleId: 1,
        speed: Math.floor(Math.random() * 255),
        rpm: Math.floor(Math.random() * 10000),
        batterySOC: 90,
        batteryTemp: 45.3,
        throttle: Math.floor(Math.random() * 100),
        voltage: Math.floor(400.25 * 100),
        timestamp: (Date.now() & 0xFFFFFFFF) >>> 0
    }

    return data;
}