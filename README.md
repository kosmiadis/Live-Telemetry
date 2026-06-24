# Live Telemetry FullStack Application

This application simulates a live telemetry digital system with data sending over a custom protocol, and a live dashboard with analytics built with Next.js (Application UI/UX, functionality) and Web Sockets (Real-time communication via Node.js server).

## Telemetry data

The telemetry data are the data used in the application in UI components in order to preview the live tracking and updates of a vehicle.

The current telemetry data schema is as follows:
```
interface TelemetryData {
  timestamp: number | null;
  vehicleId: number | null;
  speed: number | null;
  rpm: number | null;
  throttle: number | null;
  batteryTemp: number | null;
  batterySOC: number | null;
  voltage: number | null;
  averageSpeed: number | null;
  maxSpeed: number | null;
  averageRpm: number | null;
  maxRpm: number | null;
  averageThrottle: number | null;
  maxThrottle: number | null;
  averageBatteryTemp: number | null;
  maxBatteryTemp: number | null;
};
```

## Data transfer logic

Data will be sent **not as a JSON object but as a Buffer of binary data**. This allows for smaller network bandwidth, resulting in higher data transfer speeds, which is crucial for real-time vehicle data tracking. The derived communication protocol is fixed of 32 bytes and is the following:

|  Byte  |  Type  |  Field | Value  |
| :----: | :----: | :----: | :----: |
|   0    |  uint8 | vehicleId | 0-255  |
|   1    |  uint8 |  speed  | 0-255  |
|  2-3   | uint16 |   rpm   | 0-65535 |
|   4    |  uint8 | throttle | 0-100  |
|   5    |  uint8 | batterySOC | 0-100  |
|  6-7   | uint16 | voltage | 0-65535 |
|  8-11  | float32 | batteryTemp | Float |
| 12-15  | uint32 | timestamp | 0-4294967295 |
| 16 | uint8 | averageSpeed | 0-255 |
| 17 | uint8 | maxSpeed | 0-255 |
| 18-19 | uint16 | averageRpm | 0-65535 |
| 20-21 | uint16 | maxRpm | 0-65535 |
| 22 | uint8 | averageThrottle | 0-100 |
| 23 | uint8 | maxThrottle | 0-100 |
| 24-27  | float32 | averageBatteryTemp | Float |
| 28-31  | float32 | maxBatteryTemp | Float |

## Frontend

The Frontend part of the application includes a homepage which displays all available vehicles for live telemetry, with the functionality of registering new vehicles and the vehicle performance and live telemetry dashboard page, where widgets displaying live speed, rpm, average battery temperature etc... are being shown realtime. ( All data are simulated from the server )

## UI
For the UI the Shadcn UI components library is being used, for more info please visit the official website [Shadcn Website](https://ui.shadcn.com/)


## Backend
The Backend is separated into two categories

- Real-Time Data
- Dashboard Static Data

For the **Real-Time Data** part a separate server written in Node.js is being used. It uses a custom protocol for sending raw binary data and sends them over a Web Socket every 300ms. **Raw binary data is preferred over JSON formatted data due to smaller network bandwidth resulting in higher data transfer speeds.**

For the **Dashboard Static Data** the Next.js Backend is used to fetch data that are relative with the previewing vehicle such as, name, id etc...

## Infrastructure

The application is also containerized with Docker. There are two Dockerfiles each located in the corresponding folder for Next.js and Node.js and one docker-compose.yml in the root directory.

## How to use (Recommended to use Docker)

- Create db
```
pnpm dlx create-db
```

- Create db tables
```
pnpm dlx prisma migrate dev --name init
```

- Generate prisma
```
pnpm dlx prisma generate
```

- Seed the database
```
pnpm tsx prisma/seed.ts
```

- To run with **Docker** navigate to the root directory and run the following command
```
docker compose up --build
```

To run **manually** start both Node.js and Next.js servers via the commands

- Open a new terminal and enter the following commands
```
# Next.js build
pnpm build

# run the dashboard on port 3000
pnpm start
```

- Then open another terminal and enter the following commands
```
# Node.js 
pnpm build

# run the server on port 8080
pnpm start
```

