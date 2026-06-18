import { WebSocketServer } from 'ws';
import { createServer } from 'node:http';
import express from "express";
import type { Request, Response } from 'express';
import { generateData } from './utils/generate-data.js';
import { WebSocket } from 'ws';

const PORT = 8080;

const app = express();
app.use(express.json());
const server = createServer(app);

//clientTracking: true, tracks all connected listeners
const telemetryServerSocket = new WebSocketServer({ server, clientTracking: true });

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Live Telemetry App'});
})  

//client has connected to socket
telemetryServerSocket.on('connection', (ws, request) => {
    
    ws.on('close', () => {
        // console.log('Live Telemetry Dashboard disconnected from socket');
    }) 
    
    ws.on('error', (error) => {
        console.error('WebSocket client error:', error);
    });
})
 
//initialize buffer instance fixed to 16 bytes
let dataBuffer: Buffer<ArrayBuffer> | undefined = Buffer.alloc(16);

//every 300ms send random telemetry data
setInterval(() => {
    //if none clients are connected just return
    if (telemetryServerSocket.clients.size == 0) return;

    //generate random data to send
    const { speed, batterySOC, batteryTemp, rpm, throttle, timestamp, vehicleId, voltage } = generateData();

    //write to dataBuffer
    dataBuffer.writeUInt8(vehicleId, 0);
    dataBuffer.writeUInt8(speed, 1);
    dataBuffer.writeUInt16BE(rpm, 2);
    dataBuffer.writeUInt8(throttle, 4);
    dataBuffer.writeUInt8(batterySOC, 5);
    dataBuffer.writeUInt16BE(voltage, 6);
    dataBuffer.writeFloatBE(batteryTemp, 8);
    dataBuffer.writeUInt32BE(timestamp, 12);

    //for each client send the dataBuffer
    telemetryServerSocket.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(dataBuffer);
        }
    });
}, 300)

server.listen(PORT, () => {
    console.log('app is running on http://localhost:'+PORT);
})