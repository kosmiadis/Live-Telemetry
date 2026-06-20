import VehicleTelemetryStream from "./components/VehicleTelemetryStream";

export default async function VehicleDataPage ({
    params
}: {
    params: Promise<{ vehicleName: string }>
}) {
    return <div className="py-4 min-w-full wgap-4">
        {/* Vehicle live data tracking */}
        <VehicleTelemetryStream />
    </div>
}

