import VehicleTelemetryStream from "./components/VehicleTelemetryStream";

//connect to another websocket that send a signal every 10 seconds
//and updates the vehicle's performance stats
export default async function VehicleDataPage ({
    params
}: {
    params: Promise<{ vehicleName: string }>
}) {
    return <div className="py-4 min-w-full gap-4">
        <VehicleTelemetryStream />
    </div>
}