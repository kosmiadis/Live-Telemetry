import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Muted, P } from "@/components/ui/typography";
import Link from "next/link";
import { VehicleType } from "@/types/vehicle";

export type VehiclesType = Pick<VehicleType, 'id' | 'createdAt' | 'updatedAt' | 'vehicleName'>[];

export default function SidebarVehicles ({ vehicles }: { vehicles: VehiclesType}) {
    if (vehicles.length == 0) {
        return <span className="px-2"><Muted>No Available Vehicles</Muted></span>
    }

    return <ul>
        {vehicles?.map(vehicle => <SidebarMenuButton key={vehicle.id}>
              <Link href={'/vehicle/'+vehicle.vehicleName}><P>{vehicle.vehicleName}</P></Link>
          </ SidebarMenuButton >
        )}
    </ul>
}