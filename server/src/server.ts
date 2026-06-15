import express from "express";
import type { Request, Response } from "express";

const server = express();
server.use(express.json());

const PORT = 8000;

server.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Live Telemetry Server'});
}) 


server.listen(PORT, () => {
    console.log('App is running on http://localhost:'+PORT);
})