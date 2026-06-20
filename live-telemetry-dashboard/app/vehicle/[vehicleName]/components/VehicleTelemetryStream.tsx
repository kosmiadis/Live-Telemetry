'use client';

import { displayError } from "@/app/lib/sonner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { H2, Muted } from "@/components/ui/typography";
import { TelemetryData } from "@/types/telemetry";
import { WifiOff, Radio, Activity, Zap, Thermometer, Battery, BatteryWarning, BatteryLow } from "lucide-react";
import { useState, useEffect, } from "react";

export default function VehicleTelemetryStream () {
    //component reponsible for connecting to the websocket of the current vehicle
    //data stream

    //maybe store this value in a cookie so that in refresh the data stream keeps being open
    const [shouldConnect, setShouldConnect] = useState(false);
    
    const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<null | Error>(null);

    useEffect(() => {
      const socket = new WebSocket('ws://localhost:8080');

      if (shouldConnect) {
        //initialize a new web socket connection
        
        //when connection establishes setIsConnected to true
        socket.onopen = (e) => {
            //temp to check is connecting
            setIsConnected(true);
        }

        //when error occurs or the clients refreshes or closes the tab set the isConnected to false
        socket.onclose = (e) => {
            setIsConnected(false);
        }

        socket.binaryType = 'arraybuffer';

        socket.onmessage = (event: MessageEvent) => {
            const buffer: ArrayBuffer = event.data;

            //create DataView instance to read ArrayBuffer
            const view = new DataView(buffer);
            
            //parse data back to original form
            const data: TelemetryData = {
              vehicleId: view.getUint8(0),
              speed: view.getUint8(1),
              rpm: view.getUint16(2, false),
              throttle: view.getUint8(4),
              batterySOC: view.getUint8(5),
              voltage: view.getUint16(6, false) / 100, 
              batteryTemp: view.getFloat32(8, false),    
              timestamp: view.getUint32(12, false),
            };

            //set state with the received data
            //maybe in the future store the max speed max rpm and average speed and rpm analytics
            //*send request after page refresh or at tab close or when session is terminated
            //and switched to a different vehicle instead.
            
            setTelemetry(data);
        };

        socket.onerror = (error) => {
            displayError('Could not connect to live vehicle data stream');
            setError(new Error('Something went wrong while trying to connect to vehicle'))
            setShouldConnect(false);
        }

        //cleanup function so that the socket connection closes after refresh or exit
        
        return () => socket.close();
      }
      else {
        socket.close();
      }

    }, [shouldConnect, error])

    return <div className="space-y-6 mt-6">
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
      {!shouldConnect && (
        <div className="flex flex-col items-center justify-center text-center p-6 space-y-4">
          <WifiOff className="h-12 w-12 text-muted-foreground" />
          <div className="space-y-2">
            <H2>Real-Time Data Tracking</H2>
            <Muted>Connect to the vehicle's WebSocket stream to receive live telemetry updates.</Muted>
          </div>
          <Button size="lg" onClick={() => setShouldConnect(true)} className="px-8">
            Connect Live Stream
          </Button>
        </div>
      )}

      {(shouldConnect && !error) && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isConnected ? 'bg-green-400' : 'bg-amber-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isConnected ? 'bg-green-500' : 'bg-amber-500'}`}></span>
            </span>
            <div className="flex flex-col">
              <span className="font-medium text-sm">
                {isConnected ? "Connected to Stream" : "Connecting to WebSocket..."}
              </span>
              <Muted>
                {isConnected ? "Receiving live telemetry packets" : "Establishing handshake"}
              </Muted>
            </div>
          </div>
          
          <Button variant="outline" size="sm" onClick={() => setShouldConnect(false)}>
            Disconnect
          </Button>
        </div>
      )}
    </div>

    {(shouldConnect && isConnected && telemetry && (!error)) && (
      <div className="grid gap-4 md:grid-cols-2">

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">Live Speed</CardTitle>
            <Activity className="h-4 w-4 text-green-500 animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black tracking-tight text-green-600 dark:text-red-500">
              {telemetry.speed} <span className="text-lg font-normal text-muted-foreground">km/h</span>
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
              {telemetry.rpm} <span className="text-lg font-normal text-muted-foreground">rpm</span>
            </div>
          </CardContent>
        </Card>

        <Card className="md:row-span-2 border-primary/20 flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">State of Charge (SoC)</CardTitle>
            {telemetry.batterySOC > 50 ? (
              <Battery className="h-4 w-4 text-green-500" />
            ) : telemetry.batterySOC > 20 ? (
              <BatteryWarning className="h-4 w-4 text-amber-500" />
            ) : (
              <BatteryLow className="h-4 w-4 text-destructive animate-pulse" />
            )}
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-black tracking-tight">
              {telemetry.batterySOC} <span className="text-sm font-normal text-muted-foreground">%</span>
            </div>
            
            <Progress 
              value={telemetry.batterySOC} 
              className="h-2"
              style={{
                color: telemetry.batterySOC <= 20 ? 'var(--destructive)' : 'var(--primary)'
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
              {telemetry.voltage} <span className="text-sm font-normal text-muted-foreground">V</span>
            </div>
          </CardContent>
        </Card>

        <Card className={`border-destructive/20  ${telemetry.batteryTemp > 50 ? 'ring-2 ring-destructive animate-pulse' : ''}`}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">Battery Temp</CardTitle>
            <Thermometer className={`h-4 w-4 ${telemetry.batteryTemp > 50 ? 'text-destructive' : 'text-muted-foreground'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-black tracking-tight ${telemetry.batteryTemp > 50 ? 'text-destructive' : 'text-foreground'}`}>
              {telemetry.batteryTemp} <span className="text-sm font-normal text-muted-foreground">°C</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )}
  </div>
}