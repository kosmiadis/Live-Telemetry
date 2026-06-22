type timestamps = {
    createdAt: Date;
    updatedAt: Date;
    deletedAt: null | Date;
}

export type VehiclePerformanceType = {
    vehiclePerformance: number;
    maxSpeed: number | null;
    averageSpeed: number | null;
    maxRpm: number | null;
    averageRpm: number | null;
    maxThrottle: number | null;
    averageThrottle: number | null;
    maxBatteryTemp: number | null;
    averageBatteryTemp: number | null;
}

export type VehicleType = {
    id: number;
    vehicleName: string;
    vehicleStats: {
        vehicleId: number;
        color: string | null;
        weight: number | null; 
        batteryVoltage: number | null;   
    } | null;
    vehiclePerformance: VehiclePerformanceType | null;
} & timestamps;