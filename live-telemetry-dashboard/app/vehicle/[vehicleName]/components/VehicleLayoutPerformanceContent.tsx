'use client';

import { VehiclePerformanceType, VehicleType } from "@/types/vehicle";
import { Gauge, Orbit, Thermometer, Zap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useVehicleDataStream } from "../hooks/useVehicleDataStream";

export default function VehicleLayoutPerformanceContent ({ vehicle }: { vehicle: Omit<VehicleType, 'timestamps'>}) {
  
    const { data, metadata: { isConnectedToStream } } = useVehicleDataStream();

    const vehiclePerformance = vehicle.vehiclePerformance as VehiclePerformanceType;

    const stats = [
    {
      title: "Speed",
      avg: isConnectedToStream ? data.averageSpeed : vehiclePerformance?.averageSpeed != null ? `${vehiclePerformance.averageSpeed} km/h` : 'Untracked',
      max: isConnectedToStream ? data.maxSpeed : vehiclePerformance?.maxSpeed != null ? `${vehiclePerformance.maxSpeed} km/h` : 'Untracked',
      icon: <Gauge className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Motor RPM",
      avg: isConnectedToStream ? data.averageRpm : vehiclePerformance?.averageRpm != null ? `${vehiclePerformance.averageRpm} rpm` : 'Untracked',
      max: isConnectedToStream ? data.maxRpm: vehiclePerformance?.maxRpm != null ? `${vehiclePerformance.maxRpm} rpm` : 'Untracked',
      icon: <Orbit className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Throttle Position",
      avg: isConnectedToStream ? data.averageThrottle : vehiclePerformance?.averageThrottle != null ? `${vehiclePerformance.averageThrottle}%` : 'Untracked',
      max: isConnectedToStream ? data.maxThrottle : vehiclePerformance?.maxThrottle != null ? `${vehiclePerformance.maxThrottle}%` : 'Untracked',
      icon: <Zap className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Battery Temp",
      max: isConnectedToStream ? data.maxBatteryTemp : vehiclePerformance?.maxBatteryTemp != null ? `${vehiclePerformance.maxBatteryTemp} °C`: 'Untracked',
      avg: isConnectedToStream ? data.averageBatteryTemp : vehiclePerformance?.averageBatteryTemp != null ? `${vehiclePerformance.averageBatteryTemp} °C`: 'Untracked',
      icon: <Thermometer className="h-4 w-4 text-muted-foreground" />,
    },
  ];
    
    return <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
      {stats.map((stat, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            {(
              !stat?.avg ? <div className="text-xl font-bold">
                {stat?.avg}
              </div> : 
              <div className="text-xl font-bold">Avg: {stat.avg}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {!stat?.max ? <span className="text-xl font-bold">
                {stat?.max}
              </span> : 
              <span className="text-xl font-bold">Max: {stat.max}</span>}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>



}