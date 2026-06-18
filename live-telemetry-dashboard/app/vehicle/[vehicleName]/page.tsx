import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import VehicleTelemetryStream from "./components/VehicleTelemetryStream";
import { Button } from "@/components/ui/button";
import { H3, H4, Muted } from "@/components/ui/typography";

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

