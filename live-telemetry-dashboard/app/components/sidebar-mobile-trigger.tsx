'use client';

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

export default function SidebarMobileTrigger () {
    const { isMobile } = useSidebar();

    if (isMobile) return <SidebarTrigger />
    return <></>
}
