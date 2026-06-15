# Live Telemetry FullStack Application

This application simulates a live telemetry digital system with data sending over a custom protocol, and a live dashboard with analytics and charts built with Next.js (Application UI/UX, functionality) and Web Sockets (Real-time communication).

## Telemetry data

The telemetry data are the data used in the application in UI components in order to preview the live tracking and updates of a vehicle.

The current telemetry data schema is as follows:
```
interface TelemetryData {
  
  timestamp: number;     // Unix timestamp in ms
  vehicleId: number;     // vehicle ID
  
  //engine and motion
  speed: number;         // Speed in km/h
  rpm: number;           // RPM/m (0 - 10,000)
  throttle: number;      // Throttle percentage (0 - 100%)
  
  //battery stats
  batteryTemp: number;   // Battery temperature in celsius
  batterySOC: number;    // State of Charge / Batter percentage available: (0-100%)
  voltage: number;       // Battery Voltage
}
```

Data will be sent **not as a JSON object but as a Buffer of binary data**. This allows for smaller network bandwidth, resulting in higher data transfer speeds, which is crucial for real-time vehicle data tracking. The derived communication protocol is fixed in 16 bytes and follows these rules:

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

** Bytes 6-7 that represent voltage in integer format can also represent float values if the value is multiplied by 100 and for decoding is divided by 100 to get the real value. For example the real value we want to represent is 400.25V. We multiply the value with 100 thus we send 40025 through a socket, then when the data arrives we divide by 100 so we get the real value of 400.25V. The same applies also for Bytes 8-11 which are responsible for battery temperature.


## Frontend

The Frontend part of the application consists of a real-time modern dashboard with widgets displaying the vehicle's speed, RPM, throttle, battery percentage, and battery temparature.

## UI

## Backend

The Backend is responsible for the API communication. The API has a specific route that is responsible for sending **Raw Binary Data** through a Web Socket for instant communication between frontend-backend

|  Method  |  Endpoint | Purpose  |
| :----: | :----: | :----: |
| GET | /api/vehicles/[id]/data | Real-Time vehicle tracking data | 

## Infrastructure

The application is Containerized with Docker

## How to use (Recommended to use Docker)

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
