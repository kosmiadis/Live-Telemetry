'use client';

import { displayError } from "@/app/lib/sonner";
import { TelemetryData } from "@/types/telemetry";
import { createContext, ReactNode, useEffect, useState } from "react";

type StreamConnectionMetadataType = {
    shouldConnectToStream: boolean;
    isConnectedToStream: boolean;
    isConnecting: boolean;
}
export const StreamDataCtx = createContext<{data: TelemetryData, metadata: StreamConnectionMetadataType, setShouldConnectToStream: (value: boolean) => void, error: any}>({
    data: {
        speed: null,
        batterySOC: null,
        batteryTemp: null,
        rpm: null,
        throttle: null,
        timestamp: null,
        vehicleId: null,
        voltage: null,
        averageSpeed: null,
        averageBatteryTemp: null,
        averageRpm: null,
        averageThrottle: null,
        maxBatteryTemp: null,
        maxRpm: null,
        maxSpeed: null,
        maxThrottle: null,
    },
    metadata: {
        isConnectedToStream: false,
        shouldConnectToStream: false,
        isConnecting: false,
    },
    setShouldConnectToStream: () => {},
    error: null
})

export default function VehicleStreamBinaryDataProvider ({ vehicleName, children }: { vehicleName: string, children: ReactNode }) {
    const [binaryData, setBinaryData] = useState<TelemetryData>({
        speed: null,
        batterySOC: null,
        batteryTemp: null,
        rpm: null,
        throttle: null,
        timestamp: null,
        vehicleId: null,
        voltage: null,
        averageSpeed: null,
        averageBatteryTemp: null,
        averageRpm: null,
        averageThrottle: null,
        maxBatteryTemp: null,
        maxRpm: null,
        maxSpeed: null,
        maxThrottle: null,
    });

    const [connectionData, setConnectionData] = useState<StreamConnectionMetadataType>({
        isConnectedToStream: false,
        shouldConnectToStream: false,
        isConnecting: true,
    })

    const [error, setError] = useState<null | any>(null);

    function setShouldConnectToStream (value: boolean) {
        setConnectionData({
            shouldConnectToStream: value,
            isConnectedToStream: connectionData.isConnectedToStream,
            isConnecting: value
        })
    }

    useEffect(() => {
        if (connectionData.shouldConnectToStream) {
            //initialize a new web socket connection
            const socket = new WebSocket('ws://localhost:8080');

            //when connection establishes setIsConnected to true
            socket.onopen = (e) => {
                socket.send(vehicleName);
                //socket is connecting still connecting to get live data (isConnecting: true)
                setConnectionData({
                    isConnectedToStream: true,
                    shouldConnectToStream: true,
                    isConnecting: true
                })
            }

            //when error occurs or the clients refreshes or closes the tab set the isConnected to false
            socket.onclose = (e) => {
                console.log(e)
                setConnectionData({
                    isConnectedToStream: false,
                    shouldConnectToStream: false,
                    isConnecting: false,
                })
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
                averageSpeed: view.getUint8(16),
                maxSpeed: view.getUint8(17),
                averageRpm: view.getUint16(18, false),
                maxRpm: view.getUint16(20, false),
                averageThrottle: view.getUint8(22),
                maxThrottle: view.getUint8(23),
                averageBatteryTemp: view.getFloat32(24, false),
                maxBatteryTemp: view.getFloat32(28, false),
            };
            
            setBinaryData({...data});
            
            if (connectionData.isConnecting) {
                setConnectionData({
                isConnectedToStream: true,
                shouldConnectToStream: true,
                isConnecting: false
                })
            }
        };

        socket.onerror = (error) => {
            displayError('Connection failed');
            setError(new Error('Something went wrong while trying to connect to vehicle'))
            setConnectionData({
                isConnectedToStream: false,
                shouldConnectToStream: false,
                isConnecting: false
            })
        }

        //cleanup function so that the socket connection closes after refresh or exit
        return () => socket.close();
        }
    }, [connectionData.shouldConnectToStream])

    return <StreamDataCtx.Provider value={{ data: binaryData, metadata: connectionData, setShouldConnectToStream, error}}> 
        {children}
    </StreamDataCtx.Provider>
}