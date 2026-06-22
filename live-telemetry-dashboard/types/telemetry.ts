export interface TelemetryData {
  timestamp: number | null;
  vehicleId: number | null;
  speed: number | null;
  rpm: number | null;
  throttle: number | null;
  batteryTemp: number | null;
  batterySOC: number | null;
  voltage: number | null;
  averageSpeed: number | null;
  maxSpeed: number | null;
  averageRpm: number | null;
  maxRpm: number | null;
  averageThrottle: number | null;
  maxThrottle: number | null;
  averageBatteryTemp: number | null;
  maxBatteryTemp: number | null;
};