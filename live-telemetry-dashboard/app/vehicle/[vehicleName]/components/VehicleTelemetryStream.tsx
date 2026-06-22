'use client';

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { H2, Muted } from "@/components/ui/typography";
import { WifiOff, Radio, Activity, Zap, Thermometer, Battery, BatteryWarning, BatteryLow } from "lucide-react";
import { useVehicleDataStream } from "../hooks/useVehicleDataStream";
import { Skeleton } from "@/components/ui/skeleton";

//in the future replace with vehicleId instead of vehicleName

export default function VehicleTelemetryStream () {
    const { data, metadata, setShouldConnectToStream, error } = useVehicleDataStream();
    const {shouldConnectToStream, isConnectedToStream, isConnecting } = metadata;

    if (error) return (
      <div className="flex flex-col items-center justify-center text-center p-6 space-y-4">
        <div className="p-3 bg-destructive/10 rounded-full animate-bounce">
          <WifiOff className="h-12 w-12 text-destructive" />
        </div>
        <div className="space-y-2 max-w-md">
          <H2>Stream Connection Failed</H2>
          <Muted>
            {error.message || "Something went wrong while establishing handshake with the telemetry server. Please ensure the vehicle's telemetry module is online."}
          </Muted>
        </div>
        <div className="flex gap-3 pt-2">
          <Button 
            size="lg" 
            variant="default"
            onClick={() => {
              setShouldConnectToStream(false);
              setTimeout(() => setShouldConnectToStream(true), 100);
            }} 
            className="px-8"
          >
            Retry Connection
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => setShouldConnectToStream(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    );

    if (!shouldConnectToStream) return <div className="flex flex-col items-center justify-center text-center p-6 space-y-4">
          <WifiOff className="h-12 w-12 text-muted-foreground" />
          <div className="space-y-2">
            <H2>Real-Time Data Tracking</H2>
            <Muted>Connect to the vehicle's WebSocket stream to receive live telemetry updates.</Muted>
          </div>
          <Button size="lg" onClick={() => setShouldConnectToStream(true)} className="px-8">
            Connect Live Stream
          </Button>
    </div>

    if (isConnecting) {
      return <div className="flex flex-col gap-4 animate-pulse">
        
        {/* Top Status Bar Skeleton */}
        <div className="w-full flex flex-row items-center justify-between p-6 border rounded-lg bg-card shadow-sm">
          <div className="flex items-center gap-3">
            <Skeleton className="h-3 w-3 rounded-full bg-amber-400/50" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-36 mt-1" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-28 mt-1" />
            </CardContent>
          </Card>
          <Card className="md:row-span-2 flex flex-col justify-between h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-2 w-full rounded-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-9 w-24 mt-1" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-9 w-24 mt-1" />
            </CardContent>
          </Card>

        </div>
      </div>
    }


    return <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 items-center justify-between">
        <div className="w-full flex flex-row items-center justify-between p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isConnectedToStream ? 'bg-green-400' : 'bg-amber-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isConnectedToStream ? 'bg-green-500' : 'bg-amber-500'}`}></span>
            </span>
            <div className="flex flex-col">
              <span className="font-medium text-sm">
                {isConnectedToStream ? "Connected to Stream" : "Connecting to WebSocket..."}
              </span>
              <Muted>
                {isConnectedToStream ? "Receiving live telemetry packets" : "Establishing handshake"}
              </Muted>
            </div>
          </div>
          
          <Button variant="outline" size="sm" onClick={() => setShouldConnectToStream(false)}>
            Disconnect
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">Live Speed</CardTitle>
            <Activity className="h-4 w-4 text-green-500 animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black tracking-tight text-green-600 dark:text-red-500">
              {data.speed} <span className="text-lg font-normal text-muted-foreground">km/h</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">Live Motor RPM</CardTitle>
            <Radio className="h-4 w-4 text-blue-500 animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black tracking-tight text-red-600 dark:text-red-400">
              {data.rpm!} <span className="text-lg font-normal text-muted-foreground">rpm</span>
            </div>
          </CardContent>
        </Card>

        <Card className="md:row-span-2 border-primary/20 flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">State of Charge (SoC)</CardTitle>
            {data.batterySOC! > 50 ? (
              <Battery className="h-4 w-4 text-green-500" />
            ) : data.batterySOC! > 20 ? (
              <BatteryWarning className="h-4 w-4 text-amber-500" />
            ) : (
              <BatteryLow className="h-4 w-4 text-destructive animate-pulse" />
            )}
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-black tracking-tight">
              {data.batterySOC!} <span className="text-sm font-normal text-muted-foreground">%</span>
            </div>
            
            <Progress 
              value={data.batterySOC!} 
              className="h-2"
              style={{
                color: data.batterySOC! <= 20 ? 'var(--destructive)' : 'var(--primary)'
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">Battery Voltage</CardTitle>
            <Zap className="h-4 w-4 text-amber-500 animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black tracking-tight text-amber-600 dark:text-amber-400">
              {data.voltage!} <span className="text-sm font-normal text-muted-foreground">V</span>
            </div>
          </CardContent>
        </Card>

        <Card className={`border-destructive/20  ${data.batteryTemp! > 50 ? 'ring-2 ring-destructive animate-pulse' : ''}`}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">Battery Temp</CardTitle>
            <Thermometer className={`h-4 w-4 ${data.batteryTemp! > 50 ? 'text-destructive' : 'text-muted-foreground'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-black tracking-tight ${data.batteryTemp! > 50 ? 'text-destructive' : 'text-foreground'}`}>
              {data.batteryTemp!} <span className="text-sm font-normal text-muted-foreground">°C</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
}