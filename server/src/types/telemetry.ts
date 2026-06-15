export interface TelemetryData {
  timestamp: number;
  vehicleId: number;
  speed: number;
  rpm: number;
  throttle: number;
  batteryTemp: number;
  batterySOC: number;
  voltage: number;
}