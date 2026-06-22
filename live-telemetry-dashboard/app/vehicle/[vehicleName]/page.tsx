import { prisma } from "@/app/lib/prisma";
import VehicleTelemetryStream from "./components/VehicleTelemetryStream";
import VehicleStreamBinaryDataProvider from "./context/VehicleStreamDataContext";
import { notFound } from "next/navigation";
import VehicleLayoutPerformanceContent from "./components/VehicleLayoutPerformanceContent";

//connect to another websocket that send a signal every 10 seconds
//and updates the vehicle's performance stats
export default async function VehicleDataPage ({
    params
}: {
    params: Promise<{ vehicleName: string }>
}) {

    const { vehicleName } = await params;

    return <div className="py-4 min-w-full gap-4">
            <VehicleTelemetryStream />
    </div>
}