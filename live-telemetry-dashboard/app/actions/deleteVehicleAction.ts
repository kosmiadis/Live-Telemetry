'use server';

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type DeleteVehicleReturnStateType = {
    isSuccess: boolean | null;
    message?: string | null;
};

export async function deleteVehicleAction (_prevData: any, vehicleId: number): Promise<DeleteVehicleReturnStateType | void> {
    
    await new Promise((resolve) => setTimeout(resolve, 2500));
    
    try {
        await prisma.vehicle.delete({
            where: { id: vehicleId }
        })
        revalidatePath('/');
    } catch (e: any) {   
        return { isSuccess: false, message: 'Vehicle was not deleted'};
    }

    redirect('/');
}