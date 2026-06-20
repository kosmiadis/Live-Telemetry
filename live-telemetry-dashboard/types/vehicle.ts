type timestamps = {
    createdAt: Date;
    updatedAt: Date;
    deletedAt: null | Date;
}

export type VehiclePerformanceType = {
    maxSpeed: number | null;
    averageSpeed: number | null;
    maxRpm: number | null;
    averageRpm: number | null;
    maxThrottle: number | null;
    averageThrottle: number | null;
    maxBatteryTemp: number | null;
}

export type VehicleType = {
    id: number;
    vehicleName: string;
    vehicleStats: {
        color: string | null;
        weight: string | null; 
        batteryVoltage: number | null;   
    };
    vehiclePerformance: VehiclePerformanceType;
} & timestamps;