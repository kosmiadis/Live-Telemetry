import { SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, Sidebar, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar";
import { P } from "@/components/ui/typography";
import SidebarThemeSelect from "./sidebar-theme";
import SidebarVehicles from "./sidebar-vehicles";
import { prisma } from "../lib/prisma";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

function SidebarVehiclesSkeleton () {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuButton disabled className="pointer-events-none">
            <Skeleton className="h-6 w-full rounded-full shrink-0" />
            <Skeleton className="h-6 w-full rounded" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
}

export default async function DashboardSidebar () {

    //here fetch all available vehicles from the db
    const availableVehicles = await prisma.vehicle.findMany();

    return <Sidebar> 
      <SidebarHeader className="text-center flex flex-row items-center justify-between">
        <div className="pl-2">
          <Link href={'/'}><P >Live Telemetry</P></Link>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      
      <SidebarContent>
        {/* Vehicles Select */}
        <SidebarGroup>
          <SidebarGroupLabel>Vehicles</SidebarGroupLabel>
          <SidebarMenu>
            <Suspense fallback={<SidebarVehiclesSkeleton />}>
              <SidebarVehicles vehicles={availableVehicles} />
            </Suspense>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="py-4 flex flex-col items-center">
        <SidebarThemeSelect />
        <h4 className="text-sm font-semibold text-center">Live Telemetry Dashboard</h4>
      </SidebarFooter>
    </Sidebar>
}