'use client';

import { TelemetryData } from "@/types/telemetry";
import { useState, useEffect } from "react";
import TelemetryDashboard from "./components/VehicleTelemetryStream";

export default function VehicleDataPage () {

    //fetch vehicle static data name, created_at, max_speed etc. 

    const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<null | Error>(null);

    useEffect(() => {
        //initialize a new web socket connection
        const socket = new WebSocket('ws://localhost:8080');

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
            setError(new Error('Something went wrong while trying to connect to vehicle'))
        }
    
        //cleanup function so that the socket connection closes after refresh or exit
        return () => socket.close();
    }, [])
    
    if (!isConnected) {
        return <div>
            Connecting to Telemetry Stream...
        </div>
    }
    if (error && isConnected) throw error;

    if (isConnected && !telemetry) {
        return <div>
            Something went wrong please try again later
        </div>
    }

    // return <div>
    //   {(isConnected && telemetry) ? (
    //     <p>Speed: {telemetry.speed} km/h | RPM: {telemetry.rpm}</p>
    //   ) : (
    //     <p>Connecting to Telemetry Stream...</p>
    //   )}
    // </div>

    return <TelemetryDashboard />
}

