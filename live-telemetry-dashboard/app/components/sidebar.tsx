import { SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, Sidebar, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar";
import { P } from "@/components/ui/typography";
import SidebarThemeSelect from "./sidebar-theme";
import SidebarVehicles from "./sidebar-vehicles";

export default function DashboardSidebar () {

  //here fetch all available vehicles from the db
    return <Sidebar> 
      <SidebarHeader className="text-center flex flex-row items-center justify-between">
        <div className="pl-2">
          <P>Live Telemetry</P> 
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      
      <SidebarContent>
        {/* Vehicles Select */}
        <SidebarGroup>
          <SidebarGroupLabel>Vehicles</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarVehicles />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="py-4 flex flex-col items-center">
        <SidebarThemeSelect />
        <h4 className="text-sm font-semibold text-center">Live Telemetry Dashboard</h4>
      </SidebarFooter>
    </Sidebar>
}