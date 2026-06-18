import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { P } from "@/components/ui/typography";
import Link from "next/link";
import { VehicleType } from "@/types/vehicle";

export type VehiclesType = Pick<VehicleType, 'id' | 'createdAt' | 'updatedAt' | 'vehicleName'>[];

export default function SidebarVehicles ({ vehicles }: { vehicles: VehiclesType}) {
    if (vehicles.length == 0) {
        return <P>No Available Vehicles</P>
    }

    return <ul>
        {vehicles?.map(vehicle => <SidebarMenuButton key={vehicle.id}>
              <Link href={'/vehicle/'+vehicle.vehicleName}><P>{vehicle.vehicleName}</P></Link>
          </ SidebarMenuButton >
        )}
    </ul>
}