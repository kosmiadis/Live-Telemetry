import { SidebarMenuButton } from "@/components/ui/sidebar";
import { P } from "@/components/ui/typography";
import Link from "next/link";

const dummyVehicles = [
  { id: 1, name: "Kart26", to: '/vehicle/kart-26' },
  { id: 2, name: "Aristurtle25", to: '/vehicle/aristurtle-25' },
  { id: 3, name: "NeuralRover", to: '/vehicle/neural-rover' },
  { id: 4, name: "DevDrive", to: '/vehicle/dev-drive' },
];

export default function SidebarVehicles () {

    //fetch available vehicles here

    return <ul>
        {dummyVehicles.map(vehicle => <SidebarMenuButton key={vehicle.id}>
              <Link href={vehicle.to}><P>{vehicle.name}</P></Link>
          </ SidebarMenuButton >
        )}
    </ul>
}