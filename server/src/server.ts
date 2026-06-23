import { WebSocketServer } from 'ws';
import { createServer } from 'node:http';
import express from "express";
import type { Request, Response } from 'express';
import { generateData } from './utils/generate-data.js';
import { WebSocket } from 'ws';
import { getLivePerformanceAverage } from './utils/getAverage.js';
import { storePerformance } from './utils/store-performance.js';

export interface VehicleStreamBinaryDataContextI {
    vehicleId: number | undefined;
    averageSpeed: number | null;
    maxSpeed: number | null;
    averageRpm: number | null;
    maxRpm: number | null;
    averageThrottle: number | null;
    maxThrottle: number | null;
    averageBatteryTemp: number | null;
    maxBatteryTemp: number | null;
} 

const PORT = 8080;

const app = express();
app.use(express.json());
const server = createServer(app);

//clientTracking: true, tracks all connected listeners
const telemetryServerSocket = new WebSocketServer({ server, clientTracking: true });

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Live Telemetry App'});
})  

let staticPerformanceData: VehicleStreamBinaryDataContextI = {
    vehicleId: undefined,
    averageSpeed:0,
    maxSpeed: 0,
    averageBatteryTemp: 0,
    averageRpm: 0, 
    averageThrottle: 0, 
    maxBatteryTemp: 0, 
    maxRpm: 0, 
    maxThrottle: 0,
};

//shows how many times the server has emitted data, gets incremented by one
let intervals = 0;

//client has connected to socket
telemetryServerSocket.on('connection', (ws, request) => {
    
    ws.on('close', async () => {
        if (staticPerformanceData.vehicleId) {
            await storePerformance(staticPerformanceData, staticPerformanceData.vehicleId);
        }
        
        staticPerformanceData.vehicleId = undefined; // stops the emission loop
        intervals = 0;
        
    }) 
    
    ws.on('error', async (error) => {
    
         if (staticPerformanceData.vehicleId) {
            await storePerformance(staticPerformanceData, staticPerformanceData.vehicleId);
        }
        
        staticPerformanceData.vehicleId = undefined; // stops the emission loop
        intervals = 0;
    });

    //client sent the vehicleName in order to initialize the staticPerformance data in the server
    ws.on('message', async (event) => {
        const vehicleName = String(event);


        try {
            //fetch stored vehicle performance data to initialize staticPerformanceData
            const req = await fetch('http://localhost:3000/api/vehicle/performance', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ vehicleName })
            })

            //@ts-ignore
            const vehicle = (await req.json()).vehicle;

            const id = vehicle.id;
            const perf = vehicle.vehiclePerformance;

            intervals = 0;

            staticPerformanceData = {
                vehicleId: Number(id),
                maxSpeed: perf?.maxSpeed ?? 0,
                maxRpm: perf?.maxRpm ?? 0,
                maxBatteryTemp: perf?.maxBatteryTemp ?? 0,
                maxThrottle: perf?.maxThrottle ?? 0,
                averageSpeed: perf?.averageSpeed ?? 0,
                averageRpm: perf?.averageRpm ?? 0,
                averageBatteryTemp: perf?.averageBatteryTemp ?? 0,
                averageThrottle: perf?.averageThrottle ?? 0,
            };
            
        } catch (e: any) {
            //close the connection if an error occured
            ws.close();
        }
    })
})

setInterval(() => {

    if (telemetryServerSocket.clients.size > 0 && (staticPerformanceData.vehicleId !== undefined)) {
        //increment intervals by one so averages can be calculated correctly
        intervals++;
        //generate random data to send
        const { speed, batterySOC, batteryTemp, rpm, throttle, timestamp, voltage } = generateData();
        //compare the staticPerformanceData object with the values of the generateData
        const {averageBatteryTemp, averageRpm, averageSpeed, averageThrottle, maxBatteryTemp, maxRpm, maxSpeed, vehicleId, maxThrottle } = staticPerformanceData;
        staticPerformanceData = {
            vehicleId: vehicleId,
            maxSpeed: maxSpeed! > speed ? maxSpeed : speed,
            maxRpm: maxRpm! > rpm ? maxRpm : rpm,
            maxBatteryTemp: maxBatteryTemp! > batteryTemp ? maxBatteryTemp : batteryTemp,
            maxThrottle: maxThrottle! > throttle ? maxThrottle : throttle,
            averageSpeed: getLivePerformanceAverage(averageSpeed!, speed, intervals),
            averageRpm: getLivePerformanceAverage(averageRpm!, rpm, intervals),
            averageBatteryTemp: getLivePerformanceAverage(averageBatteryTemp!, batteryTemp, intervals),
            averageThrottle: getLivePerformanceAverage(averageThrottle!, throttle, intervals)
        }
        const dataBuffer = Buffer.alloc(32);

        //write to dataBuffer
        dataBuffer.writeUInt8(vehicleId, 0);
        dataBuffer.writeUInt8(speed, 1);
        dataBuffer.writeUInt16BE(rpm, 2);
        dataBuffer.writeUInt8(throttle, 4);
        dataBuffer.writeUInt8(batterySOC, 5);
        dataBuffer.writeUInt16BE(voltage, 6);
        dataBuffer.writeFloatBE(batteryTemp, 8);
        dataBuffer.writeUInt32BE(timestamp, 12);
        
        //static data analytics updated based on the vehicle's live data performance
        //such as maxSpeed average speed etc..
        dataBuffer.writeUInt8(staticPerformanceData.averageSpeed!, 16);
        dataBuffer.writeUInt8(staticPerformanceData.maxSpeed!, 17);
        dataBuffer.writeUInt16BE(staticPerformanceData.averageRpm!, 18);
        dataBuffer.writeUInt16BE(staticPerformanceData.maxRpm!, 20);
        dataBuffer.writeUInt8(staticPerformanceData.averageThrottle!, 22);
        dataBuffer.writeUInt8(staticPerformanceData.maxThrottle!, 23);
        dataBuffer.writeFloatBE(staticPerformanceData.averageBatteryTemp!, 24);
        dataBuffer.writeFloatBE(staticPerformanceData.maxBatteryTemp!, 28);
        
        //for each client send the dataBuffer
        telemetryServerSocket.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(dataBuffer);
            }
        });
    }
    else {
        //re initialize intervals as a fresh start
        intervals = 0;
    }
}, 300)

//every second store the live tracking data in db
setInterval(async () => {
    try {
        //try to store data in database if a vehicle is being connected
        if (staticPerformanceData.vehicleId) {
            storePerformance(staticPerformanceData, staticPerformanceData.vehicleId)
        }
    } catch (e: any) {
        console.log(e.message);
    }
}, 1000)

server.listen(PORT, () => {
    console.log('app is running on http://localhost:'+PORT);
})