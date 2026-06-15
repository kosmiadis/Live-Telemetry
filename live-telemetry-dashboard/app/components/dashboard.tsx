'use client';
import { useEffect, useState } from "react"
import type { TelemetryData } from "@/types/telemetry";

export default function Dashboard () {

    const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        //initialize a new web socket connection
        const socket = new WebSocket('ws://localhost:8080');

        //when connection establishes setIsConnected to true
        socket.onopen = (e) => {
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
              speed:     view.getUint8(1),
              rpm:       view.getUint16(2, false),
              throttle:  view.getUint8(4),
              batterySOC:view.getUint8(5),
              voltage:   view.getUint16(6, false) / 100, 
              batteryTemp: view.getFloat32(8, false),    
              timestamp: view.getUint32(12, false),
            };

            //set state with the received data
            setTelemetry(data);
        };

        socket.onerror = (error) => {
            console.error('WebSocket Error:', error);
        }
    
        //cleanup function so that the socket connection closes after refresh or exit
        return () => socket.close();
    }, [])

    if (!isConnected) {
        return <div>
            Connecting to Telemetry Stream...
        </div>
    }

    if (isConnected && !telemetry) {
        return <div>
            Something went wrong please try again later
        </div>
    }

    return <div>
      {(isConnected && telemetry) ? (
        <p>Speed: {telemetry.speed} km/h | RPM: {telemetry.rpm}</p>
      ) : (
        <p>Connecting to Telemetry Stream...</p>
      )}
    </div>
}