type timestamps = {
    createdAt: Date;
    updatedAt: Date;
    deletedAt: null | Date;
}

export type VehiclePerformanceType = {
    maxSpeed: number;
    averageSpeed: number;
    maxRpm: number;
    averageRpm: number;
    maxThrottle: number;
    averageThrottle: number;
    maxBatteryTemp: number;
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