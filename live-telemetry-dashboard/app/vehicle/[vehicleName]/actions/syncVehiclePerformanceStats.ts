"use server";

import { revalidatePath } from "next/cache";

export async function syncVehiclePerformanceStats ({vehicleName}: { vehicleName: string}) {
    revalidatePath('/vehicle'+'/'+vehicleName);
}